import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import TaskForm from "../components/TaskForm";
import brLocale from "@fullcalendar/core/locales/pt-br";
import { useState } from "react";
import Task from "../models/Task";

function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

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
