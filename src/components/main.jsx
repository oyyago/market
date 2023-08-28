// Main.jsx
import React from 'react';
import './styles/style.css'
import { Link } from 'react-router-dom';

export function Main() {
  return (
    <div className="body">
      <div className="left_col">
        <div className="main_menu">
          <h3>General</h3>
          <ul className="side-menu">
            <li>
              <ul className="child_menu">
                <li>
                  <Link to="/produtos">Produtos</Link>
                </li>
                <li>
                  <Link to="/fornecedores">Fornecedores</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className="top_nav">
        <div className="nav_menu">
          <div className="toggle">teste</div>
        </div>
      </div>
      <div className="right_col" role="main">
          
      </div>
    </div>
  );
}
