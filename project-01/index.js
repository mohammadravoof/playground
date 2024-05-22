const express = require('express');
const app = express();
const PORT = 8000;
const users = require('./MOCK_DATA.json');
const fs = require('fs');

// Middleware - Plugin
app.use(express.urlencoded({ extended: false}));

// Middleware no 2
app.use((req,res,next)=> {
    fs.appendFile("log.txt",`\n${Date.now()} : ${req.ip} : ${req.method} : ${req.path}`, (err, data) => {
        next();
    })
});

//Routes
app.get('/', (req, res) => {
    const homepage = `<h1>Home Page</h1>`;
    return res.send(homepage);
})

app.get('/users', (req,res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

app.get('/api/users', (req,res) => {
    return res.json(users);
});

app
.route('/api/users/:id')
.get((req,res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    if(!user){
        return res.status(404).json({ error : "user not found"})
    }
    return res.json(user);
})
.patch((req,res) => {
    // TODO: Edit the user with id
    // getId stores the Id from the given Parameters in the URL.
    const getId = Number(req.params.id);

    // body stores the body in which we've to make changes.
    const body = req.body;

    // Finding the user Id from the user array.
    const userIndex = users.findIndex((user) => user.id === getId);

    // If we found a user with its Id then gotUser stores that object.
    const gotUser = users[userIndex];

    // Here gotUser has the user Object and body has the changes we have to made.
    const updatedUser = { ...gotUser, ...body};

    // After Merging them, Update the users Array.
    users[userIndex] = updatedUser;

    // Lastly, write the changes into the json file.
    console.log(body);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
      return res.json({ status: "Success", updatedUser});
    })
  })
.delete((req,res) => {
    // TODO: Delete the user with id
    const id = Number(req.params.id)

    if(id!=-1 && users.length>=id){
      users.splice(id-1,1);
      fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        if(!err){
          return res.status(200).json({success:"User delete"});
        }else{
          res.status(500).json({error:"Failed to delete user"});
        }
    });
  }else{
    return res.status(404).json({error:"User not found"});
  }  
});

app.post('/api/users', (req,res) => {
    // Create new user
    const body = req.body;
    if(!body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ){
        return res.status(400).json({ msg: "All the fields are required..."});
    }
    console.log('Body ',body);
    users.push({ id:users.length + 1 ,...body});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.status(201).json({ status: "success", id: users.length });
    });

});

app.listen(PORT, ()=> console.log(`Server started at PORT: ${PORT}`));