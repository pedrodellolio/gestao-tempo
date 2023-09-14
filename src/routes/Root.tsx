import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

function Root() {
  return (
    <>
      <SideBar />
      <div className="ml-60 pt-8 bg-[var(--bg-primary)]" id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default Root;
