import React from 'react';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer'; // Seu Footer
import './Layout.css'; // Seu arquivo de estilos CSS

function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <Nav />
      <main className="content">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
