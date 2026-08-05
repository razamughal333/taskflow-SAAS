import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useClients from "../hooks/useClients";
import Navbar from "../components/Navbar";

const statusOptions = ["Lead", "Active", "Completed"];

function ClientDetail() {
  const { id } = useParams();
  const { clients, updateStatus, addNote } = useClients();
  const [noteText, setNoteText] = useState("");

  const client = clients.find((c) => c.id === Number(id));

  if (!client) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-xl font-semibold text-slate-800">
            Client not found
          </h1>
          <Link to="/dashboard" className="text-teal-700 hover:underline text-sm">
            ← Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    addNote(client.id, noteText);
    setNoteText("");
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 fade-in">
        <Link to="/dashboard" className="text-sm text-teal-700 hover:underline">
          ← Back to dashboard
        </Link>

        <div className="bg-white border border-stone-200 rounded-xl p-6 mt-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-slate-800">{client.name}</h1>
              <p className="text-sm text-slate-500">{client.company}</p>
            </div>

            <select
              value={client.status}
              onChange={(e) => updateStatus(client.id, e.target.value)}
              className="px-3 py-2 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <button
            disabled
            title="Coming soon — after the Axios/PDF lesson"
            className="mt-4 px-4 py-2 rounded-lg border border-stone-300 text-sm text-slate-400 cursor-not-allowed"
          >
            Export as PDF (coming soon)
          </button>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-6 mt-4">
          <h2 className="font-semibold text-slate-800 mb-3">Notes</h2>

          {client.notes.length === 0 ? (
            <p className="text-slate-400 text-sm mb-3">No notes yet.</p>
          ) : (
            <ul className="space-y-2 mb-4">
              {client.notes.map((note) => (
                <li
                  key={note.id}
                  className="text-sm text-slate-600 bg-stone-50 rounded-lg px-3 py-2"
                >
                  {note.text}
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleAddNote} className="flex flex-col sm:flex-row gap-3">
            <input
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Add a note..."
              className="flex-1 px-3 py-2 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors"
            >
              Add Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClientDetail;
