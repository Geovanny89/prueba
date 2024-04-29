import React from 'react';
import './Card.css'

export default function Card({ id, products }) {
    return (
        <div className="product-card">
            {products?.map(product => (
                <div key={product.id} className="product-details">
                    <img src={product.thumbnail} alt={product.title} />
                    <h3>{product.title}</h3>
                    <p>Price: ${product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Total: ${product.total}</p>
                </div>
            ))}
        </div>
    );
}
