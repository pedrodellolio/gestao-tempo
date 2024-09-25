import { useAuth } from "@/hooks/use-auth";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

function AuthRoot() {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <Navigate to="/" replace={true} />
      ) : (
        <>
          <h1 className="flex justify-center p-5 font-semibold">TareFAST</h1>
          <div>
            <Outlet />
          </div>
          <footer className="text-sm text-muted-foreground flex justify-center absolute bottom-0 left-0 right-0 p-5">
            Projeto de extensão - TareFAST
          </footer>
        </>
      )}
    </>
  );
}

export default AuthRoot;
