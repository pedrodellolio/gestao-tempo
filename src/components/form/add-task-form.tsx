import Task from "@/models/task";
import { useState } from "react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";

function AddTaskForm() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [startTimeInMs, setStartTimeInMs] = useState(0);
  const [endTimeInMs, setEndTimeInMs] = useState(0);
  const [hexColor, setHexColor] = useState("#fff");

  const createTaskMutation = useMutation({
    mutationFn: async (newTask: Task) => {
      const doc = await addDoc(collection(db, "tasks"), newTask);
      return { id: doc.id, ...newTask };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      toast.success("Tarefa criada com sucesso!");
    },
    onError: () => {
      toast.error("Ocorreu um erro ao adicionar uma tarefa.");
    },
  });

  const handleTaskCreation = async () => {
    if (!user) {
      toast.error("Você precisa estar logado para criar uma tarefa.");
      return;
    }

    const newTask = {
      title,
      dueDate,
      hexColor,
      startTimeInMs: startTimeInMs,
      endTimeInMs: endTimeInMs,
      userId: user.uid,
    };
    console.log(newTask);

    createTaskMutation.mutate(newTask);

    setTitle("");
    setDueDate(new Date());
    setStartTimeInMs(0);
    setEndTimeInMs(0);
  };

  const parseTimeToMilliseconds = (timeString: string) => {
    // const [hours, minutes] = timeString.split(":");
    // const hoursInMs = parseInt(hours, 10) * 60 * 60 * 1000;
    // const minutesInMs = parseInt(minutes, 10) * 60 * 1000;
    // return hoursInMs + minutesInMs;
    const [hours, minutes] = timeString.split(":").map(Number);
    console.log(timeString, hours * 60 * 60 * 1000 + minutes * 60 * 1000);
    return hours * 60 * 60 * 1000 + minutes * 60 * 1000;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="absolute right-72 h-9" variant="outline">
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
            <Button onClick={handleTaskCreation}>
              Criar Tarefa
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default AddTaskForm;
