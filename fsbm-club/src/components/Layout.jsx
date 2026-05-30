import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Simple Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-100 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Club Manager</h1>
          <div className="space-x-4">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>
            <Link to="/events" className="text-gray-600 hover:text-blue-600 font-medium">Events</Link>
          </div>
        </div>
      </nav>

      {/* Dynamic Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Global Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 p-4 text-center text-sm text-gray-500">
        © 2026 FSBM Club Platform. All rights reserved.
      </footer>
    </div>
  );
}