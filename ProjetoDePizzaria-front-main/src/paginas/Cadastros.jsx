import React, { useState, useEffect } from "react";
import axios from "axios";
import "../layout/Cadastro.css";

function Cadastros() {
  const [cliente, setCliente] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getClientes();
  }, []);

  function getClientes() {
    axios.get("http://localhost:5229/clientes")
      .then((resposta) => {
        setClientes(resposta.data);
      })
      .catch((error) => {
        setError("Erro ao carregar clientes: " + error.message);
      });
  }

  function novoCliente() {
    setCliente({
      nome: "",
      cpf: "",
      telefone: "",
      email: "",
    });
  }

  function cancelar() {
    setCliente(null);
  }

  function salvarCliente() {
    setLoading(true);
    const endpoint = cliente.id
      ? `http://localhost:5229/clientes/${cliente.id}`
      : "http://localhost:5229/clientes";

    const method = cliente.id ? "put" : "post";

    axios[method](endpoint, cliente)
      .then(() => {
        setLoading(false);
        refresh();
        setCliente(null);
      })
      .catch((error) => {
        setError("Erro ao salvar cliente: " + error.message);
        setLoading(false);
      });
  }

  function excluirCliente(id) {
    axios.delete(`http://localhost:5229/clientes/${id}`)
      .then(() => {
        getClientes();
      })
      .catch((error) => {
        setError("Erro ao excluir cliente: " + error.message);
      });
  }

  function editarCliente(cliente) {
    setCliente(cliente);
  }

  function refresh() {
    getClientes();
  }

  function onChangeCliente(campo, valor) {
    setCliente({
      ...cliente,
      [campo]: valor,
    });
  }

  function getFormulario() {
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={cliente.nome}
          onChange={(e) => onChangeCliente("nome", e.target.value)}
          required
        />

        <label htmlFor="cpf">CPF:</label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          value={cliente.cpf}
          onChange={(e) => onChangeCliente("cpf", e.target.value)}
          required
        />

        <label htmlFor="telefone">Telefone:</label>
        <input
          type="text"
          id="telefone"
          name="telefone"
          value={cliente.telefone}
          onChange={(e) => onChangeCliente("telefone", e.target.value)}
          required
        />

        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={cliente.email}
          onChange={(e) => onChangeCliente("email", e.target.value)}
          required
        />

        <button type="button" onClick={salvarCliente} disabled={loading}>
          {cliente.id ? "Atualizar" : "Salvar"}
        </button>
        <button type="button" onClick={cancelar}>Cancelar</button>
      </form>
    );
  }

  function getLinhasDaTabela() {
    return clientes.map((cliente, index) => (
      <tr key={cliente.id}>
        <td>{cliente.id}</td>
        <td>{cliente.nome}</td>
        <td>{cliente.cpf}</td>
        <td>{cliente.telefone}</td>
        <td>{cliente.email}</td>
        <td>
          <button onClick={() => excluirCliente(cliente.id)}>Excluir</button>
          <button onClick={() => editarCliente(cliente)}>Editar</button>
        </td>
      </tr>
    ));
  }

  return (
    <div className="content">
      <div className="principal">
        <h3>Realize seu Cadastro</h3>
        {cliente === null ? (
          <>
            <button onClick={novoCliente}>Cadastre-se</button>
            {clientes.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Telefone</th>
                    <th>E-mail</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>{getLinhasDaTabela()}</tbody>
              </table>
            ) : (
              <p>Nenhum cliente cadastrado.</p>
            )}
          </>
        ) : (
          getFormulario()
        )}

        {loading && <p>Salvando cliente...</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default Cadastros;
