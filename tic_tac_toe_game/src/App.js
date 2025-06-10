import React, { useState } from "react";
import "./App.css";

// PUBLIC_INTERFACE
function App() {
  // Colors for theming
  const primary = "#ffffff";
  const secondary = "#000000";
  const accent = "#2196f3";

  // Initialize empty board
  const emptyBoard = Array(9).fill(null);

  // State
  const [board, setBoard] = useState(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [status, setStatus] = useState("Next player: X");

  // PUBLIC_INTERFACE
  function calculateWinner(squares) {
    // Return "X", "O", "draw" or null.
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    if (squares.every(Boolean)) return "draw";
    return null;
  }

  // PUBLIC_INTERFACE
  function handleClick(i) {
    if (board[i] || gameOver) return;
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? "X" : "O";
    const winner = calculateWinner(newBoard);
    setBoard(newBoard);

    if (winner === "X") {
      setStatus("Winner: X");
      setGameOver(true);
    } else if (winner === "O") {
      setStatus("Winner: O");
      setGameOver(true);
    } else if (winner === "draw") {
      setStatus("Draw!");
      setGameOver(true);
    } else {
      setXIsNext(!xIsNext);
      setStatus("Next player: " + (xIsNext ? "O" : "X"));
    }
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setBoard(emptyBoard);
    setXIsNext(true);
    setGameOver(false);
    setStatus("Next player: X");
  }

  // Board rendering
  const renderSquare = i => (
    <button
      /** Each grid cell for the game. */
      className="ttt-square"
      style={{
        color: board[i] === "X" ? accent : secondary,
        borderColor: accent,
        background: primary,
        cursor: board[i] || gameOver ? "not-allowed" : "pointer",
      }}
      onClick={() => handleClick(i)}
      disabled={Boolean(board[i]) || gameOver}
      aria-label={`Cell ${i}, ${board[i] ? board[i] : "empty"}`}
    >
      {board[i]}
    </button>
  );

  // Adjust body background for theme
  React.useEffect(() => {
    document.body.style.background = primary;
    document.body.style.color = secondary;
  }, []);

  return (
    <div
      className="app"
      style={{ minHeight: "100vh", background: primary, color: secondary }}
    >
      <nav
        className="navbar"
        style={{ backgroundColor: primary, borderBottom: `1px solid ${accent}` }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div className="logo" style={{ color: secondary }}>
              <span className="logo-symbol" style={{ color: accent }}>
                ◼
              </span>
              TIC TAC TOE CLASSIC
            </div>
            <button
              className="btn"
              style={{
                background: accent,
                color: "#fff",
                border: "none",
              }}
              onClick={handleReset}
              aria-label="Reset game"
            >
              Reset Game
            </button>
          </div>
        </div>
      </nav>
      <main>
        <div
          className="container"
          style={{
            minHeight: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1 className="title" style={{ color: secondary, marginTop: 40 }}>
            TicTacToe Classic
          </h1>
          <div className="ttt-board-container">
            <div
              className="ttt-board"
              style={{
                display: "grid",
                gridTemplateRows: "repeat(3, 80px)",
                gridTemplateColumns: "repeat(3, 80px)",
                gap: "10px",
                margin: "40px auto 12px auto",
                background: primary,
                borderRadius: "12px",
                boxShadow:
                  "0 2px 8px 0 rgba(33,150,243,.09),0 1.5px 7px 0 rgba(0,0,0,0.05)",
                border: `2px solid ${accent}`,
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              {Array.from({ length: 9 }).map((_, i) => renderSquare(i))}
            </div>
          </div>
          <div
            className="ttt-status"
            style={{
              fontSize: "1.3rem",
              margin: "12px 0 16px 0",
              color: gameOver
                ? status.startsWith("Winner") ? accent : secondary
                : accent,
              fontWeight: "600",
            }}
            role="status"
            aria-live="polite"
          >
            {status}
          </div>
          <button
            className="btn btn-large"
            style={{
              background: accent,
              color: "#fff",
              border: "none",
              fontWeight: 600,
              marginTop: 6,
              padding: "12px 34px",
              fontSize: "1.15rem",
              borderRadius: "4px",
            }}
            onClick={handleReset}
            aria-label="Reset game"
          >
            Reset
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;