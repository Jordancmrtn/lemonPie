import React from 'react';
import '../style/article.css'

export default function article({product}) {
  
  return (
    <div id="infosContainer">
        <h1 id="bigTitle">{product.title}</h1>
        <b>DESCRIPTION</b>
        <br />
        {product.desc}
    </div>
  )
}
