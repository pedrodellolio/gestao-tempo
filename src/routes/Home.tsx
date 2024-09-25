import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import brLocale from "@fullcalendar/core/locales/pt-br";
import { useEffect, useState } from "react";
import Task from "../models/task";
import TaskForm from "@/components/form/add-task-form";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { EventInput } from "@fullcalendar/core/index.js";

function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksCollection = collection(db, "tasks");
        const tasksSnapshot = await getDocs(tasksCollection);

        const tasksList: Task[] = tasksSnapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            title: data.title,
            dueDate: data.dueDate.toDate(),
            startTimeInMs: data.startTimeInMs,
            endTimeInMs: data.endTimeInMs,
            hexColor: data.hexColor,
          } as Task;
        });

        setTasks(tasksList);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    };

    fetchTasks();
  }, []);

  console.log(tasks);
  const parseMsToTime = (ms: number) => {
    return new Date(ms).toLocaleTimeString("pt-BR");
  };

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const data = tasks.map((t) => {
    console.log(formatDate(t.dueDate) + `T${parseMsToTime(t.startTimeInMs)}`);
    return {
      id: t.id,
      title: t.title,
      start: formatDate(t.dueDate) + `T${parseMsToTime(t.startTimeInMs)}`,
      end: formatDate(t.dueDate) + `T${parseMsToTime(t.endTimeInMs)}`,
    } as EventInput;
  });

  return (
    <main>
      <TaskForm setTasks={setTasks} />
      <div className="">
        <FullCalendar
          plugins={[dayGridPlugin]}
          locale={brLocale}
          headerToolbar={{
            left: "prev,next,today",
            center: "title",
            right: "timeGridDay,timeGridWeek,dayGridMonth",
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
