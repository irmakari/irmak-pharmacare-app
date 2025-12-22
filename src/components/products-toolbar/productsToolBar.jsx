import React from 'react';
import './productsToolBar.css'

const ProductsToolBar = () => {
    return (
        <div className="products-toolbar">
            <div className="toolbar-search">
                <input type="text" placeholder="Search by product name..." />
            </div>

            <div className="toolbar-select">
             
            </div>
        </div>
    );
};

export default ProductsToolBar;
