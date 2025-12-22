import React from "react";

const PickupTimeCard = ({ pickupTime, onPickupTimeChange, reservationError, onReserve }) => {
    return (
        <section className="card pickup-time-card">
            <div className="card-header">
                <div>
                    <h2>Choose Pickup Time</h2>
                    <p className="muted">Dummy options for now—select how soon you want your order ready.</p>
                </div>
            </div>

            <select
                className="pickup-time-select"
                value={pickupTime}
                onChange={(e) => onPickupTimeChange?.(e.target.value)}
            >
                <option value="ready-now">Ready now</option>
                <option value="15-min">15 minutes</option>
                <option value="30-min">30 minutes</option>
                <option value="45-min">45 minutes</option>
                <option value="60-min">1 hour</option>
            </select>

            {reservationError && <div className="lookup-error">{reservationError}</div>}

            <button className="reserve-btn" type="button" onClick={onReserve}>
                Reserve for Pickup
            </button>
        </section>
    );
};

export default PickupTimeCard;
