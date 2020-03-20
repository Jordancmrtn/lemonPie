import React, { useEffect } from 'react'
import Article from '../Article'
import Counter from '../partials/Counter'
import Panier from '../partials/Panier'
import LemonPie from '../LemonPie'
import Loader from '../partials/Loader'
import {useSpring, animated} from 'react-spring'
import { getProductsId } from '../../actions/produitActions.js';
import { useDispatch, useSelector } from 'react-redux'


export default function Product({match}) {
  const dispatch = useDispatch()
  const product = useSelector(state => state.produit.selectedProduct)
  const loader = useSelector(state => state.produit.isloading)

  useEffect(() => {
    getProductsId(dispatch, match.params.id)
  }, [])

  const styleSpring = useSpring({opacity: 1, from: {opacity: 0}})
  
  return (
    <>
      {loader ?
      <Loader />
      : 
      <animated.div style={styleSpring} className="squareBackground">
        <div id="articleCounter">
          <Article product={product} loader={loader}/>
          <Counter product={product} loader={loader}/>
          <Panier />
        </div>
        <LemonPie/>
      </animated.div >
      }
    </>
  )
}
