import React from "react";

const ProductCardPrescription = ({ product, actionLabel = "Add", onAction }) => {
    if (!product) return null;

    const { name, brand, price, description } = product;

    return (
        <div className="pharmacy-card">
            <div className="pharmacy-name">{name}</div>
            <div className="pharmacy-meta">
                {brand ? <span>{brand}</span> : null}
                {description ? <span>{description}</span> : null}
            </div>
            <div className="pharmacy-select">
                <span>{price != null ? `${price} TRY` : null}</span>
                {onAction ? (
                    <button type="button" className="reserve-btn" onClick={() => onAction(product)}>
                        {actionLabel}
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default ProductCardPrescription;
