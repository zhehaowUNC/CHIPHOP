const fs = require('fs')
const path = require('path')
    //     // fs.readdir()
    // let reqpath = path.join(__dirname, '../avatar')

// var array = []

// function files() {
//     fs.readdir(reqpath, (err, files) => {
//         if (err)
//             console.log(err);
//         else {
//             files.forEach(file => {
//                 array.push(file)
//             })
//         }
//     })
// }
// files()
// jsonArr = []

// setTimeout(() => {
//     for (var i = 1; i < array.length; i++) {
//         var str = array[i].substring(0, array[i].indexOf("."))
//         jsonArr.push({
//             "id": i,
//             "name": str,
//             "path": array[i]
//         })
//     }
//     console.log(JSON.stringify(jsonArr) + "\n")
// }, 25);

let reqpath2 = path.join(__dirname, '../tracks')
var array2 = []
var arrayOfAlbum = []
var jsonArr2 = []

function files2() {
    fs.readdir(reqpath2, (err, files) => {
        if (err)
            console.log(err);
        else {
            files.forEach(file => {
                array2.push(file)
                let reqForAlbum = reqpath2 + `/file`
                fs.readdir(reqForAlbum, (err, files) => {
                    if (err)
                        console.log(err);
                    else {
                        files.forEach(file => {
                            arrayOfAlbum = []
                            arrayOfAlbum.push(file)
                            let reqForSongs = reqpath2 + `/file`
                        })
                    }
                })
            })
        }
    })
}

setTimeout(() => {
    console.log(array2)
    for (var i = 1; i < array2.length; i++) {
        var str = array2[i]
        jsonArr2.push({
            "id": i,
            "name": str,
            "path": array2[i]
        })
    }
    console.log(JSON.stringify(jsonArr2) + "\n")
}, 30);

files2()