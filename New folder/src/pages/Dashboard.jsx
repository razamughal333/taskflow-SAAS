import { useState, useRef, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import useClients from "../hooks/useClients";
import usePlan from "../hooks/usePlan";
import Navbar from "../components/Navbar";
import ClientCard from "../components/ClientCard";

function Dashboard() {
  const { clients, addClient, removeClient } = useClients();
  const { plan, freeLimit } = usePlan();

  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const nameInputRef = useRef(null);

  const atLimit = plan === "free" && clients.length >= freeLimit;

  // only re-filter when clients or search actually change
  const filteredClients = useMemo(() => {
    return clients.filter((client) =>
      client.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [clients, search]);

  // stable function reference so ClientCard (memoized) doesn't re-render unnecessarily
  const handleRemove = useCallback(
    (id) => removeClient(id),
    [removeClient]
  );

  const handleAddClient = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addClient(name, company);
    setName("");
    setCompany("");
    nameInputRef.current.focus();
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Clients</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {clients.length}
              {plan === "free" ? ` / ${freeLimit}` : ""} clients
            </p>
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clients..."
            className="w-full sm:w-64 px-3 py-2 rounded-lg border border-stone-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {atLimit ? (
          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl p-5 mb-6">
            <p className="text-amber-800 dark:text-amber-300 font-medium">
              You've reached your free plan limit of {freeLimit} clients.
            </p>
            <Link
              to="/upgrade"
              className="inline-block mt-2 text-sm font-semibold text-teal-700 hover:underline"
            >
              Upgrade to Pro for unlimited clients →
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleAddClient}
            className="bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-3"
          >
            <input
              ref={nameInputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Client name"
              className="flex-1 px-3 py-2 rounded-lg border border-stone-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company"
              className="flex-1 px-3 py-2 rounded-lg border border-stone-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors"
            >
              Add Client
            </button>
          </form>
        )}

        {filteredClients.length === 0 ? (
          <p className="text-slate-400 dark:text-slate-500 text-sm">No clients found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClients.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
