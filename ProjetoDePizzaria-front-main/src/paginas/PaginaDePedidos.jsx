import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5229/pedidos')
      .then((response) => {
        setPedidos(response.data);
      })
      .catch((error) => {
        console.error('Erro ao obter os pedidos:', error);
      });
  }, []);

  return (
    <div>
      <h2>Faça seu Pedido!</h2>
      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.id}>
            <h3>ID do Pedido: {pedido.id}</h3>
            <p>Data: {pedido.data}</p>
            <p>Total: R$ {pedido.total.toFixed(2)}</p>
            <p>Cliente: {pedido.cliente.nome}</p>
            <p>Itens do Pedido:</p>
            <ul>
              {pedido.itens.map((item) => (
                <li key={item.id}>
                  <p>Pizza: {item.pizza.nome}</p>
                  <p>Quantidade: {item.quantidade}</p>
                  <p>Valor: R$ {item.valor.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pedidos;
