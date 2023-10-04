import { Link, useLocation } from "react-router-dom";
import {
  CalendarIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { usePreferences } from "../hooks/usePreferences";
import { User } from "firebase/auth";

interface Props {
  user: User;
}

function SideBar(props: Props) {
  const location = useLocation();
  const { isMenuOpen } = usePreferences();

  const fullName = props.user.displayName;
  let formattedName = "";
  if (fullName) {
    const nameParts = fullName.split(" ");
    const firstName =
      nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1);
    const lastName =
      nameParts[nameParts.length - 1].charAt(0).toUpperCase() +
      nameParts[nameParts.length - 1].slice(1);
    formattedName = `${firstName} ${lastName}`;
  }

  return (
    <>
      <aside
        className={`${
          isMenuOpen ? "w-60" : "w-24"
        } fixed h-full p-6 bg-[var(--bg-primary)] border-r border-[var(--border)]`}
      >
        <div
          className={`flex flex-row items-center ${
            !isMenuOpen && "justify-center"
          } gap-3 rounded-md hover:bg-[var(--bg-dark)] cursor-pointer`}
        >
          {props.user.photoURL ? (
            <img
              className="w-10 h-10 rounded-md"
              src={props.user.photoURL}
              alt=""
            />
          ) : (
            <div className="w-10 h-10 rounded-md bg-violet-800 flex justify-center items-center text-xl">
              {fullName?.slice(0, 1).toUpperCase()}
            </div>
          )}
          {isMenuOpen && (
            <div className="flex flex-col">
              <p>{formattedName}</p>
              <small className="text-gray-500 font-medium">Ranking 100</small>
            </div>
          )}
        </div>
        <nav className="mt-10 flex flex-col gap-4">
          {isMenuOpen && (
            <small className="font-medium mb-2 text-zinc-500 uppercase text-xs">
              Principal
            </small>
          )}

          <Link
            to="/"
            className={`flex flex-row items-center gap-3 text-[var(--text-secondary)] rounded-md font-medium p-3 py-2 hover:text-white ${
              location.pathname === "/" &&
              "bg-[var(--bg-secondary)] text-white font-medium"
            }`}
          >
            <CalendarIcon
              width={isMenuOpen ? 20 : 22}
              height={isMenuOpen ? 20 : 22}
            />
            {isMenuOpen && "Início"}
          </Link>
          <Link
            to="pomodoro"
            className={`flex flex-row items-center gap-3 text-[var(--text-secondary)] rounded-md font-normal p-3 py-2 hover:text-white ${
              location.pathname === "/pomodoro" &&
              "bg-[var(--bg-secondary)] text-white font-medium"
            }`}
          >
            <ClockIcon
              width={isMenuOpen ? 20 : 22}
              height={isMenuOpen ? 20 : 22}
            />
            {isMenuOpen && "Pomodoro"}
          </Link>
          <Link
            to="progresso"
            className={`flex flex-row items-center gap-3 text-[var(--text-secondary)] rounded-md font-normal p-3 py-2 hover:text-white ${
              location.pathname === "/progresso" &&
              "bg-[var(--bg-secondary)] text-white font-medium"
            }`}
          >
            <ArrowTrendingUpIcon
              width={isMenuOpen ? 20 : 22}
              height={isMenuOpen ? 20 : 22}
            />
            {isMenuOpen && "Meu Progresso"}
          </Link>
        </nav>
      </aside>
    </>
  );
}

export default SideBar;
