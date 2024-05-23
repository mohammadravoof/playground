const express = require('express');
const { handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser } = require('../controllers/user');

const router = express.Router();

//Routes
// router.get('/', (req, res) => {
//     const homepage = `<h1>Home Page</h1>`;
//     return res.send(homepage);
// })

// router.get('/', async (req,res) => {
//   const allDbUsers = await User.find({});
//     const html = `
//     <ul>
//         ${allDbUsers
//           .map((user) => `<li>${user.firstName} ${user.lastName} - ${user.email}</li>`)
//           .join("")}
//     </ul>
//     `;
//     res.send(html);
// });

router.route('/').get( handleGetAllUsers ).post( handleCreateNewUser );

router
.route('/:id')
.get( handleGetUserById )
.patch( handleUpdateUserById )
.delete( handleDeleteUserById );


module.exports = router;