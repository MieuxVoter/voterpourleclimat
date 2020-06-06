import React from 'react';
import { Route } from 'react-router-dom';
import AppProvider from './services/provider';
import Home from './pages/Home';
import Vote from './pages/Vote';
import Share from './pages/Share';
import Footer from './components/Footer';


function App() {
  return (
    <AppProvider>
      <Route exact path="/" component={Home} />
      <Route path="/vote" component={Vote} />
      <Route path="/share" component={Share} />
      <Footer />
    </AppProvider>
  );
}

export default App;
