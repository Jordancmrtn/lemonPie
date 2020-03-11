import React from 'react';
import {incrementCounter, decrementCounter} from '../actions/counterActions';
import { useSelector, useDispatch } from 'react-redux';
import '../style/counter.css'


export default function Counter() {

  const dispatch = useDispatch()
  const counter = useSelector(state => state.counter.counter)

  return (
    <>
    <div style={{display: "flex", flexDirection: "column"}}>
      <h3>ADD TO BAG</h3>
      <div id="counterContainer">
        <button id="buttonCounter" onClick={() => decrementCounter(dispatch)}>-</button>
        <span>{counter}</span>
        <button id="buttonCounter" onClick={() => incrementCounter(dispatch)}>+</button>
      </div>
    </div>
    </>
  )
}
