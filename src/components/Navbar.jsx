import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import usePlan from "../hooks/usePlan";

function Navbar() {
  const { user, logout } = useAuth();
  const { plan } = usePlan();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-stone-200 px-4 py-3 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Link to="/dashboard" className="text-lg font-bold text-teal-700">
          ClientVault
        </Link>

        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm text-slate-600">
            {user?.username}
          </span>

          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              plan === "pro"
                ? "bg-teal-100 text-teal-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {plan === "pro" ? "Pro plan" : "Free plan"}
          </span>

          {plan !== "pro" && (
            <Link
              to="/upgrade"
              className="text-sm text-teal-700 font-medium hover:underline"
            >
              Upgrade
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1.5 rounded-lg border border-stone-300 text-slate-600 hover:bg-stone-100 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
