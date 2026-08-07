import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Login() {
  const [username, setUsername] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    login(username);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-stone-60 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border border-stone-200 rounded-2xl p-6 shadow-sm fade-in">
        <h1 className="text-xl font-bold text-slate-800 mb-1">ClientVault</h1>
        <p className="text-slate-500 text-sm mb-6">
          Sign in to manage your clients
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
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
