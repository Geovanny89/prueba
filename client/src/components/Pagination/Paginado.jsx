import React from 'react';
import './Paginado.css'

export default function Paginado({ productsPorPage, allProducts, paginate }) {
    // const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allProducts / productsPorPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav >
      <ul className="paginado">
        
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
        
      </ul>
    </nav>
  );
}
