import React, { useEffect } from 'react'
import Article from '../partials/Article'
import Counter from '../partials/Counter'
import Panier from '../partials/Panier'
import LemonPie3D from '../LemonPie3D'
import Loader from '../partials/Loader'
import {useSpring, animated} from 'react-spring'
import { getProductsId } from '../../actions/produitActions.js';
import { useDispatch, useSelector } from 'react-redux'
import Header from '../partials/Header'
import '../../style/productPage.scss'


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
      <>
      <Header />
      <animated.div style={styleSpring} className="squareBackground">
        <h1 id="articleTitle">{product.title}</h1>
        <div id="containerDivArticle">
          <div id="articleInfosDiv">
            <img src={product.img} />
            <Article product={product} loader={loader}/>
          </div>
          <div id="articleCounter">
            <Counter product={product} loader={loader}/>
            <Panier />
          </div>
        </div>
        {/* <LemonPie3D/> */}
      </animated.div >
      </>
      }
    </>
  )
}
