import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { usePreferences } from "../hooks/usePreferences";
import { useAuth } from "../hooks/useAuth";
import Login from "./Login";

function PrivateRoot() {
  const { user } = useAuth();

  const { isMenuOpen } = usePreferences();

  return (
    <div>
      {user ? (
        <>
          <SideBar user={user}/>
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
