import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../style/panier.scss'

export default function Panier() {
  const panier = useSelector(state => state.produit.panier)

  return (
    <div className="panier">
      <h2 style={{margin : "24px 0 0 0"}}>Mon panier</h2>
      {panier.length <= 0 ? 
      "Rien dans mon panier" 
      : 
      <div className="panierIcon">
        {panier.length}
        <FontAwesomeIcon icon={faShoppingBag} />
      </div>
      }
      <Link to="/panier" id="buttonPanier">Voir mon panier</Link>
    </div>
  )
}
