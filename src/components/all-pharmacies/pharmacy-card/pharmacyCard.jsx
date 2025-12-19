import React from "react";
import { Link } from "react-router-dom";
import "./pharmacyCard.css";

function PharmacyCard({ pharmacy }) {
    const { id, name, distance, address, statusText, statusType } = pharmacy;

    const statusClass =
        statusType === "open"
            ? "status-pill status-pill--open"
            : statusType === "closeSoon"
                ? "status-pill status-pill--soon"
                : "status-pill status-pill--closed";

    const statusLabel =
        statusType === "open"
            ? "Open Now"
            : statusType === "closeSoon"
                ? "Closes Soon"
                : "Closed";

    return (
        <div className="phcard">
            <div className="phcard-main">
                <div>
                    <h3 className="phcard-title">{name}</h3>
                    <p className="phcard-line">{distance}</p>
                    <p className="phcard-line">{address}</p>
                    <p className="phcard-line">{statusText}</p>
                </div>

                <div className="phcard-status">
                    <span className={statusClass}>{statusLabel}</span>
                </div>
            </div>

            <div className="phcard-footer">
                <div className="phcard-links">
                    <Link to={`/pharmacies/${id}`} className="phcard-link">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PharmacyCard;