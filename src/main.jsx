import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import GameDisplay from "./components/GameDisplay/GameDisplay";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="game">
            <Route path=":gameId" element={<GameDisplay />} />
          </Route>
          <Route path="leaderboard"></Route>
        </Route>
        <Route path="*" element={<div>Page not found!</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
