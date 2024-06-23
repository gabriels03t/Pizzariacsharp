import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../layout/Cardapio.css"; // Importar o arquivo CSS diretamente

const pizzas = [
  {
    id: 1,
    nome: "Calabresa",
    imagem: "/imagens/calabresa.jpg", // Caminho relativo a public
    descricao: "Pizza calabresa feita com linguiça calabresa, cebola, pimenta e queijo mussarela.",
    valor: 29.99,
    classe: "calabresa"
  },
  {
    id: 2,
    nome: "Quatro Queijos",
    imagem: "/imagens/queijo.jpg",
    descricao: "Pizza quatro queijos feita com queijo mussarela, queijo parmesão, queijo gorgonzola e queijo ricota.",
    valor: 34.99,
    classe: "quatro-queijos"
  },
  {
    id: 3,
    nome: "Frango com Catupiry",
    imagem: "/imagens/frango.jpg",
    descricao: "Pizza frango com catupiry feita com frango desfiado, catupiry, queijo mussarela e ervilha.",
    valor: 31.99,
    classe: "frango-catupiry"
  },
  //...
];

function CardapioPizzas() {
  const [pizzasSelecionadas, setPizzasSelecionadas] = useState([]);

  const toggleSelecaoPizza = (pizza) => {
    // Verifica se a pizza já está selecionada
    const pizzaIndex = pizzasSelecionadas.findIndex((p) => p.id === pizza.id);

    if (pizzaIndex === -1) {
      // Se não estiver selecionada, adiciona à lista de selecionadas
      setPizzasSelecionadas([...pizzasSelecionadas, pizza]);
    } else {
      // Se estiver selecionada, remove da lista de selecionadas
      const novasPizzasSelecionadas = pizzasSelecionadas.filter((p) => p.id !== pizza.id);
      setPizzasSelecionadas(novasPizzasSelecionadas);
    }
  };

  return (
    <div className="cardapio">
      <h2>Cardápio de Pizzas</h2>
      <ul>
        {pizzas.map((pizza) => (
          <li key={pizza.id} className={pizza.classe}>
            <img src={pizza.imagem} alt={pizza.nome} />
            <h3>{pizza.nome}</h3>
            <p>{pizza.descricao}</p>
            <p>Preço: R$ {pizza.valor.toFixed(2)}</p>
            <button className={pizzasSelecionadas.some((p) => p.id === pizza.id) ? "selecionada" : ""} onClick={() => toggleSelecaoPizza(pizza)}>
              {pizzasSelecionadas.some((p) => p.id === pizza.id) ? "Selecionada" : "Selecionar"}
            </button>
          </li>
        ))}
      </ul>
      <Link to={{ pathname: "/paginadepedidos", state: { pizzasSelecionadas } }} className="btn">Ir para Pedidos</Link>
    </div>
  );
}

export default CardapioPizzas;
