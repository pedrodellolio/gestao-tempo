import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Task from "../models/task";

interface Props {
  tasks: Task[];
}

function TaskList(props: Props) {
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
      <Popover>
        <PopoverTrigger asChild>
          <Button className="absolute" variant="link">
            {/* <Bars3Icon
              className="text-[var(--text-secondary)]"
              width={26}
              height={26}
            /> */}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[350px] h-[90vh] overflow-scroll">
          <h2>Ativas</h2>
          <div className="mt-2 flex flex-col items-stretch gap-2">
            {props.tasks.map((t) => {
              return (
                <div className="bg-[var(--bg-secondary)] p-3 rounded-md">
                  <p>{t.title}</p>
                  <small className="text-[var(--text-secondary)]">
                    {formatDate(t.date)}
                  </small>
                </div>
              );
            })}
          </div>

          <h2 className="mt-6">Completas</h2>
          <div className="mt-2 flex flex-col items-stretch gap-2">
            {props.tasks.map((t) => {
              return (
                <div className="bg-[var(--bg-secondary)] p-3 rounded-md">
                  <p>{t.title}</p>
                  <small className="text-[var(--text-secondary)]">
                    {formatDate(t.date)}
                  </small>
                </div>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default TaskList;
