import React from "react";
import MedicineRow from "./MedicineRow";

const PrescribedMedicinesCard = ({
                                     medicines = [],
                                     reservedMap = {},
                                     selectAll = false,
                                     onSelectAll,
                                     onToggleMedicine,
                                 }) => {
    return (
        <div className="card medicines-card">
            <div className="card-header">
                <div>
                    <h2>Prescribed Medicines</h2>
                    <p className="muted">
                        Review your medicines and reserve them for pickup at your preferred pharmacy.
                    </p>
                </div>

                {medicines.length ? (
                    <label className="select-all">
                        <input type="checkbox" checked={selectAll} onChange={onSelectAll} />
                        <span>Select All</span>
                    </label>
                ) : null}
            </div>

            <div className="medicines-list">
                {medicines.map((med) => (
                    <MedicineRow
                        key={med.id}
                        med={med}
                        checked={Boolean(reservedMap[med.id])}
                        onToggle={() => onToggleMedicine(med.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default PrescribedMedicinesCard;