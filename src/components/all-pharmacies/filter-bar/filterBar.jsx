import React from "react";
import "./filterBar.css";

function FilterBar({
                       search,
                       onSearchChange,
                       showOnlyOpen,
                       onToggleOpen,

                       city,
                       onCityChange,
                       district,
                       onDistrictChange,
                       neighborhood,
                       onNeighborhoodChange
                   }) {
    return (
        <div className="filterbar">

            <input
                className="filterbar-search"
                type="text"
                placeholder="Search pharmacy name..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
            />

            <select
                className="filterbar-select"
                value={city}
                onChange={(e) => onCityChange(e.target.value)}
            >
                <option value="">City</option>
                <option value="İstanbul">İstanbul</option>
            </select>

            <select
                className="filterbar-select"
                value={district}
                onChange={(e) => onDistrictChange(e.target.value)}
            >
                <option value="">District</option>
                <option value="Ataşehir">Ataşehir</option>
                <option value="Kadiköy">Kadiköy</option>
                <option value="Maltepe">Maltepe</option>
            </select>

            <select
                className="filterbar-select"
                value={neighborhood}
                onChange={(e) => onNeighborhoodChange(e.target.value)}
            >
                <option value="">Neighborhood</option>
                <option value="İçerenköy">İçerenköy</option>
                <option value="Bağdat Caddesi">Bağdat Caddesi</option>
                <option value="Fındıklı">Fındıklı</option>
            </select>

            <div className="filterbar-toggle-wrapper">
                <span>Show only open</span>
                <button
                    type="button"
                    className={
                        showOnlyOpen ? "toggle toggle--on" : "toggle toggle--off"
                    }
                    onClick={onToggleOpen}
                >
                    <span className="toggle-knob" />
                </button>
            </div>
        </div>
    );
}

export default FilterBar;