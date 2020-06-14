import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from '../pages/landing'
import SeNourrir from '../pages/se-nourrir'
import SeDeplacer from '../pages/se-deplacer'
import SeLoger from '../pages/se-loger'
import Consommer from '../pages/consommer'
import Produire from '../pages/produire'
import { UserProvider } from '../services/User';


function App() {
  return (
    <BrowserRouter>
     <>
      <Route exact path="/" component={ Landing } />

      <UserProvider>
         <Route path="/se-nourrir" component={ SeNourrir } />
         <Route path="/se-deplacer" component={ SeDeplacer } />
         <Route path="/se-loger" component={ SeLoger } />
         <Route path="/consommer" component={ Consommer } />
         <Route path="/produire" component={ Produire } />
      </UserProvider>
    </>
    </BrowserRouter>
  );
}

export default App;
