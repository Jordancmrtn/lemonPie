import React, { useEffect } from 'react'
import { getAllProducts } from '../actions/produitActions'
import { useDispatch, useSelector } from 'react-redux'
import '../style/pageAccueil.css'
import Loader from '../components/partials/Loader'
import Panier from '../components/partials/Panier'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";




export default function PageAccueil({history}) {
  const dispatch = useDispatch()
  const Allproducts = useSelector(state => state.produit.allArticles)
  const loader = useSelector(state => state.produit.isloading)



  useEffect(() => {
    getAllProducts(dispatch)
  }, [])

  return (
    <>
    {loader ? 
    <Loader />
    :
      <div className="squareBackground">
        <h1 id="bigTitle">My Market</h1>
        {Allproducts.map((product) => 
          <div className="productCard" key={product.type} onClick={() => history.push(`/product/${product.type}`)}>
            <img src={product.img} style={{heigh: "auto", width: "134px"}}/>
            <h2>{product.title}</h2>
            <span>{product.price}</span>
          </div>
          )}
        <div className="productCard">
          <FontAwesomeIcon icon={faPlusCircle} id="inconPanierVide" color="white" size="1x"/>
          <p>Plus de produits</p>
        </div>
        <Panier />
      </div>
      }
    </>
  )
}
