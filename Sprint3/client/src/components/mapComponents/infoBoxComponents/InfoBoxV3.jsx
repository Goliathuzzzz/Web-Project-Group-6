import { useState } from "react";
import bookmark from "../../../assets/images/info_bookmark.png";
import locate from "../../../assets/images/info_loc.png";
import Tesla from "../../../assets/images/tesla_img.png";
import Type2 from "../../../assets/images/type2_img.png";
import CCS2 from "../../../assets/images/ccs6_img.png";
import Chademo from "../../../assets/images/chademo_img.png";
import ReviewWindow from "./../Reviews";
import reviewsData from "../../../../../server/mock-data/reviews_mock_data.json";

const providers = ["Neste", "ABC", "Recharge", "Helen", "Virta", "Tesla", "Lidl", "K-Lataus"];

function InfoBox({ station, onBookmark }) {
    const [isReviewWindowOpen, setReviewWindowOpen] = useState(false);

    const googleMapsLink = `https://www.google.com/maps?q=${station.location.latitude},${station.location.longitude}`;
    const googleMapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${station.location.latitude},${station.location.longitude}`;

    const openReviewWindow = () => setReviewWindowOpen(true);
    const closeReviewWindow = () => setReviewWindowOpen(false);

    const connectorImages = {
        "Type 2": Type2,
        CCS: CCS2,
        CHAdeMO: Chademo,
        Tesla: Tesla,
    };

    const connectorColors = {
        "Type 2": "text-ctaYellow",
        CCS: "text-salmonRed",
        CHAdeMO: "text-electricBlue",
        Tesla: "text-eGreen",
    };

    // Function to find the provider and station name
    const findProviderAndStationName = (title) => {
        let provider = "Unknown"; // Default provider
        let stationName = title;

        // Loop through the list of providers and check if the title contains any of them
        for (let i = 0; i < providers.length; i++) {
            if (title.includes(providers[i])) {
                provider = providers[i];
                break; // Once a provider is found, no need to continue searching
            }
        }

        return { provider, stationName };
    };
    const { provider, stationName } = findProviderAndStationName(station.location.title);

    const stationReviews =
        reviewsData.find((data) => data.stationName === station.name)?.reviews ||
        [];

    // Calculate the average rating
    const calculateAverageRating = (reviews) => {
        if (!reviews || reviews.length === 0) return 0;
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return Math.round(totalRating / reviews.length);
    };

    const averageRating = calculateAverageRating(stationReviews);

    return (
        <div className="absolute top-0 left-0 m-4 p-4 bg-gradient-to-b from-darkerBlue to-darkBlue text-white rounded-md shadow-lg w-fit">
            <div className="flex space-x-2">
                {/* Station name */}
                <h3 className="text-xl font-semibold mb-2 font-Orbitron">
                    {station.location.title}
                </h3>
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
            {/* Location and provider */}
            <p className="font-Roboto">
                <strong>Location:</strong>{" "}
                <a
                    href={googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:underline"
                >
                    {station.location.title}, {station.location.addressLine1}, {station.location.town}, {station.location.postcode}
                </a>
            </p>
            <p className="font-Roboto">
                <strong>Provider:</strong> {provider}
            </p>
            {/* Usage cost */}
            <p className="font-Roboto">
                <strong>Usage Cost:</strong> {station.usageCost || "Not Available"}
            </p>
            {/* Connectors */}
            <div className="mt-3 space-y-3">
                {station.connections.map((connector, index) => {
                    const connectorType =
                        connector.connectionTypeID === 33 ? "CSS" : "Type 2";
                    return (
                        <div
                            key={index}
                            className="relative p-3 bg-mediumBlue text-white rounded-md shadow space-y-1"
                        >
                            <div className="flex items-center">
                                <img
                                    src={connectorImages[connectorType] || ""}
                                    alt={connectorType}
                                    className="w-6 h-6 mr-2"
                                />
                                <span
                                    className={`${connectorColors[connectorType] || "text-gray-400"
                                        } font-semibold font-Orbitron`}
                                >
                                    {connectorType}
                                </span>
                                {/* Connector availability */}
                                {/* <span className="ml-1 font-Orbitron">{`${station.available}/${station.total}`}</span> */}
                                {/* Power */}
                                <span className="ml-2 font-Roboto">{connector.powerKW} kW</span>
                            </div>
                            <div className="mt-3 flex flex-col">
                                <div className="font-Roboto">
                                    <strong>24h Price</strong>{" "}
                                    {station.usageCost === "N/A" ? "Not Available" : station.usageCost}
                                </div>
                                {/* Average rating */}
                                <div className="flex items-center space-x-2">
                                    <span className="text-yellow-400">
                                        {"★".repeat(averageRating)}
                                        {"☆".repeat(5 - averageRating)}
                                    </span>
                                    <button
                                        onClick={openReviewWindow}
                                        className="text-blue-300 hover:underline"
                                    >
                                        Show reviews
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* Review window */}
            {isReviewWindowOpen && (
                <ReviewWindow station={station} onClose={closeReviewWindow} />
            )}
        </div>
    );
}

export default InfoBox;
