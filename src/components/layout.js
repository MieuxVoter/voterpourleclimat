import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import { UserProvider } from '../services/User';


const Layout = ({ children }) => (
  <BrowserRouter>
    <UserProvider>
      <Navigation />
      <hr />
      {children}
      <Footer />
    </UserProvider>
  </BrowserRouter>
);

export default Layout;
