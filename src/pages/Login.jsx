import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";

function Login() {
  const [username, setUsername] = useState("");
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    login(username);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-900 flex items-center justify-center px-4 transition-colors duration-300">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 px-3 py-1.5 rounded-lg border border-stone-300 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>

      <div className="w-full max-w-sm bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm fade-in transition-colors duration-300">
        <h1 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
          ClientVault
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
          Sign in to manage your clients
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            className="w-full px-4 py-2.5 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
