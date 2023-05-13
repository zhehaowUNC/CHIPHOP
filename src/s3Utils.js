import AWS from 'aws-sdk';
import { Auth } from 'aws-amplify'
// Configure AWS SDK with your S3 credentials
AWS.config.update({
    accessKeyId: 'AKIA2GNYQRNIHNCPGT6N',
    secretAccessKey: 'styc8cXradHjNdfRBCwKlri1kKEg3Dv+jRC/lsOx',
    region: 'us-east-1',

});

const s3 = new AWS.S3({
    accessKeyId: 'AKIA2GNYQRNIHNCPGT6N',
    secretAccessKey: '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',
    region: 'us-east-1',
    signatureVersion: 'v4'
});


export const getAccessToken = async() => {
    try {
        const session = await Auth.currentSession();
        return session.getIdToken().getJwtToken();
    } catch (error) {
        console.error('Error getting access token:', error);
        return null;
    }
};

export const getPresignedUrl = (bucket, key) => {
    const params = {
        Bucket: bucket,
        Key: key,
        Expires: 604800, // URL expiry time in seconds
    };

    return s3.getSignedUrlPromise('getObject', params)
        .then(url => url)
        .catch(error => {
            console.error('Error generating pre-signed URL:', error);
            throw error;
        });
};
export const listDir = (bucket, prefix) => {
    s3.listObjectsV2({ Bucket: bucket, Delimiter: '/', Prefix: prefix }, (err, data) => {
        if (err) {
            console.log('Error:', err);
        } else {
            // Extract directories from the response
            const directories = data.CommonPrefixes.map((commonPrefix) => commonPrefix.Prefix);

            console.log('Directories:', directories);
        }
    });
}
export const getTracks = async(username) => {

    const params = {
        Bucket: 'uploadedstuff',
        Prefix: `${username}/`,
    };


    try {
        const data = await s3.listObjectsV2(params).promise();
        const objects = data.Contents;
        const tracks = [];

        const uniqueTrackIds = new Set();

        for (let i = 0; i < objects.length; i++) {
            const object = objects[i];
            const parts = object.Key.split('/');
            const trackId = parts[1];

            if (!uniqueTrackIds.has(trackId)) {
                uniqueTrackIds.add(trackId);
            }
        }

        uniqueTrackIds.forEach(trackId => {
            const track = { id: trackId };
            for (let i = 0; i < objects.length; i++) {
                const object = objects[i];
                const parts = object.Key.split('/');
                const fileType = parts[2].split('.')[0];
                if (parts[1] === trackId) {
                    if (fileType === 'song') {
                        const songUrl = s3.getSignedUrl('getObject', {
                            Bucket: 'uploadedstuff',
                            Key: object.Key,
                        });
                        track.songUrl = songUrl;
                    } else if (fileType === 'cover_art') {
                        const coverArtUrl = s3.getSignedUrl('getObject', {
                            Bucket: 'uploadedstuff',
                            Key: object.Key,
                        });
                        track.coverArtUrl = coverArtUrl;
                    }
                }
            }
            tracks.push(track);
        });


        return tracks;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const deleteTrack = async(username, trackId) => {
    const songParams = {
        Bucket: 'uploadedstuff',
        Prefix: `${username}/${trackId}/song`,
    };

    const coverArtParams = {
        Bucket: 'uploadedstuff',
        Prefix: `${username}/${trackId}/cover_art`,
    };

    try {
        const songObjects = await s3.listObjectsV2(songParams).promise();
        const coverArtObjects = await s3.listObjectsV2(coverArtParams).promise();
        const songKey = {
            Objects: songObjects.Contents.map((obj) => ({ Key: obj.Key })),
        }
        const coverKey = {
            Objects: coverArtObjects.Contents.map((obj) => ({ Key: obj.Key })),

        }
        const songDeleteParams = {
            Bucket: 'uploadedstuff',
            Key: songKey["Objects"][0]["Key"]
        };

        const coverArtDeleteParams = {
            Bucket: 'uploadedstuff',
            Key: coverKey["Objects"][0] ? coverKey["Objects"][0]["Key"] : ""
        };
        console.log(songDeleteParams)

        await s3.deleteObject(songDeleteParams).promise();
        if (coverKey["Objects"][0]) {
            await s3.deleteObject(coverArtDeleteParams).promise();

        }

        console.log(`Successfully deleted track with trackId: ${trackId}`);
    } catch (error) {
        throw error
        console.error(`Error deleting track with trackId: ${trackId}`, error);
    }
};