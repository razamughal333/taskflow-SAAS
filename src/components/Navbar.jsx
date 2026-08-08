import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import usePlan from "../hooks/usePlan";
import useTheme from "../hooks/useTheme";

function Navbar() {
  const { user, logout } = useAuth();
  const { plan } = usePlan();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-slate-800 border-b border-stone-200 dark:border-slate-700 px-4 py-3 sm:px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Link to="/dashboard" className="text-lg font-bold text-teal-700 dark:text-teal-400">
          ClientVault
        </Link>

        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm text-slate-600 dark:text-slate-300">
            {user?.username}
          </span>

          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              plan === "pro"
                ? "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300"
                : "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
            }`}
          >
            {plan === "pro" ? "Pro plan" : "Free plan"}
          </span>

          {plan !== "pro" && (
            <Link
              to="/upgrade"
              className="text-sm text-teal-700 dark:text-teal-400 font-medium hover:underline"
            >
              Upgrade
            </Link>
          )}

          <button
            onClick={toggleTheme}
            className="text-sm px-3 py-1.5 rounded-lg border border-stone-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-700 transition-colors"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1.5 rounded-lg border border-stone-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
