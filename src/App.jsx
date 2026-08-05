import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PlanProvider } from "./context/PlanContext";
import { ClientsProvider } from "./context/ClientsContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ClientDetail from "./pages/ClientDetail";
import Upgrade from "./pages/Upgrade";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <PlanProvider>
        <ClientsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/client/:id"
                element={
                  <ProtectedRoute>
                    <ClientDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/upgrade"
                element={
                  <ProtectedRoute>
                    <Upgrade />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ClientsProvider>
      </PlanProvider>
    </AuthProvider>
  );
}

export default App;
