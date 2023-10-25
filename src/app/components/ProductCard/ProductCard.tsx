"use client";

import React from "react";
import styles from "./ProductCard.module.css";

const ProductCard = () => {
    return (
        <div className={styles.card}>
            <button onClick={() => console.log("Click")}>Add to Cart</button>
        </div>
    );
};

export default ProductCard;
