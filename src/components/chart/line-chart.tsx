"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartData = [
  { date: "2024-04-01", desktop: 222, tarefas: 150 },
  { date: "2024-04-02", desktop: 97, tarefas: 180 },
  { date: "2024-04-03", desktop: 167, tarefas: 120 },
  { date: "2024-04-04", desktop: 242, tarefas: 260 },
  { date: "2024-04-05", desktop: 373, tarefas: 290 },
  { date: "2024-04-06", desktop: 301, tarefas: 340 },
  { date: "2024-04-07", desktop: 245, tarefas: 180 },
  { date: "2024-04-08", desktop: 409, tarefas: 320 },
  { date: "2024-04-09", desktop: 59, tarefas: 110 },
  { date: "2024-04-10", desktop: 261, tarefas: 190 },
  { date: "2024-04-11", desktop: 327, tarefas: 350 },
  { date: "2024-04-12", desktop: 292, tarefas: 210 },
  { date: "2024-04-13", desktop: 342, tarefas: 380 },
  { date: "2024-04-14", desktop: 137, tarefas: 220 },
  { date: "2024-04-15", desktop: 120, tarefas: 170 },
  { date: "2024-04-16", desktop: 138, tarefas: 190 },
  { date: "2024-04-17", desktop: 446, tarefas: 360 },
  { date: "2024-04-18", desktop: 364, tarefas: 410 },
  { date: "2024-04-19", desktop: 243, tarefas: 180 },
  { date: "2024-04-20", desktop: 89, tarefas: 150 },
  { date: "2024-04-21", desktop: 137, tarefas: 200 },
  { date: "2024-04-22", desktop: 224, tarefas: 170 },
  { date: "2024-04-23", desktop: 138, tarefas: 230 },
  { date: "2024-04-24", desktop: 387, tarefas: 290 },
  { date: "2024-04-25", desktop: 215, tarefas: 250 },
  { date: "2024-04-26", desktop: 75, tarefas: 130 },
  { date: "2024-04-27", desktop: 383, tarefas: 420 },
  { date: "2024-04-28", desktop: 122, tarefas: 180 },
  { date: "2024-04-29", desktop: 315, tarefas: 240 },
  { date: "2024-04-30", desktop: 454, tarefas: 380 },
  { date: "2024-05-01", desktop: 165, tarefas: 220 },
  { date: "2024-05-02", desktop: 293, tarefas: 310 },
  { date: "2024-05-03", desktop: 247, tarefas: 190 },
  { date: "2024-05-04", desktop: 385, tarefas: 420 },
  { date: "2024-05-05", desktop: 481, tarefas: 390 },
  { date: "2024-05-06", desktop: 498, tarefas: 520 },
  { date: "2024-05-07", desktop: 388, tarefas: 300 },
  { date: "2024-05-08", desktop: 149, tarefas: 210 },
  { date: "2024-05-09", desktop: 227, tarefas: 180 },
  { date: "2024-05-10", desktop: 293, tarefas: 330 },
  { date: "2024-05-11", desktop: 335, tarefas: 270 },
  { date: "2024-05-12", desktop: 197, tarefas: 240 },
  { date: "2024-05-13", desktop: 197, tarefas: 160 },
  { date: "2024-05-14", desktop: 448, tarefas: 490 },
  { date: "2024-05-15", desktop: 473, tarefas: 380 },
  { date: "2024-05-16", desktop: 338, tarefas: 400 },
  { date: "2024-05-17", desktop: 499, tarefas: 420 },
  { date: "2024-05-18", desktop: 315, tarefas: 350 },
  { date: "2024-05-19", desktop: 235, tarefas: 180 },
  { date: "2024-05-20", desktop: 177, tarefas: 230 },
  { date: "2024-05-21", desktop: 82, tarefas: 140 },
  { date: "2024-05-22", desktop: 81, tarefas: 120 },
  { date: "2024-05-23", desktop: 252, tarefas: 290 },
  { date: "2024-05-24", desktop: 294, tarefas: 220 },
  { date: "2024-05-25", desktop: 201, tarefas: 250 },
  { date: "2024-05-26", desktop: 213, tarefas: 170 },
  { date: "2024-05-27", desktop: 420, tarefas: 460 },
  { date: "2024-05-28", desktop: 233, tarefas: 190 },
  { date: "2024-05-29", desktop: 78, tarefas: 130 },
  { date: "2024-05-30", desktop: 340, tarefas: 280 },
  { date: "2024-05-31", desktop: 178, tarefas: 230 },
  { date: "2024-06-01", desktop: 178, tarefas: 200 },
  { date: "2024-06-02", desktop: 470, tarefas: 410 },
  { date: "2024-06-03", desktop: 103, tarefas: 160 },
  { date: "2024-06-04", desktop: 439, tarefas: 380 },
  { date: "2024-06-05", desktop: 88, tarefas: 140 },
  { date: "2024-06-06", desktop: 294, tarefas: 250 },
  { date: "2024-06-07", desktop: 323, tarefas: 370 },
  { date: "2024-06-08", desktop: 385, tarefas: 320 },
  { date: "2024-06-09", desktop: 438, tarefas: 480 },
  { date: "2024-06-10", desktop: 155, tarefas: 200 },
  { date: "2024-06-11", desktop: 92, tarefas: 150 },
  { date: "2024-06-12", desktop: 492, tarefas: 420 },
  { date: "2024-06-13", desktop: 81, tarefas: 130 },
  { date: "2024-06-14", desktop: 426, tarefas: 380 },
  { date: "2024-06-15", desktop: 307, tarefas: 350 },
  { date: "2024-06-16", desktop: 371, tarefas: 310 },
  { date: "2024-06-17", desktop: 475, tarefas: 520 },
  { date: "2024-06-18", desktop: 107, tarefas: 170 },
  { date: "2024-06-19", desktop: 341, tarefas: 290 },
  { date: "2024-06-20", desktop: 408, tarefas: 450 },
  { date: "2024-06-21", desktop: 169, tarefas: 210 },
  { date: "2024-06-22", desktop: 317, tarefas: 270 },
  { date: "2024-06-23", desktop: 480, tarefas: 530 },
  { date: "2024-06-24", desktop: 132, tarefas: 180 },
  { date: "2024-06-25", desktop: 141, tarefas: 190 },
  { date: "2024-06-26", desktop: 434, tarefas: 380 },
  { date: "2024-06-27", desktop: 448, tarefas: 490 },
  { date: "2024-06-28", desktop: 149, tarefas: 200 },
  { date: "2024-06-29", desktop: 103, tarefas: 160 },
  { date: "2024-06-30", desktop: 446, tarefas: 400 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  tarefas: {
    label: "tarefas",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function LineChart() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Tarefas ao longo do tempo</CardTitle>
          <CardDescription>
            Mostrando tarefas dos últimos 3 meses
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Últimos 3 meses
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Últimos 30 dias
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Últimos 7 dias
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="filltarefas" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-tarefas)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-tarefas)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("pt-BR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="tarefas"
              type="natural"
              fill="url(#filltarefas)"
              stroke="var(--color-tarefas)"
              stackId="a"
            />
            {/* <ChartLegend content={<ChartLegendContent />} /> */}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
