import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import TaskForm from "../components/TaskForm";
import brLocale from "@fullcalendar/core/locales/pt-br";
import { useState } from "react";
import Task from "../models/task";

function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      title: "Trabalho POO",
      backgroundColor: "#ff75c3",
      date: new Date(),
      start: 1694991600000,
      end: 1694991600000,
    },
    {
      title: "Prova BD2",
      backgroundColor: "#70e2ff",
      date: new Date(),
      start: 1694991600000,
      end: 1694991600000,
    },
    {
      title: "Consulta",
      backgroundColor: "#ffa647",
      date: new Date(),
      start: 1694991600000,
      end: 1694991600000,
    },
  ]);

  return (
    <main>
      <TaskForm setTasks={setTasks} />
      <div className="">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          locale={brLocale}
          headerToolbar={{
            left: "prev,next,today",
            center: "title",
            right: "timeGridDay,timeGridWeek,dayGridMonth",
          }}
          events={tasks}
          selectable={true}
          initialView="dayGridMonth"
        />
      </div>
    </main>
  );
}
export default Home;
