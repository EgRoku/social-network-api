const { Thought, User } = require('../models');

const thoughtController = {
// Get all thoughts
    getThoughts(req, res) {
    Thought.find()
        .sort({ createdAt: -1})
        .then((dbThoughtData) => {
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

// Get single thought by id
    getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought for this Id!' });
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

// Create a thought
    createThought(req, res) {
    Thought.create(req.body)
        .then((dbThoughtData) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true }
            );
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res
                    .status(404)
                    .json({ message: 'Created a Thought but there was no user with this id!' });
            }
            res.json({ message: 'Thought sucessfully created!'});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

// Update Thought
    updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought for this Id!'});
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

// Delete Thought
    deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought for this Id!' });
            }
            // Removes thought id from users `thoughts` field
            return User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res
                  .status(404)
                  .json({ message: 'Created a Thought but there was no user with this id!' });
              }
              res.json({ message: "Thought sucessfully deleted!" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

// Add a reaction to a thought
    addreaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      {runValidators: true, new: true }  
    )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought for this Id!'});
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

// Remove a reaction from a thought
    removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought for this Id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;