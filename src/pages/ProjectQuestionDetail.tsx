import { useParams, Link } from 'react-router-dom';
import { BookOpen, FileCode, ArrowLeft } from 'lucide-react';
import { questions, type Example, type Exercise, type ProjectQuestion } from '../data/questions';

export default function ProjectQuestionDetail() {
  const { projectId, questionType, questionId } = useParams<{
    projectId: string;
    questionType: string;
    questionId: string;
  }>();

  const project: ProjectQuestion | undefined = questions.find(
    (p) => p.id === Number(projectId)
  );

  let example: Example | undefined;
  let exercise: Exercise | undefined;
  let isValid = false;

  if (project) {
    if (questionType === 'example') {
      example = project.examples.find((e) => e.id === questionId);
      isValid = !!example;
    } else if (questionType === 'exercise') {
      exercise = project.exercises.find((e) => e.id === questionId);
      isValid = !!exercise;
    }
  }

  if (!isValid) {
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
          <div className="text-center mt-12 space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-800">
              题目未找到
            </h1>
            <p className="text-stone-600">
              抱歉，您访问的题目不存在或参数无效。
            </p>
            <Link
              to="/questions"
              className="inline-flex items-center gap-2 px-4 py-2 bg-softpink-600 text-white rounded-lg hover:bg-softpink-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              返回题库列表
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

  const isExample = questionType === 'example';

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
                {isExample ? (
                  <FileCode className="w-6 h-6 sm:w-7 sm:h-7 text-softpink-700" />
                ) : (
                  <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-softpink-700" />
                )}
              </div>
            </div>
            <div className="text-stone-500 text-sm sm:text-base">
              项目 {project.id}：{project.name}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-800">
              {isExample ? example?.title : exercise?.title}
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-softcyan-100 text-softcyan-700 rounded-full text-sm font-medium">
              {isExample ? (
                <>
                  <FileCode className="w-4 h-4" />
                  课堂例题
                </>
              ) : (
                <>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getLevelColor(exercise!.level)}`}>
                    {exercise!.level}
                  </span>
                  课后练习题
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-cream-200 overflow-hidden">
            <div className="px-6 py-5 sm:px-8 sm:py-6">
              {isExample ? (
                <div className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-stone-800">
                    代码实现
                  </h2>
                  <div className="rounded-lg overflow-hidden border border-stone-700">
                    <pre className="bg-stone-900 p-4 sm:p-6 overflow-x-auto">
                      <code className="text-stone-100 text-sm font-mono whitespace-pre">
                        {example!.code}
                      </code>
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(exercise!.level)}`}>
                      {exercise!.level}
                    </span>
                    <h2 className="text-lg sm:text-xl font-semibold text-stone-800">
                      题目描述
                    </h2>
                  </div>
                  <div className="bg-cream-50 p-4 rounded-lg">
                    <p className="text-stone-600 leading-relaxed whitespace-pre-line">
                      {exercise!.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
