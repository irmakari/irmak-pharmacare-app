import React from 'react';
import './productsToolBar.css'

const ProductsToolBar = () => {
    const PRICE_OPTIONS = ["Price: Low → High", "Price: High → Low", "Price: Newest", "Price: Popular"];
    return (
        <div className="products-toolbar">
            <div className="toolbar-search">
                <input type="text" placeholder="Search by product name..." />
            </div>

            <div className="toolbar-select">
                <select>
                    {PRICE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ProductsToolBar;
