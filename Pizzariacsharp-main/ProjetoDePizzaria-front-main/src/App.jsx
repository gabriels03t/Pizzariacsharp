// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./paginas/Home";
import Cadastros from "./paginas/Cadastros";
import CardapioPizzas from "./paginas/CardapioDePizzas";
import Pedidos from "./paginas/PaginaDePedidos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/cadastros" element={<Layout><Cadastros /></Layout>} />
      <Route path="/cardapiodepizzas" element={<Layout><CardapioPizzas /></Layout>} />
      <Route path="/paginadepedidos" element={<Layout><Pedidos /></Layout>} />
    </Routes>
  );
}

export default App;
