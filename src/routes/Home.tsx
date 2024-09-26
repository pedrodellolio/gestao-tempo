import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import brLocale from "@fullcalendar/core/locales/pt-br";
import TaskForm from "@/components/form/add-task-form";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { EventInput } from "@fullcalendar/core/index.js";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";

const fetchTasks = async (userId?: string) => {
  console.log(userId);
  const tasksQuery = query(
    collection(db, "tasks"),
    where("userId", "==", userId)
  );
  const tasksSnapshot = await getDocs(tasksQuery);
  return tasksSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      dueDate: data.dueDate.toDate(),
      startTimeInMs: data.startTimeInMs,
      endTimeInMs: data.endTimeInMs,
      hexColor: data.hexColor,
      userId: data.userId,
    };
  });
};

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
  const parseMsToTime = (ms: number) => {
    return new Date(ms).toLocaleTimeString("pt-BR");
  };

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const data = tasks?.map((t) => {
    return {
      id: t.id,
      title: t.title,
      start: formatDate(t.dueDate) + `T${parseMsToTime(t.startTimeInMs)}`,
      end: formatDate(t.dueDate) + `T${parseMsToTime(t.endTimeInMs)}`,
    } as EventInput;
  });

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
        />
      </div>
    </main>
  );
}
export default Home;
