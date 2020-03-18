import React from 'react';
import {incrementCounter, decrementCounter, ajoutPanier} from '../../actions/produitActions';
import { useSelector, useDispatch } from 'react-redux';
import '../../style/counter.css'


export default function Counter({product, loader}) {

  const dispatch = useDispatch()
  const counter = useSelector(state => state.produit.counter)

  return (
    <>
      <div style={{display: "flex", flexDirection: "column", justifyContent : "center", alignItems: "center"}}>
        <h3 style={{marginBottom : "12px"}}>ADD TO BAG</h3>
        <div id="counterContainer">
          <button id="buttonCounter" onClick={() => {dispatch({type : "DELETE_PRODUCT_TYPE", payload: product.type})}}>-</button>
          <span>{counter}</span>
          <button id="buttonCounter" onClick={() => incrementCounter(dispatch, product)}>+</button>
        </div>
        {/* <button id="buttonCounter" style={{marginTop : "12px"}} onClick={() => ajoutPanier(dispatch)}>Ajouter au panier</button> */}
      </div> 
    </>
  )
}
