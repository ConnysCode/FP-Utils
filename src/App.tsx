import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import TrinkgeldPage from "./TrinkgeldCalculator/TrinkgeldPage";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <nav>
          <Link to={`/trinkgeld`}>
            Trinkgeld Rechner
          </Link>
        </nav>
        <Routes>
          <Route caseSensitive path={`/trinkgeld`} element={<TrinkgeldPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
