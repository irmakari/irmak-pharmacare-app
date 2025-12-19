import React, { useEffect, useState } from "react";
import NightPharmaciesService from "../../collections/night-pharmacies-service/night.pharmacies.service";
import "./nightPharmaciesSection.css";
import {Link} from "react-router-dom";

function NightPharmaciesSection() {
    const [nightPharmacies, setNightPharmacies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadNightPharmacies = async () => {
            try {
                const data = await NightPharmaciesService.fetchNightPharmacies();
                const list = Array.isArray(data) ? data : [];
                setNightPharmacies(list);
            } catch (err) {
                console.error(err);
                setError("Night pharmacies could not be loaded.");
            } finally {
                setLoading(false);
            }
        };
        loadNightPharmacies();
    }, []);

    if (loading) {
        return (
            <section className="night-section">
                <h2 className="section-title">Night Pharmacies</h2>
                <p>Loading</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="night-section">
                <h2 className="section-title">Night Pharmacies</h2>
                <p>{error}</p>
            </section>
        );
    }

    return (
        <section className="night-section">
            <h2 className="section-title">Night Pharmacies</h2>
            <div className="night-cards">
                {nightPharmacies.map((item) => (
                    <div key={item.id} className="night-card">
                        <div className="night-card-header">
                            <h3 className="night-card-title">{item.name}</h3>
                            <Link
                                to={`/pharmacies/${item.id}`}
                                className="night-card-link"
                            >
                                View details
                            </Link>
                        </div>
                        <p className="night-card-text">{item.distance}</p>
                        <p className="night-card-text">{item.statusText}</p>
                        <div className="night-card-footer">
                            <span className="night-card-phone">
                                📞 {item.phone}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default NightPharmaciesSection;