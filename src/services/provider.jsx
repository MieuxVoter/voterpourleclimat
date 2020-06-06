/*
 * Define Providers for the application.
 */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig } from './firebase';

const AppProvider = (props) => (
  <BrowserRouter>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      { props.children }
    </FirebaseAppProvider>
  </BrowserRouter>
);

export default AppProvider;
