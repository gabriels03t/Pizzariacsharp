import React from 'react';
import { Link } from 'react-router-dom';
import '../layout/Home.css'; // Importa o arquivo CSS para aplicar os estilos

function Home() {
  const backgroundStyle = {
    backgroundImage: `url('/imagens/fundo1.jpg')`, // Caminho relativo a public
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed', // Mantém a imagem fixa enquanto o conteúdo rola
    color: 'white',
    minHeight: '100vh',
    textAlign: 'center',
    padding: '20px',
  };

  return (
    <div className="home" style={backgroundStyle}>
      <header className="home-header">
        <h1>Bem-vindo à Pizzaria Positivo</h1>
        <p>Oferecemos as melhores pizzas da região. Veja nosso cardápio e faça seu pedido!</p>
      </header>
      <section className="home-section">
        <Link to="/cardapiodepizzas">
          <button className="home-button">Ver Cardápio</button>
        </Link>
      </section>
    </div>
  );
}

export default Home;
