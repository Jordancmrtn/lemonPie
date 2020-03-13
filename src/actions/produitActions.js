export const incrementCounter = (dispatch, article) => {
  dispatch({
    type : "INCREMENT",
    payload : article
  })
}

export const decrementCounter = (dispatch) => {
  dispatch({type : "DECREMENT"})
}

export const ajoutPanier = (dispatch) => {
  console.log("OK c'est dans le panier")
  dispatch({
    type : "ADD_PANIER", 
  })
}