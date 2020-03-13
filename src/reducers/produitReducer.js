import _ from 'lodash';

let initialstate = { isloading : false, counter : 0, panier:[{type: "cupcake", quatite: 3}]}

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
    case 'VOIR_PANIER' :
      (console.log(state.panier))
      return {...state} 
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
    case 'ERROR' : 
      return { ...state, isloading : false }
    default:
      return state;
  }
}
export default produitReducer;

//delete product by id pour panier final
