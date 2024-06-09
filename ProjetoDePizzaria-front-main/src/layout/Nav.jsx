// Nav.jsx
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li style={liStyle}><NavLink to="/">Home</NavLink></li>
        <li style={liStyle}><NavLink to="/cadastros">Cadastros</NavLink></li>
        <li style={liStyle}><NavLink to="/cardapiodepizzas">Cardápio de Pizzas</NavLink></li>
        <li style={liStyle}><NavLink to="/paginadepedidos">Faça seu Pedido</NavLink></li>
      </ul>
    </nav>
  );
}

const navStyle = {
  backgroundColor: '#333',
  padding: '10px',
};

const ulStyle = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  justifyContent: 'space-around',
};

const liStyle = {
  display: 'inline',
};

export default Nav;
