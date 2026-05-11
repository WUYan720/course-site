import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Courses() {
  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <div className="w-[1280px] mx-auto px-8">
        <div className="space-y-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-stone-600 hover:text-softpink-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          
          <div className="space-y-6">
            <div className="h-16 bg-cream-100 rounded-3xl"></div>
            
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-32 bg-cream-100 rounded-3xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
