const User = require('../models/user');

async function handleGetAllUsers(req,res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById(req,res) {
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({ error : "user not found"})
    }
    return res.json(user);
}

async function handleUpdateUserById(req,res) {

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
}

   

async function handleDeleteUserById(req,res) {

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
}

async function handleCreateNewUser(req,res) {
 // Create new user
 const body = req.body;
 if(!body ||
     !body.firstName ||
     !body.lastName ||
     !body.email ||
     !body.gender ||
     !body.jobTitle
 ){
     return res.status(400).json({ msg: "All the fields are required..."});
 }

 const result = await User.create({
   firstName: body.firstName,
   lastName: body.lastName,
   email: body.email,
   gender: body.gender,
   jobTitle: body.jobTitle,
 });

 return res.status(201).json({msg: "Success", id: result._id });

 // // User Before mongodb
 // // used to post on the file mock_data.json
 // console.log('Body ',body);
 // users.push({ id:users.length + 1 ,...body});
 // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
 //     return res.status(201).json({ status: "success", id: users.length });
 // });

}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
    
};

