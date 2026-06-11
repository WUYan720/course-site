import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, FileCode, CheckCircle, XCircle } from 'lucide-react'
import { courseExercises, type ChoiceQuestion, type PracticalQuestion } from '../data/questions'

export default function CourseQuestionDetail() {
  const { courseId, questionId } = useParams<{ courseId: string; questionId: string }>()

  const course = courseExercises.find((c) => c.id === Number(courseId))
  const question = course?.questions.find((q) => q.id === questionId)

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [showAnswers, setShowAnswers] = useState<Set<string>>(new Set())

  if (!course || !question) {
    return (
      <div className="min-h-screen bg-cream-50 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/questions"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-softpink-700 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            返回题库列表
          </Link>
          <div className="text-center mt-12">
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-4">题目未找到</h1>
            <p className="text-stone-600">抱歉，该题目不存在</p>
            <Link
              to="/questions"
              className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-softpink-600 text-white rounded-lg hover:bg-softpink-700 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              返回题库列表
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleSelectAnswer = (qId: string, optionIndex: number) => {
    if (showAnswers.has(qId)) return
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIndex }))
  }

  const handleSubmitAnswer = (qId: string) => {
    const newSet = new Set(showAnswers)
    newSet.add(qId)
    setShowAnswers(newSet)
  }

  const getOptionStyle = (
    q: ChoiceQuestion,
    optionIndex: number,
    isSelected: boolean,
    isCorrect: boolean,
    showAnswer: boolean,
  ) => {
    const baseStyle = 'w-full px-4 py-3 text-left rounded-lg border transition-all cursor-pointer'

    if (!showAnswer) {
      return isSelected
        ? `${baseStyle} border-softpink-500 bg-softpink-50`
        : `${baseStyle} border-cream-200 hover:bg-cream-50`
    }

    if (isCorrect) {
      return `${baseStyle} border-green-500 bg-green-50 text-green-700`
    }

    if (isSelected && !isCorrect) {
      return `${baseStyle} border-red-500 bg-red-50 text-red-700`
    }

    return `${baseStyle} border-cream-200 bg-cream-50 text-stone-400`
  }

  return (
    <div className="min-h-screen bg-cream-50 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 sm:space-y-8">
          <Link
            to="/questions"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-softpink-700 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            返回题库列表
          </Link>

          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-softpink-100 rounded-xl flex items-center justify-center">
                {question.type === 'choice' ? (
                  <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-softpink-700" />
                ) : (
                  <FileCode className="w-6 h-6 sm:w-7 sm:h-7 text-softcyan-700" />
                )}
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-800">
              {course.title}
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-softcyan-100 text-softcyan-700 rounded-full text-sm font-medium">
              {question.type === 'choice' ? (
                <>
                  <BookOpen className="w-4 h-4" />
                  选择题
                </>
              ) : (
                <>
                  <FileCode className="w-4 h-4" />
                  实操题
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-cream-200 overflow-hidden">
            <div className="px-6 py-6 sm:px-8 sm:py-8">
              {question.type === 'choice' && (
                <div className="space-y-4">
                  <p className="text-lg font-semibold text-stone-800 leading-relaxed">
                    {question.question}
                  </p>

                  <div className="space-y-2 pt-2">
                    {question.options.map((option, optIdx) => {
                      const selectedAnswer = selectedAnswers[question.id]
                      const showAnswer = showAnswers.has(question.id)
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectAnswer(question.id, optIdx)}
                          disabled={showAnswer}
                          className={getOptionStyle(
                            question,
                            optIdx,
                            selectedAnswer === optIdx,
                            question.correctAnswer === optIdx,
                            showAnswer,
                          )}
                        >
                          <span className="flex items-center gap-2">
                            {showAnswer && question.correctAnswer === optIdx && (
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            )}
                            {showAnswer &&
                              selectedAnswer === optIdx &&
                              question.correctAnswer !== optIdx && (
                                <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                              )}
                            {option}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  {!showAnswers.has(question.id) &&
                    selectedAnswers[question.id] !== undefined && (
                      <button
                        onClick={() => handleSubmitAnswer(question.id)}
                        className="w-full mt-3 px-4 py-2 bg-softpink-600 text-white rounded-lg hover:bg-softpink-700 transition-colors font-medium"
                      >
                        确认答案
                      </button>
                    )}

                  {showAnswers.has(question.id) && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-700 text-sm">
                        <strong>正确答案：</strong>
                        {question.options[question.correctAnswer]}
                      </p>
                      <p className="text-green-600 text-sm mt-2">
                        <strong>解析：</strong>
                        {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {question.type === 'practical' && (
                <div className="space-y-4">
                  <p className="text-lg font-semibold text-stone-800 leading-relaxed">
                    {question.title}
                  </p>

                  <div className="bg-stone-50 p-3 rounded-lg whitespace-pre-line text-stone-600">
                    {question.description}
                  </div>

                  <div className="bg-stone-900 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-stone-100 font-mono whitespace-pre">
                      <code>{question.code}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
