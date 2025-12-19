import React from "react";
import {TabNavigator} from "../../components/tab-navigator";
import {NightPharmaciesSection} from "../../components/night-pharmacies-section";
import {RecommendedProductsSection} from "../../components/recommended-products-section";
import "./home.css";

function Home() {
    return (
        <div className="home-page">
            <TabNavigator />
            <main className="home-content">
                <NightPharmaciesSection />
                <RecommendedProductsSection />
            </main>
        </div>
    );
}

export default Home;