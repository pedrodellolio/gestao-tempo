import Task from "@/models/task";
import { Dispatch, SetStateAction, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AlarmClock, Calendar, Tag } from "lucide-react";
import DatePicker from "../date-picker";
import ColorPicker from "../color-picker";
import { PopoverClose } from "@radix-ui/react-popover";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "sonner";

interface Props {
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

function TaskForm(props: Props) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [startTimeInMs, setStartTimeInMs] = useState(0);
  const [endTimeInMs, setEndTimeInMs] = useState(0);
  const [hexColor, setHexColor] = useState("#fff");

  const handleTaskCreation = async () => {
    const task = {
      title,
      dueDate,
      hexColor,
      startTimeInMs: dueDate.setHours(0, 0, 0, startTimeInMs),
      endTimeInMs: dueDate.setHours(0, 0, 0, endTimeInMs),
    };

    try {
      const doc = await addDoc(collection(db, "tasks"), task);
      setTitle("");
      setDueDate(new Date());
      setStartTimeInMs(0);
      setEndTimeInMs(0);
      props.setTasks((prevState) => [...prevState, { id: doc.id, ...task }]);
      toast.success("Tarefa criada com sucesso!");
    } catch (err: any) {
      toast.error("Ocorreu um erro ao adicionar uma tarefa.");
      console.error(err);
    }
  };

  const parseTimeToMilliseconds = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hoursInMs = parseInt(hours, 10) * 60 * 60 * 1000;
    const minutesInMs = parseInt(minutes, 10) * 60 * 1000;
    return hoursInMs + minutesInMs;
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="absolute right-52 h-9" variant="outline">
            + Nova Tarefa
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="flex flex-row items-center gap-3">
                <Calendar className="text-gray-500" size={24} />
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Nova Tarefa"
                  className="h-8"
                  autoFocus
                />
              </div>
              <div className="flex flex-row items-center gap-3">
                <AlarmClock className="text-gray-500" size={24} />
                <DatePicker value={dueDate} setValue={setDueDate} />
                <div className="flex flex-row gap-2 items-center">
                  <Input
                    type="time"
                    value={
                      startTimeInMs === 0
                        ? ""
                        : new Date(startTimeInMs).toISOString().slice(11, 16)
                    }
                    onChange={(e) =>
                      setStartTimeInMs(parseTimeToMilliseconds(e.target.value))
                    }
                    className="h-8"
                  />
                  <p className="text-center">às</p>
                  <Input
                    type="time"
                    value={
                      endTimeInMs === 0
                        ? ""
                        : new Date(endTimeInMs).toISOString().slice(11, 16)
                    }
                    onChange={(e) =>
                      setEndTimeInMs(parseTimeToMilliseconds(e.target.value))
                    }
                    className="h-8"
                  />
                </div>
              </div>
              <div className="flex flex-row items-center gap-3">
                <Tag className="text-gray-500" size={24} />
                <ColorPicker
                  value={hexColor}
                  setValue={setHexColor}
                  className="h-8 w-44 border border-[var(--border)]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-2">
            <PopoverClose>
              <Button
                onClick={handleTaskCreation}
                className="bg-[var(--accent)]"
              >
                Criar Tarefa
              </Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default TaskForm;
