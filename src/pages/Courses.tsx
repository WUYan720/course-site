import { Link } from "react-router-dom";
import { courseContent } from "@/data/courseContent";
import { BookOpen, ArrowLeft, ChevronRight } from "lucide-react";

export default function Courses() {
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-800">Python 商务数据分析课程</h1>
            <p className="text-stone-600 max-w-2xl mx-auto px-4 text-sm sm:text-base">
              核心知识点详解，夯实数据分析基础
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {courseContent.map((chapter) => (
              <Link
                key={chapter.id}
                to={`/courses/${chapter.id}`}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-cream-200 p-4 sm:p-6 group"
              >
                <p className="text-stone-500 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-3">{chapter.subtitle}</p>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-softpink-100 rounded-xl flex items-center justify-center group-hover:bg-softpink-200 transition-colors">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-softpink-700" />
                  </div>
                  <div className="text-xs sm:text-sm text-softcyan-700 font-bold">{chapter.sections.length}个知识点</div>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-stone-800 mb-3 line-clamp-2 leading-snug">{chapter.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-stone-500 bg-cream-50 rounded-xl px-2 sm:px-3 py-1.5">
                  <ChevronRight className="w-3 h-3" />
                  <span className="truncate">点击查看详情</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
