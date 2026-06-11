import { useParams, Link } from "react-router-dom";
import { courseContent } from "@/data/courseContent";
import { BookOpen, ArrowLeft, PenTool } from "lucide-react";
import CodeEditor from "@/components/CodeEditor";

// 课程ID与练习题模块ID的映射
const courseToExerciseMap: Record<string, number> = {
  'data-cleaning': 1,
  'group-aggregation': 2,
  'market-basket-analysis': 3,
  'customer-clustering': 4,
  'data-visualization-1': 5,
  'data-visualization-2': 5,
  'financial-visualization': 5,
  'ab-testing': 6,
  'time-series': 7,
  'feature-engineering': 8,
  'outlier-detection': 9,
  'data-merging': 9,
};

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();

  const chapter = courseContent.find((c) => c.id === id);

  if (!chapter) {
    return (
      <div className="min-h-screen bg-cream-50 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-softpink-700 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            返回课程列表
          </Link>
          <div className="text-center mt-12">
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-4">课程未找到</h1>
            <p className="text-stone-600">抱歉，该课程不存在</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 py-6 sm:py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-softpink-700 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            返回课程列表
          </Link>

          <div className="text-center space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-softpink-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-softpink-700" />
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-stone-800">
              {chapter.title}
            </h1>
            <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto">
              {chapter.subtitle}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-softcyan-100 text-softcyan-700 rounded-full text-xs sm:text-sm font-medium">
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
              {chapter.sections.length} 个知识点
            </div>
          </div>

          {/* 左右两栏布局 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* 左栏：课程知识点内容 */}
            <div className="bg-white rounded-2xl shadow-sm border border-cream-200 overflow-hidden">
              <div className="p-4 sm:p-6 space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto
                [&::-webkit-scrollbar]:w-2 
                [&::-webkit-scrollbar-thumb]:bg-cream-300 
                [&::-webkit-scrollbar-thumb]:rounded-full 
                [&::-webkit-scrollbar-thumb]:hover:bg-cream-400
                [&::-webkit-scrollbar-track]:bg-cream-100">
              {chapter.sections.map((section, sIdx) => {
                return (
                  <div key={sIdx} className="border-b border-cream-100 last:border-b-0 pb-4 last:pb-0">
                    <div className="px-2 py-2">
                      <span className="font-semibold text-stone-800 text-sm sm:text-base">
                        {section.title}
                      </span>
                    </div>

                    <div className="px-2 pb-4">
                      <div className="space-y-3">
                        {section.content.map((item, iIdx) => {
                          if (item.type === "text") {
                            return (
                              <div key={iIdx} className="text-stone-600 leading-relaxed whitespace-pre-line text-xs sm:text-sm">
                                {item.content}
                              </div>
                            );
                          }

                          if (item.type === "code" && item.code) {
                            return (
                              <div key={iIdx} className="rounded-lg overflow-hidden border border-stone-700">
                                <div className="bg-stone-800 px-3 py-1.5 text-stone-400 text-xs font-mono">
                                  {item.code.language}
                                </div>
                                <pre className="bg-stone-900 p-3 sm:p-4 overflow-x-auto">
                                  <code className="text-stone-100 text-xs sm:text-sm font-mono whitespace-pre">
                                    {item.code.code}
                                  </code>
                                </pre>
                              </div>
                            );
                          }

                          if (item.type === "table" && item.table) {
                            return (
                              <div key={iIdx} className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                  <thead>
                                    <tr className="bg-softpink-100">
                                      {item.table.headers.map((header, hIdx) => (
                                        <th
                                          key={hIdx}
                                          className="border border-softpink-200 px-2 py-1.5 text-left text-stone-700 font-semibold text-xs"
                                        >
                                          {header}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {item.table.rows.map((row, rIdx) => (
                                      <tr key={rIdx} className="hover:bg-cream-50">
                                        {row.map((cell, cIdx) => (
                                          <td
                                            key={cIdx}
                                            className="border border-cream-200 px-2 py-1.5 text-stone-600 text-xs"
                                          >
                                            {cell}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            );
                          }

                          if (item.type === "note") {
                            return (
                              <div key={iIdx} className="bg-softcyan-50 border-l-4 border-softcyan-500 px-3 py-2 rounded-r-lg">
                                <p className="text-stone-600 text-xs sm:text-sm italic">
                                  {item.content}
                                </p>
                              </div>
                            );
                          }

                          return null;
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* 前往练习按钮 */}
              {courseToExerciseMap[id || ''] && (
                <div className="sticky bottom-0 bg-white border-t border-cream-200 p-3">
                  <Link
                    to={`/questions/course/${courseToExerciseMap[id || '']}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-softpink-100 hover:bg-softpink-200 text-softpink-700 rounded-xl font-medium transition-colors shadow-sm"
                  >
                    <PenTool className="w-4 h-4" />
                    前往练习
                  </Link>
                </div>
              )}
              </div>
            </div>

            {/* 右栏：Python代码编辑器 */}
            <div className="min-h-[600px] sm:min-h-[700px] lg:min-h-[calc(100vh-250px)]">
              <CodeEditor />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
