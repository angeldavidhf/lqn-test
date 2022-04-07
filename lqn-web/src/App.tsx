import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Exercise01 from './components/pages/Exercise01';
import Exercise02 from './components/pages/Exercise02';
import StarWars from './components/pages/StarWars';

import Home from './components/pages/Home'

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/01" element={<Exercise01 />} />
                <Route path="/02" element={<Exercise02 />} />
                <Route path="/starwars" element={<StarWars />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
