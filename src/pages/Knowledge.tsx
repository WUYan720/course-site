import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Knowledge() {
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

          <div className="space-y-4 sm:space-y-6">
            <div className="h-14 sm:h-16 bg-cream-100 rounded-2xl sm:rounded-3xl"></div>

            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-28 sm:h-32 bg-cream-100 rounded-2xl sm:rounded-3xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
