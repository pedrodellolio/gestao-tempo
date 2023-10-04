import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

function AuthRoot() {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <Navigate to="/" replace={true} />
      ) : (
        <>
          <h1 className="flex justify-center p-5 font-semibold">
            Gestão do Tempo
          </h1>
          <div>
            <Outlet />
          </div>
          <footer className="text-sm text-[var(--text-secondary)] flex justify-center absolute bottom-0 left-0 right-0 p-5">
            Projeto de extensão - Gestão do Tempo
          </footer>
        </>
      )}
    </>
  );
}

export default AuthRoot;
