import React from 'react';
import './prescriptionComponents.css'

const PrescriptionHeader = () => {
    return (
        <div className="prescription-content">
            <section className="page-header">
                <h1>View Your Prescription</h1>
                <p>Enter your e-Prescription code to see your prescribed medicines.</p>
            </section>
        </div>
    );
};

export default PrescriptionHeader;
