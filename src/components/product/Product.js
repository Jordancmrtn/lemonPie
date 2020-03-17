import React from 'react'
import Article from '../Article'
import Counter from '../Counter'
import Panier from '../Panier'
import LemonPie from '../LemonPie'
import {useSpring, animated} from 'react-spring'


export default function Product({article}) {

  const styleSpring = useSpring({opacity: 1, from: {opacity: 0}})
  
  return (
    <animated.div style={styleSpring} className="squareBackground">
      <div id="articleCounter">
        <Article article={article}/>
        <Counter article={article}/>
        <Panier />
      </div>
      <LemonPie/>
    </animated.div >
  )
}
