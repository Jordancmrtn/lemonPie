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

export async function getProductsId(dispatch, id){
  dispatch({
    type : "LOADING"
  })

  let products = []
  await new Promise((resolve, reject)=>{
    setTimeout(()=>{
      products = [{
        type : "pie",
        img : process.env.PUBLIC_URL+"/lemonPie.png",
        price : "2€55",
        title : "Lemon Pie",
        desc : "Lemon meringue pie is a type of baked pie, usually served for dessert, made with a crust usually made of shortcrust pastry, lemon custard filling and a fluffy meringue topping",
        ingredients : ["sugar", "flour", "cornstarch","salt", "water", "lemons", "butter", "eggs", "pie crust"]
      },{
        type : "pie",
        img : process.env.PUBLIC_URL+"/pecanPie.png",
        price : "2€95",
        title : "Pecan Pie",
        desc : "Pecan pie is a pie of pecan nuts mixed with a filling of eggs, butter, and sugar (typically corn syrup)",
        ingredients : ["sugar", "eggs", "butter", "vanilla", "pecans", "pie crust"]
      },
      {
        type : "cookie",
        img : process.env.PUBLIC_URL+"/OatMealCreampies.png",
        price : "1€25",
        title : "Oat Meal Creampies",
        desc : "Homemade Oatmeal Cream Pies are outrageously delicious! Soft oatmeal cookies with a rich marshmallow buttercream filling",
        ingredients : ["butter", "sugar", "egg", "salt", "baking soda", "cinnamon", "flour"]
      },
      {
        type : "cupecakce",
        img : process.env.PUBLIC_URL+"/vanilleCupecake.png",
        price : "1€75",
        title : "Vanilla Cupecake",
        desc : "This vanilla cupcake recipe is easy, soft, and moist ! The perfect birthday cupcake topped with a tall swirl of frosting !",
        ingredients : ["flour", "sugar", "butter", "salt", "baking power", "egg", "milk", "flour"]
      },
      {
        type : "cupecakce",
        img : process.env.PUBLIC_URL+"/chocolateCupecake.png",
        price : "1€75",
        title : "Chocolate Cupecake",
        desc : "The best Chocolate cupecake, for your little pleasure ",
        ingredients : ["water", "sugar", "butter", "cacao", "baking power"]
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

export async function getAllProducts(dispatch, id){
  dispatch({
    type : "LOADING"
  })

  let products = []
  await new Promise((resolve, reject)=>{
    setTimeout(()=>{
      products = [{
        type : "pie",
        img : process.env.PUBLIC_URL+"/lemonPie.png",
        price : "2€55",
        title : "Lemon Pie",
        desc : "Lemon meringue pie is a type of baked pie, usually served for dessert, made with a crust usually made of shortcrust pastry, lemon custard filling and a fluffy meringue topping",
        ingredients : ["sugar", "flour", "cornstarch","salt", "water", "lemons", "butter", "eggs", "pie crust"]
      },{
        type : "pie",
        img : process.env.PUBLIC_URL+"/pecanPie.png",
        price : "2€95",
        title : "Pecan Pie",
        desc : "Pecan pie is a pie of pecan nuts mixed with a filling of eggs, butter, and sugar (typically corn syrup)",
        ingredients : ["sugar", "eggs", "butter", "vanilla", "pecans", "pie crust"]
      },
      {
        type : "cookie",
        img : process.env.PUBLIC_URL+"/OatMealCreampies.png",
        price : "1€25",
        title : "Oat Meal Creampies",
        desc : "Homemade Oatmeal Cream Pies are outrageously delicious! Soft oatmeal cookies with a rich marshmallow buttercream filling",
        ingredients : ["butter", "sugar", "egg", "salt", "baking soda", "cinnamon", "flour"]
      },
      {
        type : "cupecakce",
        img : process.env.PUBLIC_URL+"/vanilleCupecake.png",
        price : "1€75",
        title : "Vanilla Cupecake",
        desc : "This vanilla cupcake recipe is easy, soft, and moist ! The perfect birthday cupcake topped with a tall swirl of frosting !",
        ingredients : ["flour", "sugar", "butter", "salt", "baking power", "egg", "milk", "flour"]
      },
      {
        type : "cupecakce",
        img : process.env.PUBLIC_URL+"/chocolateCupecake.png",
        price : "1€75",
        title : "Chocolate Cupecake",
        desc : "The best Chocolate cupecake, for your little pleasure ",
        ingredients : ["water", "sugar", "butter", "cacao", "baking power"]
      }
      ]
      resolve()
    },3000)
  })

  dispatch({
    type : "GET_ALL_PRODUCT",
    payload : {products : products}
  })
}