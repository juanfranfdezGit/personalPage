import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";   
import Project from "./pages/Project"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/proyecto/:nombre" element={<Project />} />
    </Routes>
  );
}

export default App;