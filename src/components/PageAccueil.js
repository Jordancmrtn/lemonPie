import React, { useEffect } from 'react'
import { getAllProducts } from '../actions/produitActions'
import { useDispatch, useSelector } from 'react-redux'
import '../style/pageAccueil.css'
import Loader from '../components/partials/Loader'
import Panier from '../components/partials/Panier'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router-dom'

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
      <div className="squareBackground">
        <h1 id="bigTitle">My Market</h1>
        {Allproducts.splice(0, 2).map((product) => 
          <div className="productCard" id="productCardAccueil" key={product.type} onClick={() => history.push(`/product/${product.title}`)}>
            <img src={product.img} style={{heigh: "auto", width: "134px"}}/>
            <h2>{product.title}</h2>
            <span>{product.price}</span>
          </div>
          )}
        <NavLink to="/products" className="productCard" id="productCardAccueil">
          <FontAwesomeIcon icon={faPlusCircle} id="inconPanierVide" color="white" size="1x"/>
          <p>Plus de produits</p>
        </NavLink>
        <Panier />
      </div>
      }
    </>
  )
}
