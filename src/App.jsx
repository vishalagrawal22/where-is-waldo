import React from "react";

import "./App.css";

import GameDisplay from "./components/GameDisplay";

function App() {
  const gameId = "KT1WWKPRL1nSijN9FdRf";
  return (
    <>
      <GameDisplay gameId={gameId} />
    </>
  );
}

export default App;
