import React, { useState } from "react";
import "../styles/Count.css";

const Counter = () => {
  const [count, setCount] = useState(0);

  // Function to adjust background color dynamically
  const getBackgroundColor = () => {
    if (count === 0) {
      return "rgb(247, 241, 220)";  // Background color when count is 0
    } 
    return `hsl(${Math.min(count * 2, 240)}, 100%, ${Math.min(100 - count / 5, 80)}%)`;
  };

  return (
    <div
      className="counter-container"
      style={{
        background: getBackgroundColor(),
        transition: "background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1)", // Smooth transition
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1 className="counter-title">Counter: {count}</h1>
      <div>
        <button onClick={() => setCount(count + 1)} className="btn">
          Increment
        </button>
        <button
          onClick={() => setCount(count > 0 ? count - 1 : 0)}
          className="btn"
        >
          Decrement
        </button>
        <button onClick={() => setCount(0)} className="btn reset">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;