import React from 'react'
import { useSelector } from 'react-redux';
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from 'react-redux';



export default function Panier({article}) {
  const panier = useSelector(state => state.produit.panier)
  const dispatch = useDispatch()

  return (
    <div>
      <h2 style={{margin : "24px 0 0 0"}}>Mon panier</h2>
      {panier.length}
      <FontAwesomeIcon icon={faShoppingBag} />
      <button id="buttonCounter" style={{marginTop : "12px"}} onClick={() => {dispatch({type : "VOIR_PANIER"})}}>Voir mon panier</button>
    </div>
  )
}
