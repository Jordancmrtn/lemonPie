import React from 'react'
import { useSelector } from 'react-redux'
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import '../../style/header.scss'
import { NavLink } from 'react-router-dom'

export default function Header() {
  const panier = useSelector(state => state.produit.panier)


  return (
    <div id="headerDiv">
      <h1>My Market</h1>
      <div id="headerLinks">
        <NavLink to="/"> ACCUEIL</NavLink>
        <NavLink to="/products"> ALL PRODUCTS</NavLink>
        <NavLink to="/panier">
          <p>{panier.length} articles</p>
          <FontAwesomeIcon icon={faShoppingBag} />
        </NavLink>
      </div>
    </div>
  )
}
