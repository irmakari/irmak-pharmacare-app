import React from "react";
import { Routes, Route } from "react-router-dom";

import { Login } from "./pages/login";
import { Home } from "./pages/home";
import AllPharmacies from "./pages/all-pharmacies/allPharmacies";
import AiAssistant from "./pages/ai-assistant/aiAssistant";
import {NightPharmacies, PharmacyDetails, Products, ProductDetails} from "./pages";
import Prescription from "./pages/prescription/prescription";
import {OrderHistory} from "./pages";
import Profile from "./pages/profile/profile";



function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/allPharmacies" element={<AllPharmacies />} />
            <Route path="/aiHealthAssistant" element={<AiAssistant />} />
            <Route path="/nightPharmacies" element={<NightPharmacies />} />
            <Route path="/products" element={<Products/>} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/prescription" element={<Prescription/>} />
            <Route path="/orderHistory" element={<OrderHistory/>} />
            <Route path="/pharmacies/:id" element={<PharmacyDetails />} />
            <Route path="/profile" element={<Profile />} />




        </Routes>
    );
}

//<Route path="/pharmacyDetails" element={<PharmacyDetails />} />

export default App;
