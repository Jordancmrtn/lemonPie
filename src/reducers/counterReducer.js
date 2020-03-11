let initialstate = { isloading : false, counter : 0}

const counterReducer = (state=initialstate, action) =>{
  switch(action.type){
    case 'COUNTER_LOADING' : 
      return { ...state, isloading : true }
    case 'INCREMENT' :
      return { ...state, counter: state.counter + 1}
    case 'DECREMENT' :
      if (state.counter <= 0){
        return { ...state, counter: 0}
      } else {
      return { ...state, counter: state.counter -1}
      }
    case 'COUNTER_LOADING_END' : 
      return { ...state, isloading : false }
    case 'ERROR' : 
      return { ...state, isloading : false }
    default:
      return state;
  }
}
export default counterReducer;