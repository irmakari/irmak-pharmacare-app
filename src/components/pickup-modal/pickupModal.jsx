import React from "react";
import "./pickupModal.css";

function PickupModal({
    open,
    onClose,
    prescriptionNumber,
    pharmacyName,
    pickupTimeText,
    pickupCode,
    medicines = [],
}) {
    if (!open) return null;

    return (
        <div className="pickup-modal-overlay">
            <div className="pickup-modal">
                <div className="pickup-modal-icon">
                    <span className="checkmark">✓</span>
                </div>
                <h3 className="pickup-modal-title">Prescription Reserved!</h3>

                <div className="pickup-modal-block">
                    <div className="pickup-modal-label">Estimated Preparation Time:</div>
                    <div className="pickup-modal-value">{pickupTimeText}</div>
                </div>

                <div className="pickup-modal-info">
                    <div className="pickup-modal-label">Pickup Code:</div>
                    <div className="pickup-modal-note">
                        {pickupCode || "Please check your code and try again."}
                    </div>
                    {prescriptionNumber && (
                        <div className="pickup-modal-detail">
                            Prescription Number: <strong>{prescriptionNumber}</strong>
                        </div>
                    )}
                    {pharmacyName && (
                        <div className="pickup-modal-detail">
                            Pickup Pharmacy: <strong>{pharmacyName}</strong>
                        </div>
                    )}
                </div>

                {!!medicines.length && (
                    <div className="pickup-modal-meds">
                        <div className="pickup-modal-label">Reserved Medicines:</div>
                        <ul>
                            {medicines.map((med) => (
                                <li key={med.id}>
                                    <strong>{med.name}</strong>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <button className="pickup-modal-btn" type="button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default PickupModal;
