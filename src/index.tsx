import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import TrinkgeldPage from "./TrinkgeldCalculator/TrinkgeldPage";
import { Helmet } from "react-helmet";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route caseSensitive path={`/trinkgeld`} element={<TrinkgeldPage />} />
        <Route caseSensitive path={`/`} element={<Menu />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

function Menu() {
  return (
    <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>FP Utilities</title>
    </Helmet>
      <nav>
        <ol>
          <li>
            Menu
          </li>
        </ol>
      </nav>
      <div className="App">
        <h2>FP Utils</h2>
        <p></p>
        <Link to={`/trinkgeld`}><button>Trinkgeld Rechner</button></Link>
      </div>
    </>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
