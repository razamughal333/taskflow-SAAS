import { useNavigate } from "react-router-dom";
import usePlan from "../hooks/usePlan";
import Navbar from "../components/Navbar";

function Upgrade() {
  const { plan, upgradeToPro } = usePlan();
  const navigate = useNavigate();

  const handleUpgrade = () => {
    upgradeToPro();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar />

      <div className="max-w-md mx-auto px-4 py-12 sm:px-6 fade-in">
        <div className="bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-2xl p-6 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
            Upgrade to Pro
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
            Unlimited clients, no limits on growth.
          </p>

          <p className="text-3xl font-bold text-teal-700 dark:text-teal-400 mb-1">
            $12<span className="text-base font-normal text-slate-400 dark:text-slate-500">/mo</span>
          </p>

          <ul className="text-sm text-slate-600 dark:text-slate-300 text-left mt-6 space-y-2">
            <li>✓ Unlimited clients</li>
            <li>✓ Unlimited notes per client</li>
            <li>✓ PDF export (coming soon)</li>
          </ul>

          {plan === "pro" ? (
            <p className="mt-6 text-teal-700 dark:text-teal-400 font-medium">
              You're already on the Pro plan 🎉
            </p>
          ) : (
            <button
              onClick={handleUpgrade}
              className="w-full mt-6 px-4 py-2.5 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 hover:scale-[1.02] transition-all duration-200"
            >
              Upgrade to Pro
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
