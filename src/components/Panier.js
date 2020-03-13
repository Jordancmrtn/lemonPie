import React from 'react'
import { useSelector } from 'react-redux';
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from 'react-redux';
import '../style/panier.css'



export default function Panier({article}) {
  const panier = useSelector(state => state.produit.panier)
  const dispatch = useDispatch()

  return (
    <div className="panier">
      <h2 style={{margin : "24px 0 0 0"}}>Mon panier</h2>
      <div className="panierIcon">
        {panier.length}
        <FontAwesomeIcon icon={faShoppingBag} />
      </div>
      <button id="buttonCounter" style={{marginTop : "12px"}} onClick={() => {dispatch({type : "VOIR_PANIER"})}}>Voir mon panier</button>
    </div>
  )
}
