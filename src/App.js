import React from 'react';
import './style/app.css';
import Product from './components/product/Product'
import PanierPage from './components/product/PanierPage'
import PageAccueil from './components/PageAccueil'

import { Switch, Route } from 'react-router-dom';

function App() {

  return (
    <div id="app">
    <Switch>
      <Route exact path="/" component={PageAccueil} />
      <Route exact path="/product/:id" component={Product}/>
      <Route exact path="/panier" component={PanierPage} />
    </Switch>
    </div>
  );
}

export default App;
