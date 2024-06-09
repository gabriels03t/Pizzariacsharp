import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CardapioPizzas() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5229/pizzas')
      .then((response) => {
        setPizzas(response.data);
      })
      .catch((error) => {
        console.error('Erro ao obter o cardápio de pizzas:', error);
      });
  }, []);

  return (
    <div>
      <h2>Cardápio de Pizzas</h2>
      <ul>
        {pizzas.map((pizza) => (
          <li key={pizza.id}>
            <h3>{pizza.nome}</h3>
            <p>Ingredientes: {pizza.ingredientes}</p>
            <p>Valor: R$ {pizza.valor.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CardapioPizzas;
