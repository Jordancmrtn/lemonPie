import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {useSpring, animated} from 'react-spring'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faFrownOpen } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../style/panierPage.css'

export default function PanierPage() {
  const panier = useSelector(state => state.produit.panier)
  const dispatch = useDispatch()
  const styleSpring = useSpring({opacity: 1, from: {opacity: 0}})


  return (
    <animated.div style={styleSpring} className="squareBackground">
      <div className="divPanier">
        <h1 id="bigTitle">Mon Panier</h1>
        
          {panier.length <= 0 ? 
          <>
          <FontAwesomeIcon icon={faFrownOpen} id="inconPanierVide" color="#ffb534" size="7x"/>
          <p>Panier vide</p>
          </> 
          :
          <>
          <div className="panierList">
            {panier.map((item) =>
            <div className="panierItem" key={item.id}>
              <p>{item.title}</p>
              <FontAwesomeIcon icon={faTrash} onClick={() => {dispatch({type : "DELETE_PRODUCT_ID", payload : item.id})}}/>
            </div> 
          )}
          </div>
          </>
          }

        <Link to="/product/lemonPie">LemonPie</Link>
        <Link to="/product/pecanPie">Pecan Pie</Link>
      </div>
    </animated.div>
  )
}
