const {add, sub} = require('./math')
const fs = require('fs')

console.log("Addition ",add(1,2)," Subtraction ",sub(2,1) )

// //creating a new file and adding content to it.
// fs.writeFileSync('./fs-writen-file.txt','Hey This is done using fs.writeFilesync');
// //deleting any file
// fs.unlinkSync('./fs-writen-file')
