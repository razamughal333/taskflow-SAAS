import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold text-slate-800">404</h1>
      <p className="text-slate-500 text-sm mt-1 mb-4">Page not found</p>
      <Link to="/dashboard" className="text-teal-700 hover:underline text-sm">
        ← Back to dashboard
      </Link>
    </div>
  );
}

export default NotFound;
