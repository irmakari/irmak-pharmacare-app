import React from "react";

const PrescriptionSummaryCard = ({ prescription, statusTone }) => {
    if (!prescription) return null;

    return (
        <div className="card summary-card">
            <div className="card-header">
                <h2>Prescription Summary</h2>
            </div>

            <div className="summary-grid">
                <div className="summary-item">
                    <span className="label">Prescription Holder:</span>
                    <span className="value">{prescription.holderName}</span>
                </div>

                <div className="summary-item">
                    <span className="label">Doctor&apos;s Name:</span>
                    <span className="value">{prescription.doctorName}</span>
                </div>

                <div className="summary-item">
                    <span className="label">Issued Date:</span>
                    <span className="value">{prescription.issuedDate}</span>
                </div>

                <div className="summary-item">
                    <span className="label">Status:</span>
                    <span className={`status-pill ${statusTone}`}>
            {prescription.status}
          </span>
                </div>
            </div>

            {prescription.note ? (
                <div className="note">
                    <span className="label">Note:</span>
                    <p>{prescription.note}</p>
                </div>
            ) : null}
        </div>
    );
};

export default PrescriptionSummaryCard;