/* Layout.jsx */
import React from 'react';
import Header from './Header';
import Nav from './Nav';
import Aside from './Aside';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div style={layoutStyle}>
      <Header />
      <div style={contentStyle}>
        <Nav />
        <Aside />
        <main style={mainStyle}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

const layoutStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const contentStyle = {
  display: 'flex',
};

const mainStyle = {
  flex: '1',
  padding: '20px',
};

export default Layout;
