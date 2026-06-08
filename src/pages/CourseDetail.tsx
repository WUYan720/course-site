import { useParams, Link } from "react-router-dom";
import { courseContent } from "@/data/courseContent";
import { BookOpen, ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

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

  const toggleSection = (sectionId: string) => {
    const newSet = new Set(expandedSections);
    if (newSet.has(sectionId)) {
      newSet.delete(sectionId);
    } else {
      newSet.add(sectionId);
    }
    setExpandedSections(newSet);
  };

  return (
    <div className="min-h-screen bg-cream-50 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 sm:space-y-8">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-softpink-700 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            返回课程列表
          </Link>

          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-softpink-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-softpink-700" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-800">
              {chapter.title}
            </h1>
            <p className="text-stone-600 text-lg max-w-2xl mx-auto">
              {chapter.subtitle}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-softcyan-100 text-softcyan-700 rounded-full text-sm font-medium">
              <BookOpen className="w-4 h-4" />
              {chapter.sections.length} 个知识点
            </div>
          </div>

          <div className="space-y-4">
            {chapter.sections.map((section, sIdx) => {
              const sectionId = `${chapter.id}-${sIdx}`;
              return (
                <div key={sectionId} className="bg-white rounded-2xl shadow-sm border border-cream-200 overflow-hidden">
                  <button
                    onClick={() => toggleSection(sectionId)}
                    className="w-full px-6 py-4 sm:px-8 text-left hover:bg-cream-50 transition-colors flex items-center justify-between"
                  >
                    <span className="font-semibold text-stone-800 text-base sm:text-lg">
                      {section.title}
                    </span>
                    {expandedSections.has(sectionId) ? (
                      <ChevronDown className="w-5 h-5 text-stone-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-stone-500" />
                    )}
                  </button>

                  {expandedSections.has(sectionId) && (
                    <div className="px-6 sm:px-8 pb-8 border-t border-cream-200">
                      <div className="pt-6 space-y-4">
                        {section.content.map((item, iIdx) => {
                          if (item.type === "text") {
                            return (
                              <div key={iIdx} className="text-stone-600 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                                {item.content}
                              </div>
                            );
                          }

                          if (item.type === "code" && item.code) {
                            return (
                              <div key={iIdx} className="rounded-lg overflow-hidden border border-stone-700">
                                <div className="bg-stone-800 px-4 py-2 text-stone-400 text-xs font-mono">
                                  {item.code.language}
                                </div>
                                <pre className="bg-stone-900 p-4 sm:p-6 overflow-x-auto">
                                  <code className="text-stone-100 text-sm font-mono whitespace-pre">
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
                                          className="border border-softpink-200 px-4 py-2 text-left text-stone-700 font-semibold"
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
                                            className="border border-cream-200 px-4 py-2 text-stone-600 text-sm"
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
                              <div key={iIdx} className="bg-softcyan-50 border-l-4 border-softcyan-500 px-4 py-3 rounded-r-lg">
                                <p className="text-stone-600 text-sm italic">
                                  {item.content}
                                </p>
                              </div>
                            );
                          }

                          return null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
