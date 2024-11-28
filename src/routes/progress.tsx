import { BarHorizontalChart } from "@/components/chart/bar-horizontal-chart";
import { LineChart } from "@/components/chart/line-chart";
import { PieChart } from "@/components/chart/pie-chart";

function Progress() {
  return (
    <div className="p-6">
      <LineChart />
      <div className="mt-4 gap-4 grid grid-cols-2 grid-flow-row">
        <BarHorizontalChart />
        <PieChart />
      </div>
    </div>
  );
}

export default Progress;
