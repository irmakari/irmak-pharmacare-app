import React, { useState, useEffect } from "react";
import TabBar from "../../components/tab-navigator/tabNavigator";
import FilterBar from "../../components/all-pharmacies/filter-bar/filterBar";
import PharmacyCard from "../../components/all-pharmacies/pharmacy-card/pharmacyCard";
import Pagination from "../../components/all-pharmacies/pagination/pagination";
import AllPharmaciesService from "../../collections/all-pharmacies-service/all.pharmacies.service";
import "./allPharmacies.css";

function AllPharmacies() {
    const [pharmacies, setPharmacies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [showOnlyOpen, setShowOnlyOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [neighborhood, setNeighborhood] = useState("");

    useEffect(() => {
        const loadPharmacies = async () => {
            try {
                const data = await AllPharmaciesService.fetchAllPharmacies();
                const list = Array.isArray(data) ? data : [];
                setPharmacies(list);
            } catch (err) {
                console.error("PHARMACIES_ERROR:", err);
                setError("Pharmacies could not be loaded.");
            } finally {
                setLoading(false);
            }
        };

        loadPharmacies();
    }, []);

    const filtered = pharmacies.filter((p) => {
        const matchSearch = p.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchOpen = showOnlyOpen ? p.statusType === "open" : true;

        const matchCity = city ? p.city === city : true;
        const matchDistrict = district ? p.district === district : true;
        const matchNeighborhood = neighborhood
            ? p.neighborhood === neighborhood
            : true;


        const matchActiveTab =
            activeTab === "night"
                ? p.isNightDuty === true
                : true;

        return (
            matchSearch &&
            matchOpen &&
            matchCity &&
            matchDistrict &&
            matchNeighborhood &&
            matchActiveTab
        );
    });

    if (loading) {
        return (
            <div className="allph-page">
                <TabBar />
                <main className="allph-content">
                    <h1 className="allph-title">All Pharmacies</h1>
                    <p>Loading...</p>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="allph-page">
                <TabBar />
                <main className="allph-content">
                    <h1 className="allph-title">All Pharmacies</h1>
                    <p>{error}</p>
                </main>
            </div>
        );
    }

    return (
        <div className="allph-page">
            <TabBar />

            <main className="allph-content">
                <div className="allph-header">
                    <h1 className="allph-title">All Pharmacies</h1>
                    <p className="allph-subtitle">
                        Browse pharmacies near you or anywhere in the city.
                    </p>
                </div>

                <FilterBar
                    search={search}
                    onSearchChange={setSearch}
                    showOnlyOpen={showOnlyOpen}
                    onToggleOpen={() => setShowOnlyOpen((prev) => !prev)}
                    city={city}
                    onCityChange={setCity}
                    district={district}
                    onDistrictChange={setDistrict}
                    neighborhood={neighborhood}
                    onNeighborhoodChange={setNeighborhood}
                />

                <section className="allph-list-section">
                    <div className="allph-list-header">
                        <span className="allph-list-title">
                            Pharmacies Near You
                        </span>
                        <div className="allph-tabs">
                            <button
                                className={
                                    activeTab === "all"
                                        ? "allph-tab allph-tab--active"
                                        : "allph-tab"
                                }
                                onClick={() => setActiveTab("all")}
                            >
                                All
                            </button>

                            <button
                                className={
                                    activeTab === "night"
                                        ? "allph-tab allph-tab--active"
                                        : "allph-tab"
                                }
                                onClick={() => setActiveTab("night")}
                            >
                                Night Duty
                            </button>
                        </div>
                    </div>

                    <div className="allph-list">
                        {filtered.map((pharmacy) => (
                            <PharmacyCard
                                key={pharmacy.id}
                                pharmacy={pharmacy}
                            />
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={3}
                        onPageChange={setCurrentPage}
                    />
                </section>
            </main>
        </div>
    );
}

export default AllPharmacies;