const dirTree = require('directory-tree')
const tree = dirTree('../tracks')

const fs = require('fs');
const content = "export const dir = " + JSON.stringify(tree);

fs.writeFile('./dir.js', content, err => {
    if (err) {
        console.error(err);
    }
    // file written successfully
});