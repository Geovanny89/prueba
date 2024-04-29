import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card/Card";
import { products, logout } from "../redux/Action";
import Paginado from "./Pagination/Paginado";
import { useNavigate } from "react-router-dom";

import('./Home.css')

export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allCarts = useSelector((state) => state.allCarts); // Obtiene la lista de productos del estado Redux
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPorPage, setProductsPorPage] = useState(5);
    const handleLogout = () => {
        dispatch(logout()); // Dispatch la acción de logout
        navigate('/login');
    };


    const indexOfLastProduct = currentPage * productsPorPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPorPage;
    const currentProducts = allCarts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    console.log("Hola soy el producto", allCarts);

    useEffect(() => {
        dispatch(products());
    }, [dispatch]);

    return (
        <div className="home">
           <div className="button-container">
                <button className="button" onClick={handleLogout}>Logout</button>
            </div>
            <Paginado
                productsPorPage={productsPorPage}
                allProducts={allCarts.length}
                paginate={paginate}
            />
            {Array.isArray(currentProducts) && currentProducts.length > 0 ? (
                currentProducts.map((cart) => (
                    <Card
                        key={cart.id}
                        products={cart.products} // Pasamos la lista de productos dentro del carrito
                    />
                ))
            ) : (
                <p>Cargando productos...</p>
            )}
        </div>
    );
}
