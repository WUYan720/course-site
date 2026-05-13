import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Code2, ClipboardList, Home, Menu, X } from 'lucide-react'

export default function Navbar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/knowledge', label: '知识', icon: BookOpen },
    { path: '/projects', label: '项目', icon: Code2 },
    { path: '/questions', label: '题库', icon: ClipboardList },
  ]

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md border-b border-cream-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-lg sm:text-xl font-medium text-stone-700">
                Python数据分析平台
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-2xl text-sm font-medium transition-all ${
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

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-cream-50 transition-colors"
              aria-label="菜单"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-stone-600" />
              ) : (
                <Menu className="w-6 h-6 text-stone-600" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {isMounted && (
        <>
          <div
            className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 md:hidden ${
              isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsOpen(false)}
          />
          <div
            className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transition-transform duration-300 ease-out md:hidden ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="p-6">
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl hover:bg-cream-50 transition-colors"
                  aria-label="关闭菜单"
                >
                  <X className="w-6 h-6 text-stone-600" />
                </button>
              </div>
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-medium transition-all ${
                        location.pathname === item.path
                          ? 'bg-cream-100 text-stone-800'
                          : 'text-stone-600 hover:bg-cream-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
