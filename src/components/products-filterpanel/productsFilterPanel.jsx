import React from "react";
import { formatCategorySlug } from "../../utils/product";
import "./productsFilterPanel.css";

const ProductsFilterPanel = ({
                          categories,
                          brands,
                          priceOptions,

                          selectedCategories,
                          selectedBrands,
                          selectedPriceOption,

                          onToggleCategory,
                          onToggleBrand,
                          onChangePriceOption,
                          onApply,
                          onReset,
                      }) => {
    return (
        <aside className="filters-panel">
            <h3 className="filters-title">Filters</h3>

            <div className="filter-group">
                <h4 className="filter-heading">Category</h4>
                <ul className="filter-list">
                    {categories.map((item) => (
                        <li key={item} className="filter-item">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(item)}
                                    onChange={() => onToggleCategory(item)}
                                />
                                {" "}{formatCategorySlug(item)}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="filter-group">
                <h4 className="filter-heading">Brand</h4>
                <ul className="filter-list">
                    {brands.map((brand) => (
                        <li key={brand} className="filter-item">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedBrands.includes(brand)}
                                    onChange={() => onToggleBrand(brand)}
                                />
                                {" "}{brand}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="filter-group">
                <h4 className="filter-heading">Price Range</h4>
                <label className="filter-subtitle">Select Range</label>

                <div className="filter-select">
                    <select
                        value={selectedPriceOption}
                        onChange={(e) => onChangePriceOption(e.target.value)}
                    >
                        {priceOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <span className="filter-caret">▼</span>
                </div>
            </div>

            <div className="filter-actions">
                <button type="button" className="filter-btn filter-btn--apply" onClick={onApply}>
                    Apply
                </button>
                <button type="button" className="filter-btn filter-btn--reset" onClick={onReset}>
                    Reset Filters
                </button>
            </div>
        </aside>
    );
};

export default ProductsFilterPanel;
