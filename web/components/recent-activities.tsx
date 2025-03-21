"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, Package } from "lucide-react"

// Mock data for recent activities
const recentActivities = [
  {
    id: "A001",
    type: "check-in",
    user: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
    },
    location: "Headquarters",
    timestamp: "2023-11-15T08:30:00",
    status: "Checked In",
  },
  {
    id: "A002",
    type: "equipment",
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    item: "Laptop Computer",
    action: "Assigned",
    timestamp: "2023-11-15T09:15:00",
  },
  {
    id: "A003",
    type: "check-out",
    user: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MB",
    },
    location: "District 5",
    timestamp: "2023-11-15T16:00:00",
    status: "Checked Out",
  },
  {
    id: "A004",
    type: "equipment",
    user: {
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ED",
    },
    item: "Radio",
    action: "Returned",
    timestamp: "2023-11-15T14:45:00",
  },
  {
    id: "A005",
    type: "check-in",
    user: {
      name: "Robert Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "RW",
    },
    location: "Field Office A",
    timestamp: "2023-11-15T07:50:00",
    status: "Checked In",
  },
]

export function RecentActivities() {
  // Function to format the timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Function to calculate time ago
  const getTimeAgo = (timestamp: string) => {
    const now = new Date()
    const activityTime = new Date(timestamp)
    const diffMs = now.getTime() - activityTime.getTime()
    const diffMins = Math.round(diffMs / 60000)

    if (diffMins < 1) return "just now"
    if (diffMins < 60) return `${diffMins}m ago`

    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`

    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}d ago`
  }

  return (
    <div className="space-y-8">
      {recentActivities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium leading-none">{activity.user.name}</p>
              {activity.type === "check-in" || activity.type === "check-out" ? (
                <Badge
                  variant="outline"
                  className={
                    activity.status === "Checked In"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                  }
                >
                  {activity.status}
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className={
                    activity.action === "Assigned"
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }
                >
                  {activity.action}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {activity.type === "check-in" || activity.type === "check-out" ? (
                <>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {formatTime(activity.timestamp)}
                  </span>
                  <span className="mx-1">•</span>
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> {activity.location}
                  </span>
                </>
              ) : (
                <>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {formatTime(activity.timestamp)}
                  </span>
                  <span className="mx-1">•</span>
                  <span className="inline-flex items-center gap-1">
                    <Package className="h-3 w-3" /> {activity.item}
                  </span>
                </>
              )}
            </p>
          </div>
          <div className="text-xs text-muted-foreground">{getTimeAgo(activity.timestamp)}</div>
        </div>
      ))}
      <Button variant="outline" className="w-full">
        View All Activities
      </Button>
    </div>
  )
}

