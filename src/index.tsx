import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import TrinkgeldPage from "./TrinkgeldCalculator/TrinkgeldPage";
import { Helmet } from "react-helmet";
import SondergruppenPage from "./SondergruppenTracker/SondergruppenPage";

ReactDOM.render(
  <React.StrictMode>
    <div className="AppContainer">
    <Router>
      <Routes>
        <Route caseSensitive path={`/trinkgeld`} element={<TrinkgeldPage />} />
        <Route caseSensitive path={`/sondergruppen`} element={<SondergruppenPage />} />
        <Route caseSensitive path={`/`} element={<Menu />} />
      </Routes>
    </Router>
    </div>
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
      <div className="App Panel">
        <h2>FP Utils</h2>
        <br/>
        <div className="menu">
        <Link to={`/trinkgeld`}><button>Trinkgeld Rechner</button></Link>
        <Link to={`/sondergruppen`}><button>Sondergruppen Tracker</button></Link></div>
      </div>
    </>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
