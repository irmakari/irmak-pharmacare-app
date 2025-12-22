import React from "react";

const MedicineRow = ({ med, checked, onToggle }) => {
    return (
        <div className="medicine-row">
            <div className="medicine-main">
                <div className="medicine-name">
                    <span>{med.name}</span>
                    {med.isImportant && <span className="important-dot" />}
                </div>

                <div className="medicine-meta">
                    <span>{med.dosage}</span>
                    <span className="divider" />
                    <span>{med.quantity}</span>
                </div>
            </div>

            <div className="medicine-instructions">{med.instructions}</div>

            <label className="reserve-checkbox">
                <input type="checkbox" checked={checked} onChange={onToggle} />
                <span>Reserve for Pickup</span>
            </label>
        </div>
    );
};

export default MedicineRow;