import React from "react";
import { reviews } from "./reviewData.js";
import Review from "./Review.jsx";

function ReviewList() {
  return (
    <div className="flex flex-col align-middle max-w-[50%] h-96 bg-gradient-to-b from-darkerBlue to-darkBlue">
      {reviews.map((review) => {
        return <Review key={review.id} {...review} />;
      })}
    </div>
  );
}

export default ReviewList;
