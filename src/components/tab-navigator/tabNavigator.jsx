import React from "react";
import { NavLink } from "react-router-dom";
import "./tabNavigator.css";

function TabBar() {
    return (
        <header className="tabbar">
            <div className="tabbar-inner">
                <div className="tabbar-logo">PharmaCare</div>

                <nav className="tabbar-nav">
                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            isActive ? "tabbar-link tabbar-link--active" : "tabbar-link"
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/nightPharmacies"
                        className={({ isActive }) =>
                            isActive ? "tabbar-link tabbar-link--active" : "tabbar-link"
                        }
                    >
                        Night Pharmacies
                    </NavLink>

                    <NavLink
                        to="/allPharmacies"
                        className={({ isActive }) =>
                            isActive ? "tabbar-link tabbar-link--active" : "tabbar-link"
                        }
                    >
                        All Pharmacies
                    </NavLink>

                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            isActive ? "tabbar-link tabbar-link--active" : "tabbar-link"
                        }
                    >
                        Products
                    </NavLink>

                    <NavLink
                        to="/prescription"
                        className={({ isActive }) =>
                            isActive ? "tabbar-link tabbar-link--active" : "tabbar-link"
                        }
                    >
                        Prescription
                    </NavLink>

                    <NavLink
                        to="/aiHealthAssistant"
                        className={({ isActive }) =>
                            isActive ? "tabbar-link tabbar-link--active" : "tabbar-link"
                        }
                    >
                        AI Health Assistant
                    </NavLink>

                    <NavLink
                        to="/orderHistory"
                        className={({ isActive }) =>
                            isActive ? "tabbar-link tabbar-link--active" : "tabbar-link"
                        }
                    >
                        Order History
                    </NavLink>



                </nav>

                <div className="tabbar-actions">
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            isActive ? "tabbar-link tabbar-link--active" : "tabbar-link"
                        }
                    >
                        Profile
                    </NavLink>
                    <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                            isActive ? "tabbar-link tabbar-link--active" : "tabbar-link"
                        }
                    >
                        Cart
                    </NavLink>
                    <NavLink
                        to="/logout"
                        className={({ isActive }) =>
                            isActive ? "tabbar-link tabbar-link--active" : "tabbar-link"
                        }
                    >
                        Log Out
                    </NavLink>

                </div>
            </div>
        </header>
    );
}

export default TabBar;