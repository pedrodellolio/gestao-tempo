import { useEffect, useState } from "react";
import Task from "../models/task";
import { usePreferences } from "@/hooks/use-preferences";
import PomodoroTimer from "@/components/pomodoro-timer";
import { Button } from "@/components/ui/button";
import { Pause, Play, TimerReset } from "lucide-react";
import { fetchTodayTasks } from "@/api/tasks";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";

const initialMinutes = 5;
// const tasks: Task[] = [
//   {
//     title: "Trabalho POO",
//     hexColor: "#ff75c3",
//     dueDate: new Date(),
//     startTimeInMs: 1694991600000,
//     endTimeInMs: 1694991600000,
//   },
//   {
//     title: "Prova BD2",
//     hexColor: "#ffa647",
//     dueDate: new Date(),
//     startTimeInMs: 1694991600000,
//     endTimeInMs: 1694991600000,
//   },
//   {
//     title: "Consulta",
//     hexColor: "#70e2ff",
//     dueDate: new Date(),
//     startTimeInMs: 1694991600000,
//     endTimeInMs: 1694991600000,
//   },
// ];
function Pomodoro() {
  const { setIsMenuOpen } = usePreferences();
  const { user } = useAuth();
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks", user?.uid],
    queryFn: () => fetchTodayTasks(user?.uid),
  });

  const [isRunning, setIsRunning] = useState(false);
  const [currentMinutes, setCurrentMinutes] = useState<number>(initialMinutes);
  const [currentSeconds, setCurrentSeconds] = useState<number>(0);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [activeTasks, setActiveTasks] = useState<Task[]>(tasks || []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, []);

  const resetTimer = () => {
    setCurrentMinutes(initialMinutes);
    setCurrentSeconds(0);
    setIsRunning(false);
  };

  const completeTask = (task: Task) => {
    setActiveTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    setCompletedTasks((prevCompletedTasks) => [...prevCompletedTasks, task]);
  };

  const revertTask = (task: Task) => {
    setCompletedTasks((prevCompletedTasks) =>
      prevCompletedTasks.filter((t) => t.id !== task.id)
    );
    setActiveTasks((prevActiveTasks) => [...prevActiveTasks, task]);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <div className="w-full px-24 flex flex-col justify-center items-center gap-5 mt-6">
          <p className="font-medium text-lg text-muted-foreground">Você tem</p>
          <PomodoroTimer
            currentMinutes={currentMinutes}
            currentSeconds={currentSeconds}
            setCurrentMinutes={setCurrentMinutes}
            setCurrentSeconds={setCurrentSeconds}
            initialMinutes={initialMinutes}
            isRunning={isRunning}
          />
          <p className="font-medium text-lg text-muted-foreground">
            até o seu próximo descanso!
          </p>
          <div className="flex flex-row gap-3 items-baseline ml-12">
            <Button
              className="rounded-full w-14 h-14"
              size={"icon"}
              onClick={() => setIsRunning((prevState) => !prevState)}
            >
              {isRunning ? <Pause /> : <Play />}
            </Button>
            <Button
              variant={"outline"}
              size={"icon"}
              className="rounded-full h-12 w-12"
              onClick={resetTimer}
            >
              <TimerReset />
            </Button>
          </div>
        </div>
        <div className="w-full px-24">
          <h2>Ativas</h2>
          <div className="mt-2 flex flex-col items-stretch gap-2">
            {isLoading && <p>Carregando...</p>}
            {activeTasks.length > 0 ? (
              activeTasks?.map((t) => (
                <TaskCard
                  key={t.id}
                  task={t}
                  completeTask={completeTask}
                  isCompleted={false}
                />
              ))
            ) : (
              <p className="text-muted-foreground/80">
                Você não possui tarefas ativas!
              </p>
            )}
          </div>

          <h2 className="mt-6">Completas</h2>
          <div className="mt-2 flex flex-col items-stretch gap-2">
            {completedTasks.length > 0 ? (
              completedTasks.map((t) => (
                <TaskCard
                  key={t.id}
                  task={t}
                  completeTask={completeTask}
                  revertTask={revertTask}
                  isCompleted={true}
                />
              ))
            ) : (
              <p className="text-muted-foreground/80">
                Você não completou nenhuma tarefa ainda!
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

interface Props {
  task: Task;
  completeTask: (task: Task) => void;
  revertTask?: (task: Task) => void;
  isCompleted: boolean;
}

function TaskCard({ task, completeTask, revertTask, isCompleted }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isChecked, setIsChecked] = useState(isCompleted);

  const parseMsToTime = (ms: number) => {
    const hours = Math.floor(ms / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    if (isChecked && revertTask) {
      revertTask(task);
    } else if (!isChecked && completeTask) {
      completeTask(task);
    }
  };

  return (
    <div
      className="bg-secondary p-3 px-4 rounded-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-row h-12 gap-4">
        <div className="flex items-center">
          {" "}
          {isHovered && (
            <Checkbox
              checked={isChecked}
              onCheckedChange={handleCheckboxChange}
            />
          )}
        </div>
        <div
          style={{ backgroundColor: task.hexColor }}
          className="h-full w-1 rounded-full"
        ></div>
        <div>
          <p>{task.title}</p>
          <small className="text-muted-foreground">
            {task.dueDate.toLocaleDateString() +
              " " +
              parseMsToTime(task.startTimeInMs)}
          </small>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
