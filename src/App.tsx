import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";

import './App.css';

import Home from './Home';
import Item from './Item';
import Items from './Items';
import NewItem from './NewItem';
import NavBar from './NavBar';

function App() {
  return (
    <BrowserRouter>

      <NavBar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/items/new" element={<NewItem />} />
        <Route path="/items/:id" element={<Item />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
