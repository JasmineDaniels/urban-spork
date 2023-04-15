import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from 'react-router-dom'
import { Navbar } from "./components";
// import { useEffect, useState } from "react";
import GlobalStyles from "./GlobalStyles";
import Home from './pages/Home';
import Inspect from './pages/Inspect';
import Duel from './pages/Duel';

function App() {

  return (
    <Router>
      <GlobalStyles />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/inspect" element={<Inspect/>}/>
          <Route path="/duel" element={<Duel/>}/>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
