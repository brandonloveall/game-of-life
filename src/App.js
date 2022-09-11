import './App.css';
import Settings from "./components/Settings/Settings.jsx"
import Canvas from "./components/Canvas/Canvas.jsx"
import { useState } from 'react';

function App() {
  const [width, setWidth] = useState(20)
  const [height, setHeight] = useState(20)

  return (
   <div className='App'>
    <Settings setWidth={setWidth} setHeight={setHeight}/>
    <Canvas width={width} height={height}/>
   </div> 
  )
}

export default App;
