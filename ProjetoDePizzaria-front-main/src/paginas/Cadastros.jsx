import React, { useState } from 'react';
import axios from 'axios';

function CadastroCliente() {
  const [cliente, setCliente] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5229/clientes', cliente)
      .then(() => {
        alert('Cliente cadastrado com sucesso!');
        setCliente({
          nome: '',
          cpf: '',
          telefone: '',
          email: ''
        });
      })
      .catch(error => {
        console.error('Erro ao cadastrar cliente:', error);
        alert('Erro ao cadastrar cliente. Verifique os dados e tente novamente.');
      });
  };

  return (
    <div>
      <h2>Cadastro de Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={cliente.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={cliente.cpf}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="text"
            id="telefone"
            name="telefone"
            value={cliente.telefone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={cliente.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroCliente;
