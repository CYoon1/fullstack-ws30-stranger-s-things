/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
import { useState } from 'react'
import './App.css'
import Navbar from './Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id="container">
        <Navbar />
      </div>
    </>
  )
}

export default App
