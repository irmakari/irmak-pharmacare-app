import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import UserService from "../../collections/user-service/user.service";
import ThemedText from "../../components/themed-text/themedText";
import AuthInput from "../../components/auth-input/authInput";
import PrimaryButton from "../../components/primary-button/primaryButton";
import "./login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = await UserService.fetchUsers();
            const users = Array.isArray(payload) ? payload : payload?.data;

            const found = users?.find(
                (u) => (u.email || "") === email && u.password === password
            );
            if (!found) {
                alert("Email veya şifre hatalı.");
                return;
            }
            alert("Giriş başarılı.");
            navigate("/home");
        } catch (err) {
            alert("Giriş sırasında bir sorun oluştu.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <ThemedText variant="title" className="login-title">
                    Login
                </ThemedText>

                <form onSubmit={onSubmit} className="login-form">
                    <AuthInput
                        label="Email"
                        type="email"
                        placeholder="Enter your email or phone number"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                    />

                    <AuthInput
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                    />

                    <div className="login-row">
                        <div>
                            <input type="checkbox" />
                            <span className="remember-me"> Remember me</span>
                        </div>
                        <Link className="forgot-link" to="/forgotPassword">
                            Forgot Password?
                        </Link>
                    </div>

                    <PrimaryButton type="submit">Login</PrimaryButton>

                    <Link className="create-account" to="/createAccount">
                        Create Account
                    </Link>
                </form>
            </div>

            <div className="login-right">
                <div className="login-image-placeholder">Image</div>
            </div>
        </div>
    );
}

export default Login;