import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Repositories from "./pages/Repositories";
import Repository from "./pages/Repository";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="repositories" element={<Repositories />} />
          <Route path="repository/:id" element={<Repository />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
