import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Repository from "./pages/Repository";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="repositories/:id" element={<Repository />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
