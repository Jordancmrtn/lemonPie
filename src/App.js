import React from 'react';
import './app.css';
import LemonPie from './components/LemonPie';
import Counter from './components/Counter'
import Article from './components/Article'
import Panier from './components/Panier';
import Product from './components/product/Product'
import PanierPage from './components/product/PanierPage'

import { Switch, Route } from 'react-router-dom';

function App() {

  const article = {
    type : "lemonPie",
    title : "Lemon Pie",
    desc : "Lemon meringue pie is a type of baked pie, usually served for dessert, made with a crust usually made of shortcrust pastry, lemon custard filling and a fluffy meringue topping",
    ingredients : "1 cup white sugar, 2 tablespoons all-purpose flour, 3 tablespoons cornstarch, ¼ teaspoon salt, 1 ½ cups water, 2 lemons, juiced and zested, 2 tablespoons butter, 4 egg yolks, beaten, 1 (9 inch) pie crust, baked, 4 egg whites, 6 tablespoons white sugar"
  }

  return (
    <div id="app">
    <Switch>
      <Route exact path="/" render={(props) => <Product {...props} article={article} />}/>
      <Route exact path="/panier" component={PanierPage} />
    </Switch>
    </div>
  );
}

export default App;
