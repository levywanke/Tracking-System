import * as React from "react"
import { cn } from "@/lib/utils"

const ChartContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        {children}
      </div>
    )
  },
)
ChartContainer.displayName = "ChartContainer"

const Chart = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("h-full w-full", className)} {...props}>
        {children}
      </div>
    )
  },
)
Chart.displayName = "Chart"

const ChartLegend = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { items: { name: string; color: string }[] }
>(({ className, items, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex items-center", className)} {...props}>
      {items.map((item) => (
        <div key={item.name} className="flex items-center space-x-2">
          <span className="block h-4 w-4 rounded-full" style={{ backgroundColor: item.color }} />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  )
})
ChartLegend.displayName = "ChartLegend"

interface ChartTooltipContentProps {
  content: ({ active, payload }: { active: boolean; payload: any }) => React.ReactNode
}

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ChartTooltipContentProps
>(({ className, content, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("", className)} {...props}>
      {content}
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartTooltip = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("absolute inset-0 pointer-events-none", className)} {...props}>
        {children}
      </div>
    )
  },
)
ChartTooltip.displayName = "ChartTooltip"

export { ChartContainer, Chart, ChartLegend, ChartTooltip, ChartTooltipContent }

