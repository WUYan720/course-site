import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, FileCode, BookOpen, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { questions, type ProjectQuestion, type Example, type Exercise, type ChoiceQuestion, type PracticalQuestion } from '../data/questions';

export default function ProjectQuestionList() {
  const { projectId } = useParams<{ projectId: string }>();
  const project: ProjectQuestion | undefined = questions.find((p) => p.id === Number(projectId));

  const getLevelColor = (level: string) => {
    switch (level) {
      case '基础':
        return 'bg-softcyan-100 text-softcyan-700';
      case '进阶':
        return 'bg-softpink-100 text-softpink-700';
      case 'AI融合':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (!project) {
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
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-800">项目未找到</h1>
            <p className="text-stone-600">抱歉，您访问的项目不存在或参数无效。</p>
          </div>
        </div>
      </div>
    );
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

          <div className="text-center space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-800">
              项目 {project.id}：{project.name}
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-softcyan-100 text-softcyan-700 rounded-full text-sm font-medium">
              <FileText className="w-4 h-4" />
              数据集：{project.dataFile}
            </div>
          </div>

          {/* 课堂例题 */}
          <div className="bg-white rounded-2xl shadow-sm border border-cream-200 overflow-hidden">
            <div className="px-6 py-4 sm:px-8 sm:py-5 border-b border-cream-200 bg-softcyan-50">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-softcyan-700" />
                <h2 className="text-lg sm:text-xl font-semibold text-stone-800">
                  课堂例题
                </h2>
                <span className="text-sm text-stone-500 ml-auto">{project.examples.length} 道</span>
              </div>
            </div>
            <div className="divide-y divide-cream-100">
              {project.examples.map((example) => (
                <div key={example.id} className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-softcyan-700 font-medium">例题 {example.id}</span>
                    <h3 className="font-semibold text-stone-800">{example.title}</h3>
                  </div>
                  <div className="bg-stone-900 rounded-lg overflow-hidden">
                    <pre className="p-4 text-sm text-stone-100 overflow-x-auto font-mono">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 课后练习题 */}
          <div className="bg-white rounded-2xl shadow-sm border border-cream-200 overflow-hidden">
            <div className="px-6 py-4 sm:px-8 sm:py-5 border-b border-cream-200 bg-softpink-50">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-softpink-700" />
                <h2 className="text-lg sm:text-xl font-semibold text-stone-800">
                  课后练习题
                </h2>
                <span className="text-sm text-stone-500 ml-auto">{project.exercises.length} 道</span>
              </div>
            </div>
            <div className="divide-y divide-cream-100">
              {project.exercises.map((exercise) => (
                <div key={exercise.id} className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getLevelColor(exercise.level)}`}>
                      {exercise.level}
                    </span>
                    <span className="text-xs text-stone-500">练习 {exercise.id}</span>
                    <h3 className="font-semibold text-stone-800">{exercise.title}</h3>
                  </div>
                  <div className="bg-cream-50 rounded-lg p-4">
                    <p className="text-stone-600">{exercise.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
