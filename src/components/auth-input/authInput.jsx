import React from "react";
import ThemedText from "../themed-text/themedText";
import "./authInput.css";

function AuthInput({
                       label,
                       type = "text",
                       value,
                       onChange,
                       placeholder,
                       name,
                   }) {
    return (
        <div className="auth-input-wrapper">
            {label && (
                <ThemedText variant="body" className="auth-input-label">
                    {label}
                </ThemedText>
            )}

            <input
                className="auth-input-field"
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                name={name}
            />
        </div>
    );
}

export default AuthInput;