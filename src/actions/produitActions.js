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

export async function getProducts(dispatch, id){
  dispatch({
    type : "LOADING"
  })

  let products = []
  await new Promise((resolve, reject)=>{
    setTimeout(()=>{
      products = [{
        type : "lemonPie",
        title : "Lemon Pie",
        desc : "Lemon meringue pie is a type of baked pie, usually served for dessert, made with a crust usually made of shortcrust pastry, lemon custard filling and a fluffy meringue topping",
        ingredients : "1 cup white sugar, 2 tablespoons all-purpose flour, 3 tablespoons cornstarch, ¼ teaspoon salt, 1 ½ cups water, 2 lemons, juiced and zested, 2 tablespoons butter, 4 egg yolks, beaten, 1 (9 inch) pie crust, baked, 4 egg whites, 6 tablespoons white sugar"
      },{
        type : "pecanPie",
        title : "Pecan Pie",
        desc : "Pecan pie is a pie of pecan nuts mixed with a filling of eggs, butter, and sugar (typically corn syrup)",
        ingredients : "bla bla bla bla"
      }
      ]
      resolve()
    },3000)
  })

  dispatch({
    type : "GET_PRODUCT_ID",
    payload : {products : products, id: id}
  })
}