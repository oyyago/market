import React from 'react';
import './styles/style.css'
import { Link, Outlet } from 'react-router-dom';

export function Root() {
  return (
    <div>
      <div className="left_col">
          <Link to={`/`}  > <h3>Admin Project </h3></Link>
          <ul className="side-menu">
            <li>
              <Link to={`/produtos`}>Produtos</Link>
            </li>
            <li>
              <Link to={`/fornecedores`}>Fornecedores</Link>
            </li>
            <li>
              <Link to={`/funcionarios`}>Funcionarios</Link>
            </li>
          </ul>
      </div>
      <div className="right_col">
        <Outlet />
      </div>
    </div>
  );
}
