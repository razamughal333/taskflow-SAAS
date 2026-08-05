import { memo } from "react";
import { Link } from "react-router-dom";

const statusBorderColor = {
  Lead: "border-l-amber-400",
  Active: "border-l-teal-500",
  Completed: "border-l-slate-400",
};

const ClientCard = memo(function ClientCard({ client, onRemove }) {
  console.log("Rendering card:", client.name);

  return (
    <div
      className={`relative bg-white border border-stone-200 border-l-4 ${
        statusBorderColor[client.status] || "border-l-stone-300"
      } rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
    >
      <button
        onClick={() => onRemove(client.id)}
        aria-label="Remove client"
        className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition-colors"
      >
        ✕
      </button>

      <Link to={`/client/${client.id}`} className="block pr-6">
        <h3 className="font-semibold text-slate-800">{client.name}</h3>
        <p className="text-sm text-slate-500">{client.company}</p>
        <span className="inline-block mt-2 text-xs font-medium text-slate-500">
          {client.status}
        </span>
      </Link>
    </div>
  );
});

export default ClientCard;
