import React from 'react';
import './App.css';
import LemonPie from './components/LemonPie';
import Counter from './components/Counter'
import Article from './components/Article'
import Panier from './components/Panier';

const article = {
  type : "lemonPie",
  title : "Lemon Pie",
  desc : "Lemon meringue pie is a type of baked pie, usually served for dessert, made with a crust usually made of shortcrust pastry, lemon custard filling and a fluffy meringue topping",
  ingredients : "1 cup white sugar, 2 tablespoons all-purpose flour, 3 tablespoons cornstarch, ¼ teaspoon salt, 1 ½ cups water, 2 lemons, juiced and zested, 2 tablespoons butter, 4 egg yolks, beaten, 1 (9 inch) pie crust, baked, 4 egg whites, 6 tablespoons white sugar"
}

function App() {
  return (
    <div className="App">
      <div className="squareBackground">
        <div id="articleCounter">
          <Article article={article}/>
          <Counter article={article}/>
          <Panier article={article}/>
        </div>
        <LemonPie/>
      </div>
    </div>
  );
}

export default App;
