const router = require('express').Router();
const {
  getThoughts,
  createThought,
  getSingleThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller');

// route for getThoughts and create new thought  /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// route for thoughts by id with update and delete options  /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// route for adding reactions to thoughts  /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// route for deleting reactions by id  /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;