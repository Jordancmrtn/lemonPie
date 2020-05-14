import React, { useEffect } from 'react'
import Article from '../partials/Article'
import Counter from '../partials/Counter'
import Panier from '../partials/Panier'
import LemonPie3D from '../LemonPie3D'
import Loader from '../partials/Loader'
import _ from 'lodash';
import {useSpring, animated} from 'react-spring'
import { getProductsId } from '../../actions/produitActions.js';
import { useDispatch, useSelector } from 'react-redux'
import Header from '../partials/Header'
import '../../style/productPage.scss'


export default function Product({match}) {
  const dispatch = useDispatch()
  const product = useSelector(state => state.produit.selectedProduct)
  const count = useSelector(state => state.produit.counter)
  const loader = useSelector(state => state.produit.isloading)

  useEffect(() => {
    getProductsId(dispatch, match.params.id)
  }, [])

  const styleSpring = useSpring({opacity: 1, from: {opacity: 0}})
  // const id = Date.now()

  let arrProducts = new Array(count).fill(null,0,count).map((d,i)=>{
    const id = Date.now()+"-"+i
    let newProduct = _.cloneDeep(product)
    newProduct.id = id
    console.log(newProduct)
    return newProduct
  })
  
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
            <Counter product={product} loader={loader} arrProducts={arrProducts}/>
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
