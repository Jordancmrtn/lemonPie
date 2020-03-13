import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../style/panierPage.css'

export default function PanierPage() {
  const panier = useSelector(state => state.produit.panier)
  const dispatch = useDispatch()

  console.log(panier)

  return (
    <div className="squareBackground">
      <h1 id="bigTitle">Mon Panier</h1>
      <div className="panierList">
        {panier.map((item) =>
        <div className="panierItem">
          <p>{item.type}</p>
          <FontAwesomeIcon icon={faTrash} />
        </div> 
        )}
      </div>
    <Link to="/">LemonPie</Link>
    </div>
  )
}
