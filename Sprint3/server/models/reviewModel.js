const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    text: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // reference to the user
      required: true,
    },
    station: {
      type: Schema.Types.ObjectId,
      ref: 'Station', // reference to the station
      required: true,
    },
  },
  { timestamps: true }
);

reviewSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  },
});

module.exports = mongoose.model('Review', reviewSchema);
