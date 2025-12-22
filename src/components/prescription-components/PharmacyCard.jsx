import React from "react";
import { Link } from "react-router-dom";

const PharmacyCard = ({ pharmacy, selected = false, onSelect }) => {
    if (!pharmacy) return null;

    const { id, name, distance, address, phone } = pharmacy;

    return (
        <div className={`pharmacy-card${selected ? " pharmacy-card--selected" : ""}`}>
            <div className="card-header">
                <div>
                    <div className="pharmacy-name">{name}</div>
                    <div className="pharmacy-meta">
                        <span>{distance}</span>
                        <span>{address}</span>
                    </div>
                </div>
            </div>

            <div className="pharmacy-meta">
                {phone ? <span className="pharmacy-phone">{phone}</span> : null}
                <Link to={`/pharmacies/${id}`} className="view-all-link">
                    View details
                </Link>
            </div>

            <label className="pharmacy-select">
                <input
                    type="radio"
                    name="pickup-pharmacy"
                    checked={selected}
                    onChange={() => onSelect?.(id)}
                />
                <span>{selected ? "Selected for pickup" : "Select for pickup"}</span>
            </label>
        </div>
    );
};

export default PharmacyCard;
