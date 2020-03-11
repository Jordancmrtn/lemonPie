import React from 'react';
import './App.css';
import LemonPie from './components/LemonPie';
import Counter from './components/Counter'

function App() {
  return (
    <div className="App">
      <h1 id="titleLemonPie">LEMON PIE</h1>
      <div className="squareBackground">
        <Counter />
        <LemonPie/>
      </div>
    </div>
  );
}

export default App;
