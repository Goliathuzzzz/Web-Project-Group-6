const Review = require('../models/reviewModel');
const mongoose = require('mongoose');

// GET all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get reviews' });
  }
};

// POST a review
const createReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const newReview = await Review.create({ ...req.body, user_id: userId });
    res.status(201).json(newReview);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Failed to create review', error: error.message });
  }
};

// GET a review by ID
const getReviewById = async (req, res) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).json({ message: 'Invalid review ID' });
  }

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      res.status(404).json({ message: 'Review not found' });
    } else {
      res.status(200).json(review);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve review' });
  }
};

// PUT update a review by ID
const updateReview = async (req, res) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).json({ message: 'Invalid review ID' });
  }

  try {
    const userId = req.user._id;
    const updateReview = await Review.findOneAndUpdate(
      { _id: reviewId, user_id: userId },
      { ...req.body },
      { new: true }
    );
    if (updateReview) {
      res.status(200).json(updateReview);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update review' });
  }
};

// DELETE a review by ID
const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).json({ message: 'Invalid review ID' });
  }
  try {
    const userId = req.user._id;
    const deletedReview = await Review.findOneAndDelete({ _id: reviewId, user_id: userId});
    if (deletedReview) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete review' });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
