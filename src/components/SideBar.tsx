import { Link, useLocation } from "react-router-dom";
import {
  CalendarIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
function SideBar() {
  const location = useLocation();
  return (
    <>
      <aside className="w-60 fixed h-full p-6 bg-[var(--bg-primary)] border-r border-[var(--border)]">
        <div className="flex flex-row items-center gap-3 p-2 rounded-md hover:bg-[var(--bg-dark)] cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-zinc-700"></div>
          <div className="flex flex-col">
            <p>Pedro</p>
            <small className="text-gray-500 font-semibold">Ranking 100</small>
          </div>
        </div>
        <nav className="mt-10 flex flex-col gap-2">
          <small className="font-semibold mb-2 text-zinc-500 uppercase text-xs">
            Principal
          </small>

          <Link
            to="/"
            className={`flex flex-row items-center gap-3 text-zinc-300 rounded-md font-medium p-3 hover:bg-[var(--bg-secondary)] ${
              location.pathname === "/" &&
              "bg-[var(--bg-secondary)] text-white font-semibold"
            }`}
          >
            <CalendarIcon width={20} height={20} />
            Início
          </Link>
          <Link
            to="pomodoro"
            className={`flex flex-row items-center gap-3 text-zinc-300 rounded-md font-medium p-3 hover:bg-[var(--bg-secondary)] ${
              location.pathname === "/pomodoro" &&
              "bg-[var(--bg-secondary)] text-white font-semibold"
            }`}
          >
            <ClockIcon width={20} height={20} />
            Pomodoro
          </Link>
          <Link
            to="progresso"
            className={`flex flex-row items-center gap-3 text-zinc-300 rounded-md font-medium p-3 hover:bg-[var(--bg-secondary)] ${
              location.pathname === "/progresso" &&
              "bg-[var(--bg-secondary)] text-white font-semibold"
            }`}
          >
            <ArrowTrendingUpIcon width={20} height={20} />
            Meu Progresso
          </Link>
        </nav>
      </aside>
    </>
  );
}

export default SideBar;
