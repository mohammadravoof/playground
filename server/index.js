//// without express
// const http = require('http');
// const fs = require('fs');
// const url = require('url');
const express = require('express');

const app = express();
app.get('/',(req,res)=>{
return res.send('Hello from Home Page');
})

app.get('/about',(req,res)=>{
    return res.send('Hello from About Page' + ' hey ' + req.query.name) ;
})


//// Writing get post normally without using express js
// function myHandler(req,res) {
//     if(req.url === '/favicon.ico') return res.end();
//     const myUrl = url.parse(req.url, true);
//     // console.log(myUrl);
//     const log = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`;
//     fs.appendFile('log.txt',log, (err, data) => {
//         switch(myUrl.pathname) {
//             case '/': res.end("HomePage");
//             break;
//             case '/about': 
//             const username = myUrl.query.myname
//             res.end(`Hi ${username}`);
//             break;
//             default: res.end("404 Not Found");
//         }
//     });
// }

// const myServer = http.createServer(app);

// myServer.listen(8000, () => console.log('Server Started'));

app.listen(8000,()=>console.log('Server Started'));



