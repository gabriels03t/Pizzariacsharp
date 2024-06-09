/* Aside.jsx */
import React from 'react';

function Aside() {
  return (
    <aside style={asideStyle}>
      <h3 style={titleStyle}>Links Úteis</h3>
      <ul style={listStyle}>
        <li><a href="/">Home</a></li>
        <li><a href="/cadastros">Cadastros</a></li>
        <li><a href="/cardapiodepizzas">Cardápio de Pizzas</a></li>
        <li><a href="/paginadepedidos">Faça seu Pedido</a></li>
      </ul>
    </aside>
  );
}

const asideStyle = {
  backgroundColor: '#f4f4f4',
  padding: '10px',
};

const titleStyle = {
  color: '#333',
};

const listStyle = {
  listStyleType: 'none',
  padding: '0',
};

export default Aside;
