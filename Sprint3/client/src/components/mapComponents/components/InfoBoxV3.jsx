import { useState } from "react";
import bookmark from "../../../assets/images/info_bookmark.png";
import locate from "../../../assets/images/info_loc.png";
import ReviewWindow from "../Reviews";
import reviewsData from "../../../../../server/mock-data/reviews_mock_data.json";

import { providers, connectorImages, connectorColors, connectorTypes } from "../connectorUtils";

const findProvider = (title) => {
    return providers.find(provider => title.includes(provider)) || "Unknown";
};

const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round(totalRating / reviews.length);
};

const getConnectorTypeName = (connectionTypeID) => {
    return connectorTypes[connectionTypeID] || "Type 2";
};

// Connector Component
const ConnectorInfo = ({ connector, powerKW, reviews, onShowReviews }) => {
    const connectorType = getConnectorTypeName(connector.connectionTypeID);
    const averageRating = calculateAverageRating(reviews);

    return (
        <div className="relative p-3 bg-mediumBlue text-white rounded-md shadow space-y-1">
            <div className="flex items-center">
                <img
                    src={connectorImages[connectorType] || ""}
                    alt={connectorType}
                    className="w-6 h-6 mr-2"
                />
                <span
                    className={`${connectorColors[connectorType] || "text-gray-400"} font-semibold font-Orbitron`}
                >
                    {connectorType}
                </span>
                {/* Power */}
                <span className="ml-2 font-Roboto">{powerKW} kW</span>
                {/* Connector availability */}
                {/* <span className="ml-1 font-Orbitron">{`${station.available}/${station.total}`}</span> */}
            </div>
            <div className="mt-3 flex flex-col">
                <div className="font-Roboto">
                    {/*<strong>24h Price</strong>{" "}*/}
                </div>
                {/* Average rating */}
                <div className="flex items-center space-x-2">
                    <span className="text-yellow-400">
                        {"★".repeat(averageRating)}
                        {"☆".repeat(5 - averageRating)}
                    </span>
                    {/* Show reviews button */}
                    <button
                        onClick={onShowReviews}
                        className="text-blue-300 hover:underline"
                    >
                        Show reviews
                    </button>
                </div>
            </div>
        </div>
    );
};

// InfoBox Component
function InfoBox({ station, onBookmark }) {
    const [isReviewWindowOpen, setReviewWindowOpen] = useState(false);
    const googleMapsLink = `https://www.google.com/maps?q=${station.location.latitude},${station.location.longitude}`;
    const googleMapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${station.location.latitude},${station.location.longitude}`;

    const openReviewWindow = () => setReviewWindowOpen(true);
    const closeReviewWindow = () => setReviewWindowOpen(false);
    const provider = findProvider(station.location.title);

    const stationReviews = reviewsData.find((data) => data.stationName === station.name)?.reviews || [];

    return (
        <div className="absolute top-0 left-0 m-4 p-4 bg-gradient-to-b from-darkerBlue to-darkBlue text-white rounded-md shadow-lg w-fit">
            {/* Station info */}
            <div className="flex space-x-2">
                {/* Station title */}
                <h3 className="text-xl font-semibold mb-2 font-Orbitron">{station.location.title}</h3>
                <div className="absolute top-4 right-4 flex">
                    {/* Bookmark button */}
                    <button
                        onClick={() => onBookmark(station)}
                        className="w-7 h-7 flex items-center justify-center transform transition-transform duration-200 hover:scale-110 hover:brightness-150"
                        title="Bookmark"
                    >
                        <img src={bookmark} alt="Bookmark" className="w-4 h-4" />
                    </button>
                    {/* Navigate button */}
                    <button
                        onClick={() => window.open(googleMapsDirections, "_blank")}
                        className="w-7 h-7 flex items-center justify-center transform transition-transform duration-200 hover:scale-110 hover:brightness-150"
                        title="Navigate"
                    >
                        <img src={locate} alt="Navigate" className="w-4 h-4" />
                    </button>
                </div>
            </div>
            {/* Station location */}
            <p className="font-Roboto">
                <strong>Location: </strong>{" "}
                <a
                    href={googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:underline"
                >
                    {station.location.title}, {station.location.addressLine1}, {station.location.town}, {station.location.postcode}
                </a>
            </p>
            {/* Station provider */}
            <p className="font-Roboto"><strong>Provider:</strong> {provider}</p>
            {/* Station usage cost */}
            <p className="font-Roboto"><strong>Usage Cost:</strong> {station.usageCost || "N/A"}</p>
            {/* Connectors */}
            <div className="mt-3 space-y-3">
                {station.connections.map((connector, index) => (
                    <ConnectorInfo
                        key={index}
                        connector={connector}
                        powerKW={connector.powerKW}
                        reviews={stationReviews}
                        onShowReviews={openReviewWindow}
                    />
                ))}
            </div>
            {isReviewWindowOpen && <ReviewWindow station={station} onClose={closeReviewWindow} />}
        </div>
    );
}

export default InfoBox;