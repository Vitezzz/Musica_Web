import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // 1. Esperar: Si todavía está cargando (verificando cookie), no hacemos nada
  if (loading) return <h1>Cargando...</h1>;

  // 2. Verificar: Si terminó de cargar y NO está autenticado -> Al Login
  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;

  // 3. Permitir: Si todo está bien -> Muestra el contenido interno (Outlet)
  return <Outlet />;
};