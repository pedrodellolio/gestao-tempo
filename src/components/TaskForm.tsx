import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar, AlarmClock, Tag } from "lucide-react";
import DatePicker from "./DatePicker";
import ColorPicker from "./ColorPicker";
import { useState, useEffect } from "react";
import { PopoverClose } from "@radix-ui/react-popover";
import Task from "../models/task";

interface Props {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
function TaskForm(props: Props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [startTimeInMs, setStartTimeInMs] = useState(0);
  const [endTimeInMs, setEndTimeInMs] = useState(0);
  const [tagColorInHex, setTagColorInHex] = useState("#fff");

  useEffect(() => {
    const apiUrl = "http://localhost:8082/list";

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  });

  const handleTaskCreation = () => {
    const task: Task = {
      title,
      date,
      start: date.setHours(0, 0, 0, startTimeInMs),
      end: date.setHours(0, 0, 0, endTimeInMs),
      backgroundColor: tagColorInHex,
    };
    props.setTasks((prevState) => [...prevState, task]);
    setTitle("");
    setDate(new Date());
    setStartTimeInMs(0);
    setEndTimeInMs(0);

    const apiUrl = 'http://localhost:8082/add';

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task)
    };
    
    fetch(apiUrl, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Response data:', data);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  };

  const parseTimeToMilliseconds = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hoursInMs = parseInt(hours, 10) * 60 * 60 * 1000;
    const minutesInMs = parseInt(minutes, 10) * 60 * 1000;
    return hoursInMs + minutesInMs;
  };

  console.log({ title, date, startTimeInMs, endTimeInMs, tagColorInHex });
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="absolute right-52 h-9" variant="outline">
            + Nova Tarefa
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[450px]">
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
                <DatePicker value={date} setValue={setDate} />
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
                  value={tagColorInHex}
                  setValue={setTagColorInHex}
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
