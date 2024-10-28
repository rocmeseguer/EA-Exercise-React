import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";

import './w3.css';
import './App.css';

import Home from './Components/Home';
import Item from './Components/Item';
import Items from './Components/Items';
import NavBar from './Components/NavBar';

function App() {
  return (
    <BrowserRouter>

      <NavBar />
      <div className="w3-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<Items />} />
          <Route path="/items/:id" element={<Item />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
