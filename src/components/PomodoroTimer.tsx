import { useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface ChangingProgressProviderProps {
  currentMinutes: number;
  currentSeconds: number;
  setCurrentMinutes: React.Dispatch<React.SetStateAction<number>>;
  setCurrentSeconds: React.Dispatch<React.SetStateAction<number>>;
  interval?: number;
  initialMinutes: number;
  isRunning: boolean;
}

function PomodoroTimer({
  currentMinutes,
  currentSeconds,
  setCurrentMinutes,
  setCurrentSeconds,
  interval = 1000,
  initialMinutes,
  isRunning,
}: ChangingProgressProviderProps) {
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        if (currentSeconds === 0) {
          if (currentMinutes === 0) {
            clearInterval(intervalId!);
          } else {
            setCurrentMinutes((prevMinutes) => prevMinutes - 1);
            setCurrentSeconds(59);
          }
        } else {
          setCurrentSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, interval);
    } else {
      clearInterval(intervalId!);
    }

    return () => {
      clearInterval(intervalId!);
    };
  }, [interval, currentMinutes, currentSeconds, isRunning]);

  const totalSeconds = initialMinutes * 60;
  const remainingSeconds = currentMinutes * 60 + currentSeconds;
  const percentage = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;

  return (
    <div className="w-[25%] m-0">
      <CircularProgressbar
        value={percentage}
        strokeWidth={3}
        text={`${currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}:${
          currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds
        }`}
        styles={buildStyles({
          textColor: "white",
          pathColor: "var(--accent)",
          trailColor: "var(--border)",
        })}
      />
    </div>
  );
}

export default PomodoroTimer;
