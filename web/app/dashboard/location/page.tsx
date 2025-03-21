"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, MapPin, Clock, User, Calendar } from "lucide-react"
import { LocationMap } from "@/components/location-map"

// Mock data for check-ins
const mockCheckIns = [
  {
    id: "C001",
    personnelId: "P001",
    personnelName: "John Smith",
    location: "Headquarters",
    coordinates: { lat: 40.7128, lng: -74.006 },
    timestamp: "2023-11-15T08:30:00",
    status: "Checked In",
    duration: null,
  },
  {
    id: "C002",
    personnelId: "P002",
    personnelName: "Sarah Johnson",
    location: "Field Office A",
    coordinates: { lat: 40.7282, lng: -73.9942 },
    timestamp: "2023-11-15T09:15:00",
    status: "Checked In",
    duration: null,
  },
  {
    id: "C003",
    personnelId: "P003",
    personnelName: "Michael Brown",
    location: "District 5",
    coordinates: { lat: 40.7023, lng: -74.0128 },
    timestamp: "2023-11-15T07:45:00",
    status: "Checked Out",
    duration: "8h 15m",
  },
  {
    id: "C004",
    personnelId: "P004",
    personnelName: "Emily Davis",
    location: "Mobile Unit 3",
    coordinates: { lat: 40.7589, lng: -73.9851 },
    timestamp: "2023-11-15T08:00:00",
    status: "Checked In",
    duration: null,
  },
  {
    id: "C005",
    personnelId: "P005",
    personnelName: "Robert Wilson",
    location: "Training Center",
    coordinates: { lat: 40.7411, lng: -74.0079 },
    timestamp: "2023-11-14T14:30:00",
    status: "Checked Out",
    duration: "7h 30m",
  },
]

export default function LocationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("map")

  // Filter check-ins based on search term
  const filteredCheckIns = mockCheckIns.filter(
    (checkIn) =>
      checkIn.personnelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      checkIn.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      checkIn.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get active check-ins for the map
  const activeCheckIns = mockCheckIns.filter((checkIn) => checkIn.status === "Checked In")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Location Tracking</h1>
        <p className="text-muted-foreground">Monitor real-time locations and check-in history</p>
      </div>

      <Tabs defaultValue="map" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="history">Check-in History</TabsTrigger>
          </TabsList>
          <div className="mt-4 flex gap-2 sm:mt-0">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search locations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>

        <TabsContent value="map" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Locations</CardTitle>
              <CardDescription>Real-time view of all active personnel locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] rounded-md border">
                <LocationMap checkIns={activeCheckIns} />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {activeCheckIns.map((checkIn) => (
                  <Card key={checkIn.id} className="overflow-hidden">
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm font-medium">{checkIn.personnelName}</CardTitle>
                      <CardDescription className="flex items-center text-xs">
                        <MapPin className="mr-1 h-3 w-3" /> {checkIn.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {new Date(checkIn.timestamp).toLocaleTimeString()}
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Active
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personnel Locations</CardTitle>
              <CardDescription>Current status and location of all personnel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Personnel</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Duration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCheckIns.length > 0 ? (
                      filteredCheckIns.map((checkIn) => (
                        <TableRow key={checkIn.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <div className="font-medium">{checkIn.personnelName}</div>
                                <div className="text-xs text-muted-foreground">{checkIn.personnelId}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              {checkIn.location}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                checkIn.status === "Checked In"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-slate-50 text-slate-700 border-slate-200"
                              }
                            >
                              {checkIn.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              {new Date(checkIn.timestamp).toLocaleTimeString()}
                            </div>
                          </TableCell>
                          <TableCell>{checkIn.duration || "—"}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No check-ins found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Check-in History</CardTitle>
              <CardDescription>Historical record of all check-ins and check-outs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Personnel</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Duration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCheckIns.length > 0 ? (
                      filteredCheckIns.map((checkIn) => (
                        <TableRow key={checkIn.id}>
                          <TableCell>
                            <div className="font-medium">{checkIn.personnelName}</div>
                          </TableCell>
                          <TableCell>{checkIn.location}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              {new Date(checkIn.timestamp).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>{new Date(checkIn.timestamp).toLocaleTimeString()}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                checkIn.status === "Checked In"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-slate-50 text-slate-700 border-slate-200"
                              }
                            >
                              {checkIn.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{checkIn.duration || "—"}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No check-in history found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

