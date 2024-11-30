const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const {
  getAllReviews,
  getReviewById,
  createReview,
  replaceReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

// GET /reviews
router.get('/', getAllReviews);

//custom middleware for authentication
// router.use(auth);

// POST /reviews
router.post('/', createReview);

// GET /reviews/:reviewId
router.get('/:reviewId', getReviewById);

// PUT /reviews/:reviewId
router.put('/:reviewId', updateReview);

// PATCH /reviews/:reviewId
router.patch('/:reviewId', replaceReview);

// DELETE /reviews/:reviewId
router.delete('/:reviewId', deleteReview);

module.exports = router;