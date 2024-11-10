import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-light">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-6">
          <div className="text-2xl font-bold text-primary">Jobber</div>
          <div className="space-x-4">
            <Link 
              href="/login" 
              className="text-secondary hover:text-primary transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </nav>

        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h1 className="text-5xl font-bold text-secondary mb-6">
            Run a better home service business
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            The all-in-one software that helps home service businesses quote, schedule, invoice, and get paid—faster.
          </p>
          <Link 
            href="/register" 
            className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Try Jobber Free
          </Link>
        </div>
      </div>
    </main>
  )
}