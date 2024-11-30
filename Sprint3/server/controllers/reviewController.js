const Review = require('../models/reviewModel');
const mongoose = require('mongoose');

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get reviews' });
  }
};

const createReview = async (req, res) => {
  try {
    const newReview = await Review.create({ ...req.body });
    res.status(201).json(newReview);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Failed to create review', error: error.message });
  }
};

const getReviewById = async (req, res) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).json({ message: 'Invalid review ID' });
  }

  try {
    const review = await Review.findById(reviewId);
    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve review' });
  }
};

//find review by id and replace it with new review data
const replaceReview = async (req, res) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).json({ message: 'Invalid review ID' });
  }

  try {
    const replaceReview = await Review.findOneAndReplace(
      { _id: reviewId },
      { ...req.body },
      { new: true }
    );
    if (replaceReview) {
      res.status(200).json(replaceReview);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update review' });
  }
};

//find review by id and update it with new review data
const updateReview = async (req, res) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).json({ message: 'Invalid review ID' });
  }

  try {
    const replaceReview = await Review.findOneAndUpdate(
      { _id: reviewId },
      { ...req.body },
      { new: true }
    );
    if (replaceReview) {
      res.status(200).json(replaceReview);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update review' });
  }
};

const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).json({ message: 'Invalid review ID' });
  }
  try {
    const deletedReview = await Review.findOneAndDelete({ _id: reviewId });
    if (deletedReview) {
      res.status(200).json({ message: 'Review deleted successfully' });
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
  replaceReview,
  updateReview,
  deleteReview,
};
