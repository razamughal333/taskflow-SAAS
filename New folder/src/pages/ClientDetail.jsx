import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useClients from "../hooks/useClients";
import Navbar from "../components/Navbar";

const statusOptions = ["Lead", "Active", "Completed"];

function ClientDetail() {
  const { id } = useParams();
  const { clients, updateStatus, updateClientInfo, addNote, updateNote, deleteNote } =
    useClients();
  const [noteText, setNoteText] = useState("");

  // editing client info
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [editName, setEditName] = useState("");
  const [editCompany, setEditCompany] = useState("");

  // editing a single note
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteText, setEditingNoteText] = useState("");

  const client = clients.find((c) => c.id === Number(id));

  if (!client) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-slate-900 transition-colors duration-300">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-xl font-semibold text-slate-800 dark:text-white">
            Client not found
          </h1>
          <Link to="/dashboard" className="text-teal-700 dark:text-teal-400 hover:underline text-sm">
            ← Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const startEditingInfo = () => {
    setEditName(client.name);
    setEditCompany(client.company);
    setIsEditingInfo(true);
  };

  const handleSaveInfo = (e) => {
    e.preventDefault();
    if (!editName.trim()) return;
    updateClientInfo(client.id, editName, editCompany);
    setIsEditingInfo(false);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    addNote(client.id, noteText);
    setNoteText("");
  };

  const startEditingNote = (note) => {
    setEditingNoteId(note.id);
    setEditingNoteText(note.text);
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!editingNoteText.trim()) return;
    updateNote(client.id, editingNoteId, editingNoteText);
    setEditingNoteId(null);
  };

  const inputClasses =
    "px-3 py-2 rounded-lg border border-stone-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500";

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 fade-in">
        <Link to="/dashboard" className="text-sm text-teal-700 dark:text-teal-400 hover:underline">
          ← Back to dashboard
        </Link>

        <div className="bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl p-6 mt-4">
          {isEditingInfo ? (
            <form
              onSubmit={handleSaveInfo}
              className="flex flex-col sm:flex-row sm:items-center gap-3"
            >
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Client name"
                className={`flex-1 ${inputClasses}`}
              />
              <input
                value={editCompany}
                onChange={(e) => setEditCompany(e.target.value)}
                placeholder="Company"
                className={`flex-1 ${inputClasses}`}
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-3 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingInfo(false)}
                  className="px-3 py-2 rounded-lg border border-stone-300 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-slate-800 dark:text-white">{client.name}</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">{client.company}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={startEditingInfo}
                  className="text-sm text-teal-700 dark:text-teal-400 font-medium hover:underline"
                >
                  Edit
                </button>

                <select
                  value={client.status}
                  onChange={(e) => updateStatus(client.id, e.target.value)}
                  className={inputClasses}
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <button
            disabled
            title="Coming soon — after the Axios/PDF lesson"
            className="mt-4 px-4 py-2 rounded-lg border border-stone-300 dark:border-slate-600 text-sm text-slate-400 dark:text-slate-500 cursor-not-allowed"
          >
            Export as PDF (coming soon)
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl p-6 mt-4">
          <h2 className="font-semibold text-slate-800 dark:text-white mb-3">Notes</h2>

          {client.notes.length === 0 ? (
            <p className="text-slate-400 dark:text-slate-500 text-sm mb-3">No notes yet.</p>
          ) : (
            <ul className="space-y-2 mb-4">
              {client.notes.map((note) =>
                editingNoteId === note.id ? (
                  <li key={note.id}>
                    <form
                      onSubmit={handleSaveNote}
                      className="flex flex-col sm:flex-row gap-2"
                    >
                      <input
                        value={editingNoteText}
                        onChange={(e) => setEditingNoteText(e.target.value)}
                        className={`flex-1 ${inputClasses}`}
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-3 py-1.5 rounded-lg bg-teal-600 text-white text-sm hover:bg-teal-700 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingNoteId(null)}
                          className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </li>
                ) : (
                  <li
                    key={note.id}
                    className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300 bg-stone-50 dark:bg-slate-700 rounded-lg px-3 py-2"
                  >
                    <span>{note.text}</span>
                    <div className="flex gap-3 shrink-0 ml-3">
                      <button
                        onClick={() => startEditingNote(note)}
                        className="text-teal-700 dark:text-teal-400 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteNote(client.id, note.id)}
                        className="text-slate-400 dark:text-slate-500 hover:text-red-500 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                )
              )}
            </ul>
          )}

          <form onSubmit={handleAddNote} className="flex flex-col sm:flex-row gap-3">
            <input
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Add a note..."
              className={`flex-1 ${inputClasses}`}
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
