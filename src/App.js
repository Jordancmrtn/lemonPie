import React from 'react';
import './style/app.scss';
import ProductPage from './components/page/ProductPage'
import AllProductsPage from './components/page/AllProductsPage'
import PanierPage from './components/page/PanierPage'
import PageAccueil from './components/PageAccueil'
import { Switch, Route } from 'react-router-dom';

function App() {

  return (
    <div id="app">
    <Switch>
      <Route exact path="/" component={PageAccueil} />
      <Route exact path="/products" component={AllProductsPage} />
      <Route exact path="/product/:id" component={ProductPage}/>
      <Route exact path="/panier" component={PanierPage} />
    </Switch>
    </div>
  );
}

export default App;
