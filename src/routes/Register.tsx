import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { usePreferences } from "../hooks/usePreferences";

function Root() {
  const { isMenuOpen } = usePreferences();

  return (
    <>
      <SideBar />
      <div
        className={`${
          isMenuOpen ? "ml-60" : "ml-24"
        } pt-8 bg-[var(--bg-primary)]" id="detail`}
      >
        <Outlet />
      </div>
    </>
  );
}

export default Root;
