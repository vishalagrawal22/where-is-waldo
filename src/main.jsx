import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import GameDisplay from "./components/GameDisplay/GameDisplay";
import GameList from "./components/GameList/GameList";
import Leaderboard from "./components/Leaderboard";
import Header from "./components/Header";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Header type={"leaderboard"} />} />
          <Route path="game">
            <Route index element={<Header type={"leaderboard"} />} />
            <Route path=":gameId" element={<Header type={"leaderboard"} />} />
          </Route>
          <Route path="leaderboard">
            <Route index element={<Header type={"home"} />} />
            <Route path=":gameId" element={<Header type={"home"} />} />
          </Route>
        </Route>
        <Route path="*" element={<Header type={"home"} />} />
      </Routes>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<GameList buttonType="play" />} />
          <Route path="game">
            <Route index element={<GameList buttonType="play" />} />
            <Route path=":gameId" element={<GameDisplay />} />
          </Route>
          <Route path="leaderboard">
            <Route index element={<GameList buttonType="leaderboard" />} />
            <Route path=":gameId" element={<Leaderboard />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={
            <div style={{ padding: "16px", fontSize: "24px" }}>
              Error 404: page not found!
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
