import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import "../layout/Pedido.css"; // Importar o arquivo CSS diretamente

function PaginaDePedidos() {
  const location = useLocation();
  const pizzasSelecionadas = location.state ? location.state.pizzasSelecionadas : [];
  
  const [itensPedido, setItensPedido] = useState([]);
  const [nomeCliente, setNomeCliente] = useState('');
  const [telefoneCliente, setTelefoneCliente] = useState('');
  const [enderecoCliente, setEnderecoCliente] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Atualiza os itens do pedido ao montar o componente
  useEffect(() => {
    if (pizzasSelecionadas.length > 0) {
      const novosItensPedido = pizzasSelecionadas.map((pizza) => ({
        id: pizza.id,
        pizza: pizza.nome,
        quantidade: 1,
        valor: pizza.valor
      }));
      setItensPedido(novosItensPedido);
    }
  }, [pizzasSelecionadas]);

  // Adiciona uma pizza ao pedido
  const handleSelectPizza = (pizza) => {
    const item = {
      id: pizza.id,
      pizza: pizza.nome,
      quantidade: 1,
      valor: pizza.valor
    };
    setItensPedido(prevItens => [...prevItens, item]);
  };

  // Remove um item do pedido
  const handleRemoveItem = (item) => {
    setItensPedido(prevItens => prevItens.filter(i => i.id !== item.id));
  };

  // Envia o pedido para o servidor
  const handleEnviarPedido = (e) => {
    e.preventDefault();
    setLoading(true);
    const pedido = {
      cliente: {
        nome: nomeCliente,
        telefone: telefoneCliente,
        endereco: enderecoCliente
      },
      itens: itensPedido
    };
    axios.post('http://localhost:5229/pedidos', pedido)
      .then((response) => {
        setLoading(false);
        alert('Pedido enviado com sucesso!');
        limparPedido();
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  // Limpa o pedido após ser enviado
  const limparPedido = () => {
    setItensPedido([]);
    setNomeCliente('');
    setTelefoneCliente('');
    setEnderecoCliente('');
  };

  return (
    <div className="principal">
      <h2>Faça seu Pedido!</h2>
      <form onSubmit={handleEnviarPedido}>
        <label>
          Nome:
          <input type="text" value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} required />
        </label>
        <br />
        <label>
          Telefone:
          <input type="text" value={telefoneCliente} onChange={(e) => setTelefoneCliente(e.target.value)} required />
        </label>
        <br />
        <label>
          Endereço:
          <input type="text" value={enderecoCliente} onChange={(e) => setEnderecoCliente(e.target.value)} required />
        </label>
        <br />
        <h3>Itens do pedido:</h3>
        <ul>
          {itensPedido.map((item) => (
            <li key={item.id}>
              <span>{item.pizza} - R$ {item.valor.toFixed(2)} x {item.quantidade}</span>
              <button type="button" onClick={() => handleRemoveItem(item)}>Remover</button>
            </li>
          ))}
        </ul>
        <button type="submit">Enviar Pedido</button>
      </form>
      {loading && <p>Enviando pedido...</p>}
      {error && <p>Erro: {error}</p>}
    </div>
  );
}

export default PaginaDePedidos;
