import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Code2, ClipboardList, Home } from 'lucide-react'

export default function Navbar() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/courses', label: '课程', icon: BookOpen },
    { path: '/projects', label: '项目', icon: Code2 },
    { path: '/questions', label: '题库', icon: ClipboardList },
  ]

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-cream-200 sticky top-0 z-50">
      <div className="w-[1280px] mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-medium text-stone-700">
              Python数据分析平台
            </Link>
          </div>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? 'bg-cream-100 text-stone-800'
                      : 'text-stone-600 hover:bg-cream-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
