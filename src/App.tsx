import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Questions from "@/pages/Questions";
import ProjectQuestionDetail from "@/pages/ProjectQuestionDetail";
import CourseQuestionDetail from "@/pages/CourseQuestionDetail";
import ProjectQuestionList from "@/pages/ProjectQuestionList";
import CourseQuestionList from "@/pages/CourseQuestionList";
import { preloadPyodide } from "@/utils/pyodideLoader";

export default function App() {
  useEffect(() => {
    // 网站启动后在空闲时间后台预加载Python环境
    // 不阻塞页面渲染，用户浏览页面时在后台准备好
    const startPreload = () => {
      preloadPyodide().catch(() => {
        // 预加载失败不影响网站正常运行，用户进入编辑器页面时会再次尝试
      });
    };

    if (typeof window !== "undefined") {
      const w = window as any;
      if ("requestIdleCallback" in window) {
        w.requestIdleCallback(startPreload, { timeout: 3000 });
      } else {
        // 降级方案：等待页面加载后延迟启动
        w.addEventListener("load", () => {
          setTimeout(startPreload, 500);
        });
      }
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/questions/project/:projectId" element={<ProjectQuestionList />} />
        <Route path="/questions/project/:projectId/type/:questionType/:questionId" element={<ProjectQuestionDetail />} />
        <Route path="/questions/course/:courseId" element={<CourseQuestionList />} />
        <Route path="/questions/course/:courseId/:questionId" element={<CourseQuestionDetail />} />
      </Routes>
    </Router>
  );
}
