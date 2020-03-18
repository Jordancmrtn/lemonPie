import _ from 'lodash';

const articles = [{
  type : "lemonPie",
  title : "Lemon Pie",
  desc : "Lemon meringue pie is a type of baked pie, usually served for dessert, made with a crust usually made of shortcrust pastry, lemon custard filling and a fluffy meringue topping",
  ingredients : "1 cup white sugar, 2 tablespoons all-purpose flour, 3 tablespoons cornstarch, ¼ teaspoon salt, 1 ½ cups water, 2 lemons, juiced and zested, 2 tablespoons butter, 4 egg yolks, beaten, 1 (9 inch) pie crust, baked, 4 egg whites, 6 tablespoons white sugar"
},{
  type : "pecanPie",
  title : "Pecan Pie",
  desc : "bla bla bla",
  ingredients : "bla bla bla bla"
}
]
let initialstate = { isloading : false, counter : 0, panier:[{type: "cupcake", title: "Cupecake", id: 1584106464745}], selectedProduct: {}, articles: articles}

const produitReducer = (state=initialstate, action) =>{
  switch(action.type){
    case 'LOADING' : 
      return { ...state, isloading : true}
    case 'INCREMENT' :
      return { ...state, counter: state.counter + 1,  panier :[...state.panier, action.payload]}
    case 'DECREMENT' :
      if (state.counter <= 0){
        return { ...state, counter: 0}
      } else {
      return { ...state, counter: state.counter -1}
      }
    case 'LOADING_END' : 
      return { ...state, isloading : false }
    case 'DELETE_PRODUCT_TYPE' : 
      let updateArr = removeByType(state.panier,action.payload)

      function removeByType(array,typeSup){
        let newArray = _.cloneDeep([...array])
        let arrTypes = newArray.map((d)=>d.type)
        let findIndex = arrTypes.indexOf(typeSup)
          if(findIndex === -1){
            return newArray
          } else {
            newArray.splice(findIndex,1)
            return newArray
          }
      }
      if (state.counter <= 0){
        return { ...state, counter: 0, panier : updateArr}
      } else {
      return { ...state, counter: state.counter -1, panier : updateArr}
      }
    case 'DELETE_PRODUCT_ID' :
      let newArray = _.cloneDeep(state.panier)
      newArray = newArray.filter(product => product.id !== action.payload)
      return { ...state, panier : newArray }
    case 'GET_PRODUCT_ID' : 
      const selectedProduct = action.payload.products.find((d)=>d.type === action.payload.id)
      console.log(selectedProduct)
      return { ...state, isloading : false, selectedProduct: selectedProduct}
    case 'ERROR' : 
      return { ...state, isloading : false }
    default:
      return state;
  }
}
export default produitReducer;
