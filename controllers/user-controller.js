const { User, Thought } = require('../models');
const { db } = require('../models/User');

const userController = {
// Get all users
    getUsers(req, res) {
    User.find()
        .select('-__v')
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

// Get single user by id
    getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends')
        .populate('thoughts')
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ messagge: 'No user with this ID!' });
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

// Create a new user
    createUser(req, res) {
    User.create(req.body)
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
      });
    },

// Update a user
    updateUser(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ messagge: 'No user with this ID!' });
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

// Delete user and associated thoughts
    deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this ID' });
            }
            // Gets id of users thoughts and deletes them
            return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
        })
        .then(() => {
            res.json({ message: 'User and their thoughts have been deleted' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

// add friend to friends list
    addFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
    )
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this ID!'})
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).jsom(err);
        });
    },

// Remove friend from friends list
    removeFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
    )
        .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: "No user with this id!" });
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
};

module.exports = userController;