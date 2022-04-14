import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Layout = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
