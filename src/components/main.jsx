import React from 'react';
import './styles/style.css'
import { Link,Outlet } from 'react-router-dom';

export function Main() {
  return (
    <div className="body">
      <div className="left_col">
        <div className="main_menu">
          <h3>General</h3>
          <ul className="side-menu">
                <li>
                  <Link to="/produtos">Produtos</Link>
                </li>
                <li>
                  <Link to="/fornecedores">Fornecedores</Link>
                </li>
          </ul>
        </div>
      </div>
      <div className="right_col">
          <Outlet/>
      </div>
    </div>
  );
}
