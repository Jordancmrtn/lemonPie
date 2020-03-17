import _ from 'lodash';

let initialstate = { isloading : false, counter : 0, panier:[{type: "cupcake", title: "Cupecake", id: 1584106464745}], selectedProduct: {}}

const produitReducer = (state=initialstate, action) =>{
  switch(action.type){
    case 'COUNTER_LOADING' : 
      return { ...state, isloading : true}
    case 'INCREMENT' :
      return { ...state, counter: state.counter + 1,  panier :[...state.panier, action.payload]}
    case 'DECREMENT' :
      if (state.counter <= 0){
        return { ...state, counter: 0}
      } else {
      return { ...state, counter: state.counter -1}
      }
    case 'COUNTER_LOADING_END' : 
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
    case 'FETCH_PRODUCT_ID' : 

    case 'ERROR' : 
      return { ...state, isloading : false }
    default:
      return state;
  }
}
export default produitReducer;

//delete product by id pour panier final
