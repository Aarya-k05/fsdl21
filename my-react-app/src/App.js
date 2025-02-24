import { useState } from "react";

function App() {
  const [isLight, setIsLight] = useState(true); // State: true = Light Mode

  return (
    <div style={{ background: isLight ? "white" : "black", color: isLight ? "black" : "white", height: "100vh" }}>
      <h2>{isLight ? "Light Mode" : "Dark Mode"}</h2>
      <button onClick={() => setIsLight(!isLight)}>Toggle Mode</button>
    </div>
  );
}

export default App;
