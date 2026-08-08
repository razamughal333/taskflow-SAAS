import { createContext, useState, useEffect } from "react";
import { initialClients } from "../data/clients";

export const ClientsContext = createContext();

export function ClientsProvider({ children }) {
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem("clients");
    return saved ? JSON.parse(saved) : initialClients;
  });

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  const addClient = (name, company) => {
    const newClient = {
      id: Date.now(),
      name,
      company,
      status: "Lead",
      notes: [],
    };
    setClients([...clients, newClient]);
  };

  const updateStatus = (clientId, newStatus) => {
    setClients(
      clients.map((client) =>
        client.id === clientId ? { ...client, status: newStatus } : client
      )
    );
  };

  const updateClientInfo = (clientId, name, company) => {
    setClients(
      clients.map((client) =>
        client.id === clientId ? { ...client, name, company } : client
      )
    );
  };

  const updateNote = (clientId, noteId, newText) => {
    setClients(
      clients.map((client) =>
        client.id === clientId
          ? {
              ...client,
              notes: client.notes.map((note) =>
                note.id === noteId ? { ...note, text: newText } : note
              ),
            }
          : client
      )
    );
  };

  const deleteNote = (clientId, noteId) => {
    setClients(
      clients.map((client) =>
        client.id === clientId
          ? { ...client, notes: client.notes.filter((note) => note.id !== noteId) }
          : client
      )
    );
  };

  const removeClient = (clientId) => {
    setClients(clients.filter((client) => client.id !== clientId));
  };

  const addNote = (clientId, text) => {
    setClients(
      clients.map((client) =>
        client.id === clientId
          ? {
              ...client,
              notes: [...client.notes, { id: Date.now(), text }],
            }
          : client
      )
    );
  };

  return (
    <ClientsContext.Provider
      value={{
        clients,
        addClient,
        updateStatus,
        updateClientInfo,
        addNote,
        updateNote,
        deleteNote,
        removeClient,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
}
