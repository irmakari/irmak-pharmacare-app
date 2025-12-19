import React from "react";
import "./themedText.css";

function ThemedText({ children, variant = "body", className = "" }) {
    const baseClass = "themed-text";
    const variantClass = `themed-text--${variant}`;

    return (
        <span className={`${baseClass} ${variantClass} ${className}`.trim()}>
      {children}
    </span>
    );
}

export default ThemedText;