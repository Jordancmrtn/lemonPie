import React from 'react';
import '../style/article.css'

export default function article({article}) {
  
  return (
    <div id="infosContainer">
        <h1 id="titleLemonPie">{article.title}</h1>
        <b>DESCRIPTION</b>
        <br />
        {article.desc}
    </div>
  )
}
