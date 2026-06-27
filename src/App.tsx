import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ToolDetail from "@/components/ToolDetail";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tool/:toolId" element={<ToolDetail />} />
      </Routes>
    </Router>
  );
}
