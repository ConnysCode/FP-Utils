import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TrinkgeldPage from "./TrinkgeldCalculator/TrinkgeldPage";
import "./App.css"

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/trinkgeld">Trinkgeld Rechner</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route caseSensitive path={`/trinkgeld`} element={<TrinkgeldPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
