import { Sparkles, Code, FileText, FolderKanban, Users, Zap, Shield, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-cream-50">
      <div className="w-[1280px] mx-auto px-8 py-16">
        <div className="space-y-20">
          {/* 顶部大标题和副标题 */}
          <section className="text-center space-y-6">
            <div className="inline-block bg-softpink-100 text-softpink-800 px-4 py-2 rounded-full text-sm font-medium">
              Python 商务数据分析
            </div>
            <h1 className="text-5xl font-bold text-stone-800 leading-tight">
              Python商务数据分析学习平台
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              从零开始学习 Python 数据分析，掌握商务场景的数据处理技能，提升职场竞争力
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <div className="px-6 py-3 bg-cream-100 rounded-3xl text-stone-700 font-medium">
                在线学习
              </div>
              <div className="px-6 py-3 bg-softcyan-100 rounded-3xl text-stone-700 font-medium">
                实战练习
              </div>
            </div>
          </section>

          {/* 核心功能板块介绍 */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-stone-800 mb-4">
                核心功能
              </h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                我们提供四个核心功能模块，全方位支持您的数据分析学习之旅
              </p>
            </div>
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white rounded-4xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-cream-200">
                <div className="w-14 h-14 bg-softpink-100 rounded-3xl flex items-center justify-center mb-4">
                  <Sparkles className="w-7 h-7 text-softpink-700" />
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-2">
                  AI 陪练
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  智能 AI 助您解决学习疑问，提供个性化指导和学习建议
                </p>
              </div>
              <div className="bg-white rounded-4xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-cream-200">
                <div className="w-14 h-14 bg-softcyan-100 rounded-3xl flex items-center justify-center mb-4">
                  <Code className="w-7 h-7 text-softcyan-700" />
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-2">
                  在线代码编辑器
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  内置代码编辑器，直接在浏览器中编写和运行 Python 代码
                </p>
              </div>
              <div className="bg-white rounded-4xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-cream-200">
                <div className="w-14 h-14 bg-cream-100 rounded-3xl flex items-center justify-center mb-4">
                  <FileText className="w-7 h-7 text-stone-700" />
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-2">
                  CSV数据分析练习
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  丰富的 CSV 数据集，从基础到高级的数据分析实战练习
                </p>
              </div>
              <div className="bg-white rounded-4xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-cream-200">
                <div className="w-14 h-14 bg-softpink-100 rounded-3xl flex items-center justify-center mb-4">
                  <FolderKanban className="w-7 h-7 text-softpink-700" />
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-2">
                  项目实战题库
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  真实商务场景项目，锻炼实际数据分析能力
                </p>
              </div>
            </div>
          </section>

          {/* 平台优势模块 */}
          <section className="bg-gradient-to-br from-softcyan-50 to-cream-50 rounded-4xl p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-stone-800 mb-4">
                平台优势
              </h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                选择我们，让学习更高效、更愉快
              </p>
            </div>
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white rounded-4xl p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-cream-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-stone-700" />
                </div>
                <h4 className="text-lg font-bold text-stone-800 mb-2">
                  随时随地学习
                </h4>
                <p className="text-stone-600 text-sm">
                  支持电脑和手机端，随时随地都能学习
                </p>
              </div>
              <div className="bg-white rounded-4xl p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-softpink-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-softpink-700" />
                </div>
                <h4 className="text-lg font-bold text-stone-800 mb-2">
                  实践与理论结合
                </h4>
                <p className="text-stone-600 text-sm">
                  边学边练，实战项目巩固知识
                </p>
              </div>
              <div className="bg-white rounded-4xl p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-softcyan-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-softcyan-700" />
                </div>
                <h4 className="text-lg font-bold text-stone-800 mb-2">
                  AI 智能辅助
                </h4>
                <p className="text-stone-600 text-sm">
                  智能 AI 解答疑问，提供个性化指导
                </p>
              </div>
              <div className="bg-white rounded-4xl p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-cream-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <FolderKanban className="w-8 h-8 text-stone-700" />
                </div>
                <h4 className="text-lg font-bold text-stone-800 mb-2">
                  真实商务场景
                </h4>
                <p className="text-stone-600 text-sm">
                  基于真实商务数据，学习即实战
                </p>
              </div>
            </div>
          </section>

          {/* 底部引导区域 */}
          <section className="text-center space-y-6 pb-12">
            <h2 className="text-3xl font-bold text-stone-800">
              开始您的数据分析学习之旅
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              探索我们的课程、项目和题库，从零成为数据分析高手
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/courses" className="px-8 py-4 bg-softpink-100 text-softpink-800 rounded-3xl font-medium cursor-pointer hover:bg-softpink-200 transition-colors">
                浏览课程
              </Link>
              <Link to="/projects" className="px-8 py-4 bg-white border border-cream-200 text-stone-700 rounded-3xl font-medium cursor-pointer hover:bg-cream-50 transition-colors">
                查看项目
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
