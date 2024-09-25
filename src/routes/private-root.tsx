import SideBar from "@/components/side-bar";
import { useAuth } from "@/hooks/use-auth";
import { usePreferences } from "@/hooks/use-preferences";
import { Outlet } from "react-router-dom";
import Login from "./auth/login";

function PrivateRoot() {
  const { user } = useAuth();
  const { isMenuOpen } = usePreferences();

  return (
    <div>
      {user ? (
        <>
          <SideBar user={user} />
          <div
            className={`${
              isMenuOpen ? "ml-60" : "ml-24"
            } pt-8 bg-[var(--bg-primary)]" id="detail`}
          >
            <Outlet />
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default PrivateRoot;
