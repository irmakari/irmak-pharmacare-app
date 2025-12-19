import React from "react";
import "./primaryButton.css";

function PrimaryButton({ children, type = "button", onClick, fullWidth = true }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="primary-btn"
        >
            {children}
        </button>
    );
}

export default PrimaryButton;