import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../../actions/produitActions'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import Loader from '../partials/Loader'

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from 'react-select'
import _ from 'lodash';

import '../../style/pages/pageAccueil.scss'
import '../../style/pages/allProductsPage.scss'
import Header from '../partials/Header'


export default function PageAccueil() {
  const dispatch = useDispatch()
  const [ products, setProducts ] = useState([])
  const [ selectedOption, setSelectedOption ] = useState()
  const Allproducts = useSelector(state => state.produit.allArticles)
  const loader = useSelector(state => state.produit.isloading)
  const [ ingredients, setIngredients ] = useState({eggs : false, flour : false, lemon : false, vanilla : false})
  const options = [
    { value: 'pie', label: 'Pies' },
    { value: 'cupecake', label: 'Cupecakes' },
    { value: 'cookie', label: 'Cookies'}
  ]

  //Récupère tous les articles
  useEffect(() => {
    getAllProducts(dispatch)
  }, [])

  //set Tous les articles à l'objet Products
  useEffect(()=>{
      if(!Allproducts) return;
      setProducts(Allproducts)
  },[Allproducts])

  //Tri les articles en fonction du react Select et de la valeur récupéré dans selectedOption
  useEffect(()=>{
    if(!selectedOption) return;
    let productsFiltered = Allproducts.filter((product) => product.type === selectedOption.value)
    setProducts(productsFiltered)
  },[selectedOption])

  //Créer un tableau avec les ingrédients selectionnés (ceux qui sont à true) puis filtre et compare les deux tableaux (ingredientSelected et product.ingredients provenant de Allproducts).
  useEffect(() => {
    let ingredientSelected = []
    for (const property in ingredients) {
      if (ingredients[property] === true) {
        ingredientSelected.push(`${property}`)
      }
    }
    let productsFilteredByIngredients = Allproducts.filter((product) => _.differenceBy(ingredientSelected, product.ingredients).length === 0)
    setProducts(productsFilteredByIngredients)
  }, [ingredients])

  //créer une copie du tableau des articles de base puis les "orderBy" suivant les paramètres qu'on lui passe.
  const sortEvent = (e, type, identity) => {
    let products = _.cloneDeep(Allproducts)
    let sortedProducts = _.orderBy(products, identity, type)
    setProducts(sortedProducts)
  }

  //change la value de la seclection du react Select et le set dans selectedOption
  const handleOnChange = (selectedOption) => {
    setSelectedOption(selectedOption)
  }

  //Check l'ingredient dans l'obj à true quand la checkbox est checker.
  const handleChecked = (ingredient,value) => {
    let obj = _.cloneDeep(ingredients); //Je fais une copie de l'obj ingrédients (qui contient tout les ingrédients avec leur state)
    obj[ingredient] = value // OU _.set(obj,type,val) /// Je set la value de l'ingrédient en question par la valeur de event.target.checked(true ou false de la checkbox)
    setIngredients(obj) //Je set l'objet ingrédient par le nouvel obj avec la nouvelle valeur de l'ingrédient voulu
  }



  return (
    <>
    {loader ? 
      <Loader />
    :
      <>
      <Header/>
      <div className="squareBackground">
        <h1 id="bigTitle">ALL PRODUCTS</h1>
        <Select options={options} 
                value={selectedOption}
                onChange={handleOnChange}
                className="selectBar"
                placeholder="Trier par type..."
        />
        <div className="buttonsDiv"> 
          <p>Trier par ingrédients qu'ils contiennent</p>     
          <FormControlLabel
          control={
            <Checkbox
              checked={ingredients["eggs"]}
              onChange={(e)=>handleChecked("eggs", e.target.checked)}
              name="checkedEggs"
            />
          }
          label="Eggs"
          />
          <FormControlLabel
          control={
            <Checkbox
              checked={ingredients["flour"]}
              onChange={(e)=>handleChecked("flour",e.target.checked)}
              name="checkedFlour"
            />
          }
          label="Flour"
          />
          <FormControlLabel
          control={
            <Checkbox
              checked={ingredients["vanilla"]}
              onChange={(e)=>handleChecked("vanilla",e.target.checked)}
              name="checkedVanilla"
            />
          }
          label="Vanilla"
          />
        </div>
   
        <div className="buttonsDiv">      
          <button id="buttonPanier" onClick={(e) => sortEvent(e, 'asc', 'price')}>Du - cher au + cher</button>
          <button id="buttonPanier" onClick={(e) => sortEvent(e, 'desc', 'price')}>Du + cher au - cher</button>
          <button id="buttonPanier" onClick={(e) => sortEvent(e, 'start', 'title')}>A à Z</button>
        </div>
        <div id="containerProducts">
         {products === undefined ?
            <Loader /> 
            : 
            <>{products.map((product) =>
              <NavLink className="productCard" key={product.title} to={`/product/${product.title}`}>
                <img src={product.img} style={{heigh: "auto", width: "134px"}}/>
                <h2>{product.title}</h2>
                <span>{product.price}</span>
              </NavLink>
              )}
            </>
          }
        </div>
      </div>
      </>
      }
    </>
  )
}
