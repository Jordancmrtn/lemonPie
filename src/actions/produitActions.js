import _ from 'lodash';

export const incrementCounter = (dispatch, article) => {
  
  let newArticle = _.cloneDeep(article)
  const id = Date.now()
  newArticle.id = id;

  dispatch({
    type : "INCREMENT",
    payload : newArticle
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