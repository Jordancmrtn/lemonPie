import React, { useEffect } from 'react'
import { getAllProducts } from '../actions/produitActions'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router-dom'

import Loader from '../components/partials/Loader'
import Panier from '../components/partials/Panier'

import '../style/pages/pageAccueil.scss'
import Header from './partials/Header';


export default function PageAccueil({history}) {
  const dispatch = useDispatch()
  const Allproducts = useSelector(state => state.produit.allArticles)
  const loader = useSelector(state => state.produit.isloading)

  useEffect(() => {
    getAllProducts(dispatch)
    console.log(Allproducts)
  }, [])

  return (
    <>
    {loader ? 
    <Loader />
    :
    <>
      <Header />
      <div className="squareBackground">
        <h1 id="bigTitle">Discover our world</h1>
        <p>Welcome to the market, discover our products</p>
        <div id="divAllProductsAccueil">
        {Allproducts.splice(0, 2).map((product) => 
          <div className="productCard" id="productCardAccueil" key={product.type} onClick={() => history.push(`/product/${product.title}`)}>
            <img src={product.img} style={{heigh: "auto", width: "134px"}}/>
            <h2>{product.title}</h2>
            <span>{product.price}</span>
          </div>
          )}
        <NavLink to="/products" className="productCard" id="productCardAccueil">
          <FontAwesomeIcon icon={faPlusCircle} color="white" size="1x"/>
          <p>Plus de produits</p>
        </NavLink>
        </div>
      </div>
      </>
      }
    </>
  )
}
