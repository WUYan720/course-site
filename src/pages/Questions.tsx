import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ChevronDown, ChevronRight, FileCode, BookOpen } from 'lucide-react'
import { questions } from '../data/questions'

export default function Questions() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const [expandedExamples, setExpandedExamples] = useState<Set<string>>(new Set())
  const [expandedExercises, setExpandedExercises] = useState<Set<string>>(new Set())

  const toggleProject = (id: number) => {
    setExpandedProject(expandedProject === id ? null : id)
  }

  const toggleExample = (id: string) => {
    const newSet = new Set(expandedExamples)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setExpandedExamples(newSet)
  }

  const toggleExercise = (id: string) => {
    const newSet = new Set(expandedExercises)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setExpandedExercises(newSet)
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case '基础':
        return 'bg-softcyan-100 text-softcyan-700'
      case '进阶':
        return 'bg-softpink-100 text-softpink-700'
      case 'AI融合':
        return 'bg-amber-100 text-amber-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-cream-50 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 sm:space-y-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-stone-600 hover:text-softpink-700 transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              返回首页
            </Link>
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-800">
              Python 商务数据分析题库
            </h1>
            <p className="text-stone-600 text-lg">
              配套 10 个实战项目，包含课堂例题与课后练习题
            </p>
          </div>

          <div className="space-y-4">
            {questions.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-cream-200 overflow-hidden">
                <button
                  onClick={() => toggleProject(project.id)}
                  className="w-full px-6 py-5 sm:px-8 text-left hover:bg-cream-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {expandedProject === project.id ? (
                          <ChevronDown className="w-6 h-6 text-softpink-600" />
                        ) : (
                          <ChevronRight className="w-6 h-6 text-softpink-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-stone-800">
                          项目 {project.id}：{project.name}
                        </h3>
                        <p className="text-sm text-stone-500 mt-1">
                          {project.examples.length} 道例题 · {project.exercises.length} 道练习题
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-stone-500">
                      <span className="px-3 py-1 bg-cream-100 rounded-full text-cream-700">
                        {project.dataFile}
                      </span>
                    </div>
                  </div>
                </button>

                {expandedProject === project.id && (
                  <div className="px-6 sm:px-8 pb-8 border-t border-cream-200">
                    <div className="pt-6 space-y-8">
                      <section>
                        <div className="flex items-center gap-2 mb-4">
                          <FileCode className="w-5 h-5 text-softcyan-600" />
                          <h4 className="text-xl font-semibold text-stone-800">
                            课堂例题
                          </h4>
                        </div>
                        <div className="space-y-3">
                          {project.examples.map((example) => (
                            <div key={example.id} className="border border-cream-200 rounded-xl overflow-hidden">
                              <button
                                onClick={() => toggleExample(example.id)}
                                className="w-full px-4 py-3 flex items-center justify-between hover:bg-cream-50 transition-colors"
                              >
                                <span className="font-medium text-stone-700">{example.title}</span>
                                {expandedExamples.has(example.id) ? (
                                  <ChevronDown className="w-4 h-4 text-stone-500" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-stone-500" />
                                )}
                              </button>
                              {expandedExamples.has(example.id) && (
                                <div className="border-t border-cream-200 bg-stone-900 p-4">
                                  <pre className="text-sm text-stone-100 overflow-x-auto">
                                    <code>{example.code}</code>
                                  </pre>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </section>

                      <section>
                        <div className="flex items-center gap-2 mb-4">
                          <BookOpen className="w-5 h-5 text-softpink-600" />
                          <h4 className="text-xl font-semibold text-stone-800">
                            课后练习题
                          </h4>
                        </div>
                        <div className="space-y-3">
                          {project.exercises.map((exercise) => (
                            <div key={exercise.id} className="border border-cream-200 rounded-xl overflow-hidden">
                              <button
                                onClick={() => toggleExercise(exercise.id)}
                                className="w-full px-4 py-3 flex items-center justify-between hover:bg-cream-50 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(exercise.level)}`}>
                                    {exercise.level}
                                  </span>
                                  <span className="font-medium text-stone-700">{exercise.title}</span>
                                </div>
                                {expandedExercises.has(exercise.id) ? (
                                  <ChevronDown className="w-4 h-4 text-stone-500" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-stone-500" />
                                )}
                              </button>
                              {expandedExercises.has(exercise.id) && (
                                <div className="border-t border-cream-200 bg-cream-50 px-4 py-3">
                                  <p className="text-stone-600">{exercise.description}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
