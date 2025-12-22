import React from "react";

const FilterBarPrescription = ({
    search,
    onSearchChange,
    city,
    onCityChange,
    district,
    onDistrictChange,
    neighborhood,
    onNeighborhoodChange,
    cityOptions = [],
    districtOptions = [],
    neighborhoodOptions = [],
}) => {
    const renderOptions = (options) =>
        options.map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
        ));

    return (
        <div className="pickup-filters">
            <input
                className="pickup-search"
                type="text"
                placeholder="Search pharmacy or address..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
            />

            <div className="pickup-selects">
                <select value={city} onChange={(e) => onCityChange(e.target.value)}>
                    <option value="">All cities</option>
                    {renderOptions(cityOptions)}
                </select>

                <select value={district} onChange={(e) => onDistrictChange(e.target.value)}>
                    <option value="">All districts</option>
                    {renderOptions(districtOptions)}
                </select>

                <select
                    value={neighborhood}
                    onChange={(e) => onNeighborhoodChange(e.target.value)}
                >
                    <option value="">All neighborhoods</option>
                    {renderOptions(neighborhoodOptions)}
                </select>
            </div>
        </div>
    );
};

export default FilterBarPrescription;
