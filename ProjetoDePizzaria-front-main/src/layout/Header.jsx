import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'; // Importação do arquivo CSS externo

const Header = () => {
  return (
    <header className="header">
      <h1 className="title">Pizzaria Positivo</h1>
      <nav>
        <ul className="nav-links">
          <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
          <li><NavLink to="/CardapioDePizzas" activeClassName="active">Cardápio</NavLink></li>
          <li><NavLink to="/Cadastros" activeClassName="active">Cadastro</NavLink></li>
          <li><NavLink to="/PaginaDePedidos" activeClassName="active">Pedidos</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
