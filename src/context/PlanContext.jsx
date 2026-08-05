import { createContext, useState, useEffect } from "react";

export const PlanContext = createContext();

const FREE_CLIENT_LIMIT = 3;

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState(() => {
    const saved = localStorage.getItem("plan");
    return saved ? saved : "free";
  });

  useEffect(() => {
    localStorage.setItem("plan", plan);
  }, [plan]);

  const upgradeToPro = () => {
    setPlan("pro");
  };

  return (
    <PlanContext.Provider value={{ plan, upgradeToPro, freeLimit: FREE_CLIENT_LIMIT }}>
      {children}
    </PlanContext.Provider>
  );
}
