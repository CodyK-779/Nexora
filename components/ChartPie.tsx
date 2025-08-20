"use client";

import { Pie, PieChart } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

export const description = "A pie chart with a legend";

const chartData = [
  { browser: "clothings", visitors: 275, fill: "var(--color-clothings)" },
  { browser: "electronics", visitors: 200, fill: "var(--color-electronics)" },
  { browser: "household", visitors: 187, fill: "var(--color-household)" },
  { browser: "furniture", visitors: 173, fill: "var(--color-furniture)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  clothings: {
    label: "Clothings",
    color: "var(--chart-1)",
  },
  electronics: {
    label: "Electronics",
    color: "var(--chart-2)",
  },
  household: {
    label: "Household",
    color: "var(--chart-3)",
  },
  furniture: {
    label: "Furniture",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function ChartPie() {
  return (
    <Card className="lg:col-span-2 flex flex-col border-2">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top selling categories</CardTitle>
        <CardDescription>July - Augest 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={chartData} dataKey="visitors" />
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
