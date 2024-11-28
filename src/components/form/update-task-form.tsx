import Task from "@/models/task";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AlarmClock, Calendar, Tag } from "lucide-react";
import ColorPicker from "../color-picker";
import { db } from "@/lib/firebase";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { fetchTask } from "@/api/tasks";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
}

function UpdateTaskForm({ eventId, isOpen, onClose }: Props) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [title, setTitle] = useState<string>("");
  const [hexColor, setHexColor] = useState<string>("");
  const [dueDate, setDueDate] = useState(new Date());
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  const {
    data: task,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["task", user?.uid, eventId],
    queryFn: () => fetchTask(user?.uid, eventId),
  });

  console.log(task);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setHexColor(task.hexColor);
      setDueDate(task.dueDate);
      setStartTime(task.startTimeInMs);
      setEndTime(task.endTimeInMs);
    }
  }, [isSuccess]);

  const updateTaskMutation = useMutation({
    mutationFn: async (event: Task) => {
      const docRef = doc(db, "tasks", eventId);
      await updateDoc(docRef, {
        title: event.title,
        startTimeInMs: event.startTimeInMs,
        endTimeInMs: event.endTimeInMs,
        dueDate: event.dueDate,
        hexColor: event.hexColor,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      toast.success("Tarefa atualizada com sucesso!");
      onClose();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Ocorreu um erro ao editar uma tarefa.");
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async () => {
      const docRef = doc(db, "tasks", eventId);
      await deleteDoc(docRef);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      toast.success("Tarefa removida com sucesso!");
      onClose();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Ocorreu um erro ao remover uma tarefa.");
    },
  });

  const handleTaskUpdate = async () => {
    if (!user) {
      toast.error("Você precisa estar logado para atualizar uma tarefa.");
      return;
    }
    updateTaskMutation.mutate({
      title,
      hexColor,
      startTimeInMs: startTime,
      endTimeInMs: endTime,
      dueDate: dueDate,
    });
  };

  const handleTaskDelete = async () => {
    if (!user) {
      toast.error("Você precisa estar logado para apagar uma tarefa.");
      return;
    }
    deleteTaskMutation.mutate();
  };

  const parseTimeToMilliseconds = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hoursInMs = parseInt(hours, 10) * 60 * 60 * 1000;
    const minutesInMs = parseInt(minutes, 10) * 60 * 1000;
    return hoursInMs + minutesInMs;
  };

  const parseMsToTime = (ms: number) => {
    const hours = Math.floor(ms / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
        </DialogHeader>

        {isLoading && <p>Carregando...</p>}
        {error && <p>Erro ao carregar a tarefa</p>}
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
              <input
                type="date"
                className="bg-background border border-secondary p-1"
                defaultValue={dueDate.toISOString().split("T")[0]}
                onChange={(e) =>
                  setDueDate(new Date(e.target.value.replace("-", "/")))
                }
              />
              <div className="flex flex-row gap-2 items-center">
                <Input
                  type="time"
                  value={parseMsToTime(startTime)}
                  onChange={(e) =>
                    setStartTime(parseTimeToMilliseconds(e.target.value))
                  }
                  className="h-8"
                />
                <p className="text-center">às</p>
                <Input
                  type="time"
                  value={parseMsToTime(endTime)}
                  onChange={(e) =>
                    setEndTime(parseTimeToMilliseconds(e.target.value))
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

        <div className="flex justify-end mt-2 gap-2">
          <Button onClick={handleTaskUpdate} className="rounded-md">
            Atualizar Tarefa
          </Button>
          <Button onClick={handleTaskDelete} variant={"outline"} className="rounded-md border border-destructive text-red-400">
            Apagar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateTaskForm;
