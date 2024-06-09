import React from 'react';

function Home() {
  return (
    <div>
      <h1>Bem-vindo à Pizzaria Positivo</h1>
      <p>Oferecemos as melhores pizzas da região. Veja nosso cardápio e faça seu pedido!</p>
      <div>
        <h2>Cardápio</h2>
        <ul>
          <li>
            <h3>Pizza Margherita</h3>
            <p>Molho de tomate, muçarela, manjericão fresco</p>
          </li>
          <li>
            <h3>Pizza Pepperoni</h3>
            <p>Molho de tomate, muçarela, pepperoni</p>
          </li>
          <li>
            <h3>Pizza Calabresa</h3>
            <p>Molho de tomate, muçarela, calabresa, cebola, pimentão</p>
          </li>
          {/* Adicione mais itens de menu conforme necessário */}
        </ul>
      </div>
    </div>
  );
}

export default Home;
