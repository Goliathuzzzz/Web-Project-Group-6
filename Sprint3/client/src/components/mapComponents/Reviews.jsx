import React, { useState, useEffect } from "react";
import Cancel from "../../assets/images/close.png";
import reviewsData from "../../../../server/mock-data/reviews_mock_data.json";
import { useAuth } from "../../../routes/AuthProvider";

function ReviewWindow({ station, onClose }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [activeTab, setActiveTab] = useState("existing");
  const [expandedReviewIndex, setExpandedReviewIndex] = useState(null);

  useEffect(() => {
    const stationReviews = reviewsData.find(
      (review) => review.stationName === station.name
    );
    setReviews(stationReviews ? stationReviews.reviews : []);
  }, [station.name]);

  // const handleSubmit = () => {
  //   if (!user) {
  //     alert("You must be logged in to submit a review.");
  //     return;
  //   }

  //   if (newReview.trim() && newRating > 0) {
  //     const updatedReviews = [
  //       ...reviews,
  //       {
  //         user: user.username || "Anonymous",
  //         text: newReview,
  //         rating: newRating,
  //       },
  //     ];
  //     setReviews(updatedReviews);
  //     setNewReview("");
  //     setNewRating(0);

  //     // Add logic to persist the new review with rating
  //     setActiveTab("existing"); // Switch back to the existing reviews tab
  //   } else {
  //     alert("Please add a review and select a rating.");
  //   }
  // };

  const renderStars = (rating) => (
    <span className="text-yellow-400">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );

  const truncateText = (text, length) => {
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center z-50 mt-0">
      <div className="bg-white rounded-md shadow-lg p-6 w-96 max-h-[80vh] overflow-auto">
        {/* Header section */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-black font-Orbitron">
            {station.name}
          </h3>
          <button
            onClick={onClose}
            className="transition-transform duration-200 hover:scale-125 hover:brightness-150 pr-1"
          >
            <img src={Cancel} alt="Cancel" className="w-3 h-3" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab("existing")}
            className={`px-4 py-2 ${
              activeTab === "existing"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 font-Roboto"
            }`}
          >
            Existing Reviews
          </button>
          <button
            onClick={() => setActiveTab("new")}
            className={`px-4 py-2 ${
              activeTab === "new"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 font-Roboto"
            }`}
          >
            Write a Review
          </button>
        </div>

        {/* Existing reviews tab */}
        {activeTab === "existing" && (
          <div className="space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-2 rounded shadow-sm text-sm text-black overflow-hidden break-words font-Roboto"
                >
                  <p className="font-semibold">{review.user}:</p>
                  <p className="break-words">
                    {expandedReviewIndex === index
                      ? review.text
                      : truncateText(review.text, 100)}{" "}
                    {review.text.length > 100 && (
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() =>
                          setExpandedReviewIndex(
                            expandedReviewIndex === index ? null : index
                          )
                        }
                      >
                        {expandedReviewIndex === index
                          ? "Show less"
                          : "Read more"}
                      </span>
                    )}
                  </p>
                  <div>{renderStars(review.rating)}</div>
                </div>
              ))
            ) : (
              <p className="text-black text-sm font-Roboto">No reviews yet.</p>
            )}
          </div>
        )}

        {/* New review tab */}
        {activeTab === "new" && (
          <div className="flex flex-col h-full">
            {!user && (
              <p className="text-sm text-gray-500 mb-2 font-Roboto">
                You must log in to write a review.
              </p>
            )}
            <textarea
              className={`w-full p-2 border rounded mb-2 text-sm text-black flex-grow min-h-36 font-Roboto ${
                !user ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
              placeholder={
                user ? "Write your review here..." : "Log in to write a review."
              }
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              disabled={!user}
            ></textarea>
            {/* Rating */}
            <div className="flex items-center mb-4">
              <span
                className={`text-sm mr-2 font-Roboto ${
                  user ? "text-black" : "text-gray-400"
                }`}
              >
                Rating:
              </span>
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${
                      i < newRating
                        ? user
                          ? "text-yellow-400"
                          : "text-gray-400"
                        : "text-gray-300"
                    } ${user ? "cursor-pointer" : "cursor-not-allowed"}`}
                    onClick={() => {
                      if (user) setNewRating(i + 1);
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            {/* Submit button */}
            <button
              onClick={handleSubmit}
              className={`w-full py-2 rounded transition font-Roboto ${
                user
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!user}
            >
              Submit Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewWindow;
