import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import TabBar from "../../components/tab-navigator/tabNavigator";
import AllPharmaciesService from "../../collections/all-pharmacies-service/all.pharmacies.service";
import "./pharmacyDetails.css";

function PharmacyDetails() {
    const { id } = useParams();
    const [pharmacy, setPharmacy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadPharmacy = async () => {
            try {
                const data = await AllPharmaciesService.fetchPharmacyById(id);
                setPharmacy(data);
            } catch (err) {
                console.error(err);
                setError("Pharmacy details could not be loaded.");
            } finally {
                setLoading(false);
            }
        };

        loadPharmacy();
    }, [id]);

    if (loading) {
        return (
            <div className="phd-page">
                <TabBar />
                <main className="phd-content">
                    <p>Loading</p>
                </main>
            </div>
        );
    }

    if (error || !pharmacy) {
        return (
            <div className="phd-page">
                <TabBar />
                <main className="phd-content">
                    <p>{error || "Pharmacy not found."}</p>
                </main>
            </div>
        );
    }

    const {
        name,
        address,
        distance,
        phone,
        statusText,
        statusType,
        schedule = [],
        services = [],
    } = pharmacy;

    return (
        <div className="phd-page">
            <TabBar />

            <main className="phd-content">
                <h1 className="phd-title">{name}</h1>

                <div className="phd-breadcrumb">
                    <Link to="/home">Home</Link>
                    <span> &gt; </span>
                    <Link to="/allPharmacies">All Pharmacies</Link>
                    <span> &gt; </span>
                    <span>{name}</span>
                </div>

                <div className="phd-main-grid">
                    <section className="phd-card phd-info-card">
                        <h2 className="phd-card-title">{name}</h2>

                        <p className="phd-text-line">{address}</p>
                        {distance && (
                            <p className="phd-text-muted">{distance}</p>
                        )}

                        <div className="phd-contact-row">
                            <span className="phd-phone">{phone}</span>
                            <a
                                href={`tel:${phone}`}
                                className="phd-call-btn"
                            >
                                Call
                            </a>
                        </div>

                        <div
                            className={`phd-status-badge phd-status--${
                                statusType || "open"
                            }`}
                        >
                            {statusText || "Open Now"}
                        </div>

                        <div className="phd-hours">
                            <h3 className="phd-hours-title">Opening Hours</h3>
                            <div className="phd-hours-table">
                                {schedule.map((row) => (
                                    <div
                                        key={row.day}
                                        className="phd-hours-row"
                                    >
                                        <span className="phd-hours-day">
                                            {row.day}
                                        </span>
                                        <span className="phd-hours-time">
                                            {row.closed
                                                ? "Closed"
                                                : `${row.open} - ${row.close}`}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                </div>

                <section className="phd-services">
                    {services.map((service) => (
                        <button
                            key={service}
                            className="phd-service-pill"
                        >
                            {service}
                        </button>
                    ))}
                </section>

                <div className="phd-alert">
                    For urgent medical needs, please call emergency services.
                </div>
            </main>
        </div>
    );
}

export default PharmacyDetails;