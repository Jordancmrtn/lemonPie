import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../../actions/produitActions'
import { useDispatch, useSelector } from 'react-redux'
import '../../style/pageAccueil.css'
import Loader from '../../components/partials/Loader'
import { NavLink } from 'react-router-dom'
import Select from 'react-select'
import _ from 'lodash';
import '../../style/products.css'


export default function PageAccueil() {
  const dispatch = useDispatch()
  const [orderDir, setOrderDir] = useState('desc')
  const [identity, setIdentity] = useState('title')
  const Allproducts = useSelector(state => state.produit.allArticles)
  const loader = useSelector(state => state.produit.isloading)

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  // console.log(_.orderBy(allproducts, ['price'], ['asc']))
  // console.log(_.orderBy(allproducts, ['type'], ['desc']))

  useEffect(() => {
    getAllProducts(dispatch)
  }, [])

  const sortEvent = (e, type, identity) => {
    if (type === 'asc' && identity === 'price'){
      setOrderDir('asc');
      setIdentity('price')
    } else if (type === 'desc' && identity === 'price'){
      setOrderDir('desc');
      setIdentity('price')
    } else{
      setOrderDir('start');
      setIdentity('title')
    }
  }

  let filteredEvents = _.orderBy(Allproducts, identity, orderDir)

  return (
    <>
    {loader ? 
    <Loader />
    :
      <div className="squareBackground" id="squareBackgroundAllProduct">
        <h1 id="bigTitle">All PRODUCTS</h1>
        {/* <Select options={options} styl={{width: "30%"}}/> */}
        <div id="containerProducts">
          {filteredEvents.map((product) =>
            <NavLink className="productCard" key={product.title} to={`/product/${product.title}`}>
              <img src={product.img} style={{heigh: "auto", width: "134px"}}/>
              <h2>{product.title}</h2>
              <span>{product.price}</span>
            </NavLink>
            )}
        </div>
        <div className="buttonsDiv">
          <button onClick={(e) => sortEvent(e, 'asc', 'price')}>Du - cher au + cher</button>
          <button onClick={(e) => sortEvent(e, 'desc', 'price')}>Du + cher au - cher</button>
          <button onClick={(e) => sortEvent(e, 'start', 'title')}>A à Z</button>
        </div>
      </div>
      }
    </>
  )
}
