import TasksPerHour from "../components/charts/TasksPerHour";

function Progresso() {
  return (
    <div className=" p-5 gap-20 grid grid-cols-2 grid-flow-row">
      <TasksPerHour type={"line"} />
      <TasksPerHour type={"bar"} />
      <TasksPerHour type={"bar"} />
      <TasksPerHour type={"line"} />
    </div>
  );
}

export default Progresso;
