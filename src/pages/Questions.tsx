import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, FileText, ChevronRight } from 'lucide-react'
import { questions, courseExercises } from '../data/questions'

export default function Questions() {
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-800">
              Python 商务数据分析题库
            </h1>
            <p className="text-stone-600 max-w-2xl mx-auto px-4 text-sm sm:text-base">
              配套实战项目的例题与练习，巩固知识点，检验学习成果
            </p>
          </div>

          {/* 项目题库 */}
          <div className="text-center space-y-3 sm:space-y-4 pt-4">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-800">
              项目题库
            </h2>
            <p className="text-stone-500 max-w-2xl mx-auto px-4 text-sm sm:text-base">
              与 10 个实战项目一一对应，包含课堂例题与课后练习题
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {questions.map((project) => (
              <Link
                key={project.id}
                to={`/questions/project/${project.id}`}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-cream-200 p-4 sm:p-6 group"
              >
                <p className="text-stone-500 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-3">
                  {project.dataFile}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-softcyan-100 rounded-xl flex items-center justify-center group-hover:bg-softcyan-200 transition-colors">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-softcyan-700" />
                  </div>
                  <div className="text-xs sm:text-sm text-softpink-700 font-bold">
                    项目{project.id}
                  </div>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-stone-800 mb-3 line-clamp-2 leading-snug">
                  {project.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-stone-500 bg-cream-50 rounded-xl px-2 sm:px-3 py-1.5">
                  <BookOpen className="w-3 h-3" />
                  <span className="truncate">
                    {project.examples.length}道例题 · {project.exercises.length}道练习
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* 课程练习题 */}
          <div className="text-center space-y-3 sm:space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-800">
              课程练习题集
            </h2>
            <p className="text-stone-500 max-w-2xl mx-auto px-4 text-sm sm:text-base">
              按课程模块组织的单项选择题与实操题，检验对核心知识的掌握
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {courseExercises.map((course) => {
              const choiceCount = course.questions.filter((q) => q.type === 'choice').length
              const practicalCount = course.questions.filter((q) => q.type === 'practical').length

              return (
                <Link
                  key={course.id}
                  to={`/questions/course/${course.id}`}
                  className="bg-white rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-cream-200 p-4 sm:p-6 group"
                >
                  <p className="text-stone-500 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-3">
                    模块 {course.id}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-softpink-100 rounded-xl flex items-center justify-center group-hover:bg-softpink-200 transition-colors">
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-softpink-700" />
                    </div>
                    <div className="text-xs sm:text-sm text-softcyan-700 font-bold">
                      {choiceCount + practicalCount}题
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-stone-800 mb-3 line-clamp-2 leading-snug">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 bg-cream-50 rounded-xl px-2 sm:px-3 py-1.5">
                    <ChevronRight className="w-3 h-3" />
                    <span className="truncate">
                      {choiceCount}道选择 · {practicalCount}道实操
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
