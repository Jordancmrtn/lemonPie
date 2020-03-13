import React from 'react'
import Article from '../Article'
import Counter from '../Counter'
import Panier from '../Panier'
import LemonPie from '../LemonPie'
import { Link } from 'react-router-dom';


export default function Product({article}) {
  
  return (
    <div className="squareBackground">
      <div id="articleCounter">
        <Article article={article}/>
        <Counter article={article}/>
        <Panier article={article}/>
      </div>
      <LemonPie/>
      <Link to="/panier">PANIER</Link>
    </div>
  )
}
