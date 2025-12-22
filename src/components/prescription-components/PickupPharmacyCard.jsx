import React from "react";
import { Link } from "react-router-dom";
import FilterBarPrescription from "./FilterBarPrescription";
import PharmacyCard from "./PharmacyCard";

const PickupPharmacyCard = ({
                                search,
                                onSearchChange,
                                city,
                                onCityChange,
                                district,
                                onDistrictChange,
                                neighborhood,
                                onNeighborhoodChange,

                                cityOptions,
                                districtOptions,
                                neighborhoodOptions,

                                pharmaciesLoading,
                                pharmaciesError,
                                pharmacies,
                                selectedPharmacyId,
                                onSelectPharmacy,
                            }) => {
    return (
        <section className="card pickup-card">
            <div className="card-header pickup-header">
                <div>
                    <h2>Choose a Pharmacy for Pickup</h2>
                    <p className="muted">
                        Filter pharmacies and select one for pickup.
                    </p>
                </div>
            </div>

            <FilterBarPrescription
                search={search}
                onSearchChange={onSearchChange}
                city={city}
                onCityChange={onCityChange}
                district={district}
                onDistrictChange={onDistrictChange}
                neighborhood={neighborhood}
                onNeighborhoodChange={onNeighborhoodChange}
                cityOptions={cityOptions}
                districtOptions={districtOptions}
                neighborhoodOptions={neighborhoodOptions}
            />

            {pharmaciesLoading && <p className="muted">Loading pharmacies...</p>}
            {pharmaciesError && <div className="lookup-error">{pharmaciesError}</div>}

            {!pharmaciesLoading && !pharmaciesError && (
                <>
                    <div className="pharmacy-grid">
                        {pharmacies.slice(0, 3).map((pharmacy) => (
                            <PharmacyCard
                                key={pharmacy.id}
                                pharmacy={pharmacy}
                                selected={pharmacy.id === selectedPharmacyId}
                                onSelect={onSelectPharmacy}
                            />
                        ))}

                        {!pharmacies.length && (
                            <div className="pharmacy-empty">
                                No pharmacies match your filters.
                            </div>
                        )}
                    </div>

                    <div className="pickup-actions">
                        <Link to="/allPharmacies" className="view-all-link">
                            View all pharmacies
                        </Link>
                    </div>
                </>
            )}
        </section>
    );
};

export default PickupPharmacyCard;
