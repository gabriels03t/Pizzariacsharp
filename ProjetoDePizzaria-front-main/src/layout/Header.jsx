import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>Pizzaria Positivo</h1>
      <nav style={navStyle}>
        <ul style={ulStyle}>
          <li style={liStyle}><NavLink to="/" style={linkStyle}>Home</NavLink></li>
          <li style={liStyle}><NavLink to="/CardapioDePizzas" style={linkStyle}>Cardápio</NavLink></li>
          <li style={liStyle}><NavLink to="/Cadastros" style={linkStyle}>Cadastro</NavLink></li>
          <li style={liStyle}><NavLink to="/PaginaDePedidos" style={linkStyle}>Pedidos</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#333',
  color: '#fff',
};

const titleStyle = {
  margin: '0',
};

const navStyle = {
  marginLeft: 'auto',
};

const ulStyle = {
  listStyleType: 'none',
  margin: '0',
  padding: '0',
};

const liStyle = {
  display: 'inline',
  marginRight: '20px',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  transition: 'color 0.3s',
};

export default Header;
