import { useState } from "react";
import PomodoroTimer from "../components/PomodoroTimer";
import { Button } from "../components/ui/button";
import {
  PlayIcon,
  PauseIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/solid";

const initialMinutes = 5;
function Pomodoro() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentMinutes, setCurrentMinutes] = useState<number>(initialMinutes);
  const [currentSeconds, setCurrentSeconds] = useState<number>(0);

  const resetTimer = () => {
    setCurrentMinutes(initialMinutes);
    setCurrentSeconds(0);
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 mt-14">
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
      <div className="flex flex-row gap-3 items-baseline ml-14">
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
  );
}

export default Pomodoro;
