import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import brLocale from "@fullcalendar/core/locales/pt-br";
import TaskForm from "@/components/form/add-task-form";
import { EventClickArg, EventInput } from "@fullcalendar/core/index.js";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import Task from "@/models/task";
import { fetchTasks } from "@/api/tasks";
import UpdateTaskForm from "@/components/form/update-task-form";

function Home() {
  const { user } = useAuth();
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks", user?.uid],
    queryFn: () => fetchTasks(user?.uid),
  });

  const [isEventOpen, setIsEventOpen] = useState<boolean>(false);
  const [selectedEventId, setSelectedEventId] = useState<string>("");

  const parseMsToTime = (ms: number) => {
    const hours = Math.floor(ms / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const data = tasks?.map((t: Task) => {
    return {
      id: t.id,
      title: t.title,
      start: formatDate(t.dueDate) + `T${parseMsToTime(t.startTimeInMs)}`,
      end: formatDate(t.dueDate) + `T${parseMsToTime(t.endTimeInMs)}`,
      color: t.hexColor,
    } as EventInput;
  });

  console.log(data);

  const handleEventClick = (info: EventClickArg) => {
    setSelectedEventId(info.event.id);
    setIsEventOpen(true);
  };

  const handleCloseEvent = () => {
    setIsEventOpen(false);
    setSelectedEventId("");
  };

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar tarefas</p>;

  return (
    <main>
      <TaskForm />
      <div>
        <FullCalendar
          plugins={[timeGridPlugin, dayGridPlugin]}
          locale={brLocale}
          headerToolbar={{
            left: "prev,next,today",
            center: "title",
            right: "timeGridDay, timeGridWeek, dayGridMonth",
          }}
          events={data}
          selectable={true}
          initialView="dayGridMonth"
          eventClick={handleEventClick}
        />
      </div>

      <UpdateTaskForm
        isOpen={isEventOpen}
        onClose={handleCloseEvent}
        eventId={selectedEventId}
      />
    </main>
  );
}
export default Home;
