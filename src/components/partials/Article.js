import React from 'react';
import '../../style/article.scss'

export default function article({product}) {
  
  return (
    <div id="infosContainer">
        <b>DESCRIPTION</b>
        <br />
        {product.desc}
    </div>
  )
}
