import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Knowledge from "@/pages/Knowledge";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Questions from "@/pages/Questions";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/questions" element={<Questions />} />
      </Routes>
    </Router>
  );
}
