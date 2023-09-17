import { useEffect, useState } from "react";
import PomodoroTimer from "../components/PomodoroTimer";
import { Button } from "../components/ui/button";
import {
  PlayIcon,
  PauseIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/solid";
import { usePreferences } from "../hooks/usePreferences";
import Task from "../models/Task";

const initialMinutes = 5;
const tasks: Task[] = [
  {
    title: "Trabalho POO",
    backgroundColor: "#ff75c3",
    date: new Date(),
    start: 1694991600000,
    end: 1694991600000,
  },
  {
    title: "Prova BD2",
    backgroundColor: "#ffa647",
    date: new Date(),
    start: 1694991600000,
    end: 1694991600000,
  },
  {
    title: "Consulta",
    backgroundColor: "#70e2ff",
    date: new Date(),
    start: 1694991600000,
    end: 1694991600000,
  },
];
function Pomodoro() {
  const { setIsMenuOpen } = usePreferences();

  const [isRunning, setIsRunning] = useState(false);
  const [currentMinutes, setCurrentMinutes] = useState<number>(initialMinutes);
  const [currentSeconds, setCurrentSeconds] = useState<number>(0);

  useEffect(() => {
    setIsMenuOpen(false);
  }, []);

  const resetTimer = () => {
    setCurrentMinutes(initialMinutes);
    setCurrentSeconds(0);
    setIsRunning(false);
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return `Hoje, ${date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("pt-BR", options);
  };

  return (
    <>
      {/* <div className="absolute right-0 top-0 p-6 py-3 flex flex-row gap-3">
        <Button className="hover:bg-[var(--bg-secondary)]">
          <Cog6ToothIcon
            className="text-[var(--text-secondary)]"
            width={26}
            height={26}
          />
        </Button>
        <Button className="hover:bg-[var(--bg-secondary)]">
          <TaskList tasks={tasks} />
        </Button>
      </div> */}
      <div className="flex flex-row items-center justify-center">
        <div className="w-full px-24 flex flex-col justify-center items-center gap-5 mt-6">
          <p className="font-medium text-lg text-[var(--text-secondary)]">
            Você tem
          </p>
          <PomodoroTimer
            currentMinutes={currentMinutes}
            currentSeconds={currentSeconds}
            setCurrentMinutes={setCurrentMinutes}
            setCurrentSeconds={setCurrentSeconds}
            initialMinutes={initialMinutes}
            isRunning={isRunning}
          />
          <p className="font-medium text-lg text-[var(--text-secondary)]">
            até o seu próximo descanso!
          </p>
          <div className="flex flex-row gap-3 items-baseline ml-12">
            <Button
              className="bg-[var(--accent)] rounded-full w-14 h-14 hover:bg-[var(--accent-dark)]"
              onClick={() => setIsRunning((prevState) => !prevState)}
            >
              {isRunning ? (
                <PauseIcon className="text-white" />
              ) : (
                <PlayIcon className="text-white" />
              )}
            </Button>
            <Button
              className="border-2 border-gray-600 text-gray-400 rounded-full p-3 hover:border-gray-400 hover:text-white"
              onClick={resetTimer}
            >
              <ArrowUturnLeftIcon className="w-6 h-6" />
            </Button>
          </div>
        </div>
        <div className="w-full px-24">
          <h2>Ativas</h2>
          <div className="mt-2 flex flex-col items-stretch gap-2">
            {tasks.map((t) => {
              return (
                <div className="bg-[var(--bg-secondary)] p-3 px-4 rounded-md">
                  <div className="flex flex-row h-12 gap-4">
                    <div style={{backgroundColor: t.backgroundColor}} className="h-full w-1 rounded-full"></div>
                    <div>
                      <p>{t.title}</p>
                      <small className="text-[var(--text-secondary)]">
                        {formatDate(t.date)}
                      </small>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <h2 className="mt-6">Completas</h2>
          <div className="mt-2 flex flex-col items-stretch gap-2">
            {tasks.map((t) => {
              return (
                <div className="bg-[var(--bg-secondary)] p-3 px-4 rounded-md">
                  <div className="flex flex-row h-12 gap-4">
                    <div style={{backgroundColor: t.backgroundColor}} className="h-full w-1 rounded-full"></div>
                    <div>
                      <p>{t.title}</p>
                      <small className="text-[var(--text-secondary)]">
                        {formatDate(t.date)}
                      </small>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Pomodoro;
