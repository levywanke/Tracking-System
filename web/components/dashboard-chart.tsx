"use client"
import { Chart, ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

// Mock data for the chart
const data = [
  {
    name: "Jan",
    personnel: 120,
    equipment: 900,
  },
  {
    name: "Feb",
    personnel: 132,
    equipment: 950,
  },
  {
    name: "Mar",
    personnel: 145,
    equipment: 1000,
  },
  {
    name: "Apr",
    personnel: 150,
    equipment: 1050,
  },
  {
    name: "May",
    personnel: 160,
    equipment: 1100,
  },
  {
    name: "Jun",
    personnel: 175,
    equipment: 1150,
  },
  {
    name: "Jul",
    personnel: 190,
    equipment: 1180,
  },
  {
    name: "Aug",
    personnel: 205,
    equipment: 1220,
  },
  {
    name: "Sep",
    personnel: 220,
    equipment: 1250,
  },
  {
    name: "Oct",
    personnel: 235,
    equipment: 1300,
  },
  {
    name: "Nov",
    personnel: 245,
    equipment: 1350,
  },
  {
    name: "Dec",
    personnel: 255,
    equipment: 1400,
  },
]

export function DashboardChart() {
  return (
    <ChartContainer
      className="h-[350px]"
      tooltip={
        <ChartTooltip>
          <ChartTooltipContent
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Personnel</span>
                        <span className="font-bold text-muted-foreground">{payload[0].value}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Equipment</span>
                        <span className="font-bold text-muted-foreground">{payload[1].value}</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
        </ChartTooltip>
      }
    >
      <Chart className="h-[300px]">
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            yAxisId="left"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="personnel"
            stroke="#8884d8"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="equipment"
            stroke="#82ca9d"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </Chart>
      <ChartLegend
        className="mt-4 justify-center"
        items={[
          {
            name: "Personnel",
            color: "#8884d8",
          },
          {
            name: "Equipment",
            color: "#82ca9d",
          },
        ]}
      />
    </ChartContainer>
  )
}

