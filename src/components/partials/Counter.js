import React, { useEffect } from 'react';
import {addToBasket, incrementCounter, decrementCounter, ajoutPanier} from '../../actions/produitActions';
import { useSelector, useDispatch } from 'react-redux';
import '../../style/counter.scss'


export default function Counter({product, loader, arrProducts}) {
  const dispatch = useDispatch()
  const counter = useSelector(state => state.produit.counter)

  console.log(arrProducts)
  return (
    <>
      <div id="containerCounter">
        <h3>ADD TO BAG</h3>
        <div id="counterContainer">
          {/* <button id="buttonCounter" onClick={() => {dispatch({type : "DELETE_PRODUCT_TYPE", payload: product.title})}}>-</button> */}
          <button id="buttonCounter" onClick={() => {dispatch({type : "DECREMENT"})}}>-</button>
          <span>{counter}</span>
          <button id="buttonCounter" onClick={() => {dispatch({type : "INCREMENT"})}}>+</button>
        </div>
        <button id="buttonCounter" style={{marginTop : "12px"}} onClick={() => addToBasket(dispatch, arrProducts)}>Ajouter au panier</button>
      </div> 
    </>
  )
}
