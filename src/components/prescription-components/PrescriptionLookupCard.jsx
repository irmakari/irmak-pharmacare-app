import React from "react";

const PrescriptionLookupCard = ({
                                    prescriptionCode,
                                    onPrescriptionCodeChange,
                                    onSubmit,
                                    loading,
                                    error,
                                }) => {
    return (
        <section className="lookup-card">
            <form className="lookup-form" onSubmit={onSubmit}>
                <input
                    className="lookup-input"
                    type="text"
                    placeholder="Enter prescription code (RX-2025-001,RX-2025-002,RX-2025-003)"
                    value={prescriptionCode}
                    onChange={(e) => onPrescriptionCodeChange(e.target.value)}
                />

                <button className="lookup-button" type="submit" disabled={loading}>
                    {loading ? "Retrieving..." : "Retrieve Prescription"}
                </button>
            </form>

            {error ? <div className="lookup-error">{error}</div> : null}
        </section>
    );
};

export default PrescriptionLookupCard;