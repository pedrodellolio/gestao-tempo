import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

interface Props {
  type: "bar" | "line";
}
function TasksPerHour(props: Props) {
  const options: ApexOptions = {
    chart: {
      fontFamily: "Inter, Arial, sans-serif",
      height: 350,
      foreColor: "#fff",
      type: props.type,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Tarefas Concluídas por Hora",
      align: "left",
    },
    // striped: false,
    grid: {
      show: false,
      row: {
        colors: ["transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    colors: ["var(--accent)"],
    // grid: {
    //   borderColor: "#626161",
    //   showLines: true,
    // },
    xaxis: {
      categories: Array.from({ length: 24 }, (_, i) =>
        new Date(0, 0, 0, i).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      ),
    },
  };

  const series = [
    {
      name: "Tarefas Concluídas",
      data: Array.from({ length: 24 }, (_, i) => i),
    },
  ];

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type={props.type}
        height={350}
      />
    </div>
  );
}

export default TasksPerHour;
