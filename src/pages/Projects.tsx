import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { FileText, Database, ArrowLeft } from "lucide-react";

export default function Projects() {
  return (
    <div className="min-h-screen bg-cream-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 sm:space-y-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-softpink-700 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>

          <div className="text-center space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-800">10个实战项目</h1>
            <p className="text-stone-600 max-w-2xl mx-auto px-4 text-sm sm:text-base">
              从入门到高阶，全方位掌握Python商务数据分析核心技能
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-cream-200 p-4 sm:p-6 group"
              >
                <p className="text-stone-500 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-3">{project.overview}</p>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-softcyan-100 rounded-xl flex items-center justify-center group-hover:bg-softcyan-200 transition-colors">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-softcyan-700" />
                  </div>
                  <div className="text-xs sm:text-sm text-softpink-700 font-bold">项目{project.id}</div>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-stone-800 mb-3 line-clamp-2 leading-snug">{project.name}</h3>
                <div className="flex items-center gap-1.5 text-xs text-stone-500 bg-cream-50 rounded-xl px-2 sm:px-3 py-1.5">
                  <Database className="w-3 h-3" />
                  <span className="truncate">{project.dataFile}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
