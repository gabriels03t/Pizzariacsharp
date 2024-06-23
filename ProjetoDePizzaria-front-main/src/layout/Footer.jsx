/* Footer.jsx */
import React from 'react';

function Footer() {
  return (
    <footer style={footerStyle}>
      <p style={textStyle}>&copy; 2024 Pizzaria Positivo</p>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px 0',
};

const textStyle = {
  margin: '0',
};

export default Footer;
