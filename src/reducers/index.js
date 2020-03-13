import produitReducer from './produitReducer'
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  produit : produitReducer,
})

export default allReducers