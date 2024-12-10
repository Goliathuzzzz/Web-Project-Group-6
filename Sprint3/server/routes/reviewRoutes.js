const express = require('express');
const router = express.Router();
const auth = require('../middleware/userAuth');
const {
  getAllReviews,
  getStationReviews,
  getReviewById,
  createReview,
  replaceReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

router.get('/', getAllReviews);
router.get('/station/:stationId', getStationReviews);
router.get('/:reviewId', getReviewById);

// middleware for authentication
router.use(auth);

router.post('/', createReview);
router.put('/:reviewId', updateReview);
router.delete('/:reviewId', deleteReview);

module.exports = router;