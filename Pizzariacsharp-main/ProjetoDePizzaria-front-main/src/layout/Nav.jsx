// Nav.jsx
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        {/* Removi os links */}
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
  justifyContent: 'pace-around',
};

const liStyle = {
  display: 'inline',
};

export default Nav; // Reverti a linha de exportação