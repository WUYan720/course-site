import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, FileCode, CheckCircle, XCircle, Send, ThumbsUp, AlertTriangle, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { courseExercises, type ChoiceQuestion, type PracticalQuestion } from '../data/questions';

// 练习题模块ID与课程ID的映射
const exerciseToCourseMap: Record<number, string> = {
  1: 'data-cleaning',
  2: 'group-aggregation',
  3: 'market-basket-analysis',
  4: 'customer-clustering',
  5: 'data-visualization-1',
  6: 'ab-testing',
  7: 'time-series',
  8: 'feature-engineering',
  9: 'outlier-detection',
};

interface AnalysisResult {
  correct: string[];
  problems: string[];
  suggestions: string[];
}

function analyzeUserCode(userCode: string, referenceCode: string): AnalysisResult {
  const result: AnalysisResult = { correct: [], problems: [], suggestions: [] };
  const code = userCode.toLowerCase();

  if (!userCode.trim()) {
    result.problems.push('您还没有输入任何代码，请先尝试作答。');
    result.suggestions.push('参考下面的解题思路，自己动手写一写吧！');
    return result;
  }

  // 检测正确的部分
  if (code.includes('import pandas') || code.includes('pandas as pd')) {
    result.correct.push('✓ 正确导入了 Pandas 库，这是数据处理的基础。');
  }
  if (code.includes('import numpy') || code.includes('numpy as np')) {
    result.correct.push('✓ 正确导入了 NumPy 库。');
  }
  if (code.includes('from sklearn')) {
    result.correct.push('✓ 正确导入了 Scikit-learn 库。');
  }
  if (code.includes('drop_duplicates')) {
    result.correct.push('✓ 使用了 drop_duplicates() 方法处理重复数据。');
  }
  if (code.includes('fillna')) {
    result.correct.push('✓ 使用了 fillna() 方法处理缺失值。');
  }
  if (code.includes('groupby')) {
    result.correct.push('✓ 使用了 groupby() 方法进行分组聚合。');
  }
  if (code.includes('agg(') || code.includes('aggregate')) {
    result.correct.push('✓ 使用了聚合函数处理数据。');
  }
  if (code.includes('transform')) {
    result.correct.push('✓ 使用了 transform() 方法进行数据转换。');
  }
  if (code.includes('sort_values')) {
    result.correct.push('✓ 使用了 sort_values() 方法对数据排序。');
  }
  if (code.includes('head(') || code.includes('tail(')) {
    result.correct.push('✓ 正确使用了查看数据的方法。');
  }

  // 检测潜在问题
  if (code.includes('df[') && !code.includes("df['") && !code.includes('df["')) {
    result.problems.push('⚠ 注意检查列名引号的使用，确保使用一致的引号风格。');
  }
  if (code.includes('groupby') && !code.includes('agg') && !code.includes('sum') && !code.includes('mean') && !code.includes('count')) {
    result.problems.push('⚠ groupby() 后通常需要配合聚合函数（如 agg、sum、mean）一起使用。');
  }
  if (code.includes('fillna') && !code.includes('mean') && !code.includes('median') && !code.includes('mode') && !code.includes('0') && !code.includes('"') && !code.includes("'")) {
    result.suggestions.push('💡 fillna() 可以指定填充值（如均值、中位数、众数或固定值），建议明确填充策略。');
  }
  if (code.includes('drop_duplicates') && !code.includes('subset')) {
    result.suggestions.push('💡 drop_duplicates() 可以通过 subset 参数指定基于哪些列去重，效果更精准。');
  }

  // 通用建议
  if (result.correct.length === 0) {
    result.problems.push('⚠ 您的代码中未检测到常见的数据处理方法，请检查是否使用了正确的库和方法。');
  }

  if (result.correct.length > 0 && result.problems.length === 0 && result.suggestions.length === 0) {
    result.suggestions.push('🌟 您的代码看起来不错！继续加油，有问题可以参考下面的参考答案。');
  }

  return result;
}

export default function CourseQuestionList() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseExercises.find((c) => c.id === Number(courseId));

  const [answered, setAnswered] = useState<Set<string>>(new Set());
  const [submittedPracticals, setSubmittedPracticals] = useState<Set<string>>(new Set());
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});

  const toggleAnswer = (qId: string) => {
    const newSet = new Set(answered);
    if (newSet.has(qId)) {
      newSet.delete(qId);
    } else {
      newSet.add(qId);
    }
    setAnswered(newSet);
  };

  const handleSubmit = (qId: string) => {
    const newSet = new Set(submittedPracticals);
    newSet.add(qId);
    setSubmittedPracticals(newSet);
  };

  const handleAnswerChange = (qId: string, value: string) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleReset = (qId: string) => {
    const newSet = new Set(submittedPracticals);
    newSet.delete(qId);
    setSubmittedPracticals(newSet);
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-cream-50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/questions"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-softpink-700 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            返回题库列表
          </Link>
          <div className="text-center mt-12 space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-800">模块未找到</h1>
            <p className="text-stone-600">抱歉，您访问的模块不存在或参数无效。</p>
          </div>
        </div>
      </div>
    );
  }

  const choiceQuestions = course.questions.filter((q): q is ChoiceQuestion => q.type === 'choice');
  const practicalQuestions = course.questions.filter((q): q is PracticalQuestion => q.type === 'practical');

  return (
    <div className="min-h-screen bg-cream-50 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 sm:space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/questions"
              className="inline-flex items-center gap-2 text-stone-600 hover:text-softpink-700 transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              返回题库列表
            </Link>
            {/* 返回课程详情按钮 */}
            {exerciseToCourseMap[course.id] && (
              <Link
                to={`/courses/${exerciseToCourseMap[course.id]}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-softcyan-100 hover:bg-softcyan-200 text-softcyan-700 rounded-xl font-medium transition-colors text-sm shadow-sm hover:shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                返回课程详情
              </Link>
            )}
          </div>

          <div className="text-center space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-800">
              模块 {course.id}：{course.title}
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-softpink-100 text-softpink-700 rounded-full text-sm font-medium">
              <BookOpen className="w-4 h-4" />
              共 {course.questions.length} 道题
            </div>
          </div>

          {/* 选择题 */}
          {choiceQuestions.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-cream-200 overflow-hidden">
              <div className="px-6 py-4 sm:px-8 sm:py-5 border-b border-cream-200 bg-softpink-50">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-softpink-700" />
                  <h2 className="text-lg sm:text-xl font-semibold text-stone-800">选择题</h2>
                  <span className="text-sm text-stone-500 ml-auto">{choiceQuestions.length} 道</span>
                </div>
              </div>
              <div className="divide-y divide-cream-100">
                {choiceQuestions.map((q, qIdx) => {
                  const isAnswered = answered.has(q.id);
                  return (
                    <div key={q.id} className="p-4 sm:p-6">
                      <p className="font-semibold text-stone-800 mb-4">
                        {qIdx + 1}. {q.question}
                      </p>
                      <div className="space-y-2">
                        {q.options.map((option, optIdx) => {
                          const isSelected = isAnswered ? q.correctAnswer === optIdx : false;
                          const isWrong = isAnswered && isSelected && q.correctAnswer !== optIdx;
                          const showCorrect = isAnswered && q.correctAnswer === optIdx;
                          const showWrong = isAnswered && isSelected && q.correctAnswer !== optIdx;

                          return (
                            <button
                              key={optIdx}
                              onClick={() => toggleAnswer(q.id)}
                              className={
                                showCorrect
                                  ? 'w-full px-4 py-3 text-left rounded-lg border-2 border-green-500 bg-green-50 text-green-700 transition-all'
                                  : showWrong
                                  ? 'w-full px-4 py-3 text-left rounded-lg border-2 border-red-500 bg-red-50 text-red-700 transition-all'
                                  : 'w-full px-4 py-3 text-left rounded-lg border border-cream-200 hover:bg-cream-50 text-stone-700 transition-all cursor-pointer'
                              }
                            >
                              <span className="flex items-center gap-2">
                                {showCorrect && <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />}
                                {showWrong && <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />}
                                {option}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {isAnswered && (
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-green-700 text-sm">
                            <strong>正确答案：</strong>{q.options[q.correctAnswer]}
                          </p>
                          <p className="text-green-600 text-sm mt-1">
                            <strong>解析：</strong>{q.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 实操题 */}
          {practicalQuestions.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-cream-200 overflow-hidden">
              <div className="px-6 py-4 sm:px-8 sm:py-5 border-b border-cream-200 bg-softcyan-50">
                <div className="flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-softcyan-700" />
                  <h2 className="text-lg sm:text-xl font-semibold text-stone-800">实操题</h2>
                  <span className="text-sm text-stone-500 ml-auto">{practicalQuestions.length} 道</span>
                </div>
              </div>
              <div className="divide-y divide-cream-100">
                {practicalQuestions.map((q) => {
                  const isSubmitted = submittedPracticals.has(q.id);
                  const userAnswer = userAnswers[q.id] || '';
                  const analysis = isSubmitted ? analyzeUserCode(userAnswer, q.code) : null;
                  return (
                    <div key={q.id} className="p-4 sm:p-6">
                      <h3 className="font-semibold text-stone-800 mb-3">{q.title}</h3>
                      <div className="bg-cream-50 rounded-lg p-4 mb-4">
                        <p className="text-stone-600 whitespace-pre-line">{q.description}</p>
                      </div>

                      {/* 答题区域 */}
                      {!isSubmitted ? (
                        <div className="space-y-3">
                          <textarea
                            className="w-full h-40 px-4 py-3 rounded-lg border border-cream-200 bg-white text-stone-700 resize-none focus:outline-none focus:border-softcyan-500 focus:ring-1 focus:ring-softcyan-400 transition-all"
                            placeholder="请在此输入您的作答内容（Python代码）..."
                            value={userAnswer}
                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                          />
                          <div className="flex justify-end">
                            <button
                              onClick={() => handleSubmit(q.id)}
                              className="inline-flex items-center gap-2 px-6 py-3 bg-softpink-600 text-white rounded-lg hover:bg-softpink-700 active:bg-softpink-800 transition-all font-medium text-sm shadow-sm hover:shadow-md"
                            >
                              <Send className="w-4 h-4" />
                              提交作答
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* 用户答案 */}
                          {userAnswer && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <FileCode className="w-4 h-4 text-blue-600" />
                                <span className="text-blue-700 font-semibold text-sm">您的答案</span>
                              </div>
                              <div className="bg-stone-900 rounded-lg overflow-hidden">
                                <pre className="p-4 text-sm text-stone-100 overflow-x-auto font-mono">
                                  <code>{userAnswer}</code>
                                </pre>
                              </div>
                            </div>
                          )}

                          {/* 分析结果 */}
                          {analysis && (
                            <div className="bg-softcyan-50 border border-softcyan-200 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <Lightbulb className="w-5 h-5 text-softcyan-600" />
                                <span className="text-softcyan-700 font-semibold">智能分析结果</span>
                              </div>

                              {analysis.correct.length > 0 && (
                                <div className="mb-3">
                                  <div className="flex items-center gap-1 mb-1">
                                    <ThumbsUp className="w-4 h-4 text-green-600" />
                                    <span className="text-green-700 font-medium text-sm">正确的地方</span>
                                  </div>
                                  <ul className="space-y-1 pl-5">
                                    {analysis.correct.map((item, idx) => (
                                      <li key={idx} className="text-green-600 text-sm">{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {analysis.problems.length > 0 && (
                                <div className="mb-3">
                                  <div className="flex items-center gap-1 mb-1">
                                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                                    <span className="text-amber-700 font-medium text-sm">存在的问题</span>
                                  </div>
                                  <ul className="space-y-1 pl-5">
                                    {analysis.problems.map((item, idx) => (
                                      <li key={idx} className="text-amber-600 text-sm">{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {analysis.suggestions.length > 0 && (
                                <div>
                                  <div className="flex items-center gap-1 mb-1">
                                    <Lightbulb className="w-4 h-4 text-softcyan-600" />
                                    <span className="text-softcyan-700 font-medium text-sm">修改建议</span>
                                  </div>
                                  <ul className="space-y-1 pl-5">
                                    {analysis.suggestions.map((item, idx) => (
                                      <li key={idx} className="text-softcyan-600 text-sm">{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}

                          {/* 参考答案 */}
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-green-700 font-semibold text-sm">参考答案</span>
                            </div>
                            <div className="bg-stone-900 rounded-lg overflow-hidden">
                              <pre className="p-4 text-sm text-stone-100 overflow-x-auto font-mono">
                                <code>{q.code}</code>
                              </pre>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
