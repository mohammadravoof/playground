const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');

// // Now we use Mongo db
// const users = require('./MOCK_DATA.json');

const app = express();
const PORT = 8000;

// Connection
mongoose
.connect('mongodb://127.0.0.1:27017/youtube-app-1')
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Mongo Error", err));

// Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  }
}, {timestamps: true});

const User = mongoose.model('user', userSchema);

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

app.get('/users', async (req,res) => {
  const allDbUsers = await User.find({});
    const html = `
    <ul>
        ${allDbUsers
          .map((user) => `<li>${user.firstName} ${user.lastName} - ${user.email}</li>`)
          .join("")}
    </ul>
    `;
    res.send(html);
});

app.get('/api/users',async (req,res) => {
  const allDbUsers = await User.find({});
    return res.json(allDbUsers);
});

app
.route('/api/users/:id')
.get(async (req,res) => {

    // // Now we use mongo db
    // const id = Number(req.params.id);
    // const user = users.find(user => user.id === id);

    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({ error : "user not found"})
    }
    return res.json(user);
})
.patch(async(req,res) => {
    // // TODO: Edit the user with id
    // // getId stores the Id from the given Parameters in the URL.
    // const getId = Number(req.params.id);

    // // body stores the body in which we've to make changes.
    // const body = req.body;

    // // Finding the user Id from the user array.
    // const userIndex = users.findIndex((user) => user.id === getId);

    // // If we found a user with its Id then gotUser stores that object.
    // const gotUser = users[userIndex];

    // // Here gotUser has the user Object and body has the changes we have to made.
    // const updatedUser = { ...gotUser, ...body};

    // // After Merging them, Update the users Array.
    // users[userIndex] = updatedUser;

    // // Lastly, write the changes into the json file.
    // console.log(body);
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    //   return res.json({ status: "Success", updatedUser});
    // })

    await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    return res.json({ status: "Updated"})
  })
.delete(async(req,res) => {
  //   // TODO: Delete the user with id
  //   const id = Number(req.params.id)

  //   if(id!=-1 && users.length>=id){
  //     users.splice(id-1,1);
  //     fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
  //       if(!err){
  //         return res.status(200).json({success:"User delete"});
  //       }else{
  //         res.status(500).json({error:"Failed to delete user"});
  //       }
  //   });
  // }else{
  //   return res.status(404).json({error:"User not found"});
  // }  

  const user = await User.findByIdAndDelete(req.params.id);
  return res.status(200).json({success:"User delete"});

});

app.post('/api/users', async (req,res) => {
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

    const result = await User.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      jobTitle: body.job_title,
    });

    return res.status(201).json({msg: "Success"});

    // // User Before mongodb
    // // used to post on the file mock_data.json
    // console.log('Body ',body);
    // users.push({ id:users.length + 1 ,...body});
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //     return res.status(201).json({ status: "success", id: users.length });
    // });

});

app.listen(PORT, ()=> console.log(`Server started at PORT: ${PORT}`));