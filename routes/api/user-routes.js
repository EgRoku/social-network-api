const router = require("express").Router();
const {
  getUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

// route for getting users and creating them  /api/users
router.route('/').get(getUsers).post(createUser);

// route for getting user by id with update and delete options  /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// route for getting friends by id as well as the add and delete friend options  /:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;