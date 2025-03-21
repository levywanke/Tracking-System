"use client"

import { useEffect, useRef } from "react"

interface Coordinates {
  lat: number
  lng: number
}

interface CheckIn {
  id: string
  personnelId: string
  personnelName: string
  location: string
  coordinates: Coordinates
  timestamp: string
  status: string
  duration: string | null
}

interface LocationMapProps {
  checkIns: CheckIn[]
}

export function LocationMap({ checkIns }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This is a placeholder for a real map implementation
    // In a real application, you would use a library like Leaflet, Google Maps, or Mapbox
    if (mapRef.current) {
      const mapElement = mapRef.current

      // Clear any existing content
      mapElement.innerHTML = ""

      // Create a simple placeholder map
      const mapContainer = document.createElement("div")
      mapContainer.className = "w-full h-full bg-slate-100 relative"

      // Add a grid to simulate a map
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const gridCell = document.createElement("div")
          gridCell.className = "absolute border border-slate-200"
          gridCell.style.width = "10%"
          gridCell.style.height = "10%"
          gridCell.style.left = `${j * 10}%`
          gridCell.style.top = `${i * 10}%`
          mapContainer.appendChild(gridCell)
        }
      }

      // Add markers for each check-in
      checkIns.forEach((checkIn) => {
        // Normalize coordinates to fit within our grid
        // This is just for the placeholder - a real map would use actual coordinates
        const normalizedLat = ((checkIn.coordinates.lat - 40.7) / 0.1) * 100
        const normalizedLng = ((checkIn.coordinates.lng + 74.0) / 0.1) * 100

        // Create marker
        const marker = document.createElement("div")
        marker.className =
          "absolute w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold -ml-3 -mt-3 shadow-md"
        marker.style.left = `${normalizedLng % 100}%`
        marker.style.top = `${normalizedLat % 100}%`
        marker.textContent = checkIn.personnelName
          .split(" ")
          .map((n) => n[0])
          .join("")

        // Create tooltip
        const tooltip = document.createElement("div")
        tooltip.className =
          "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-background p-2 rounded shadow-md text-xs w-32 hidden"
        tooltip.innerHTML = `
          <p class="font-bold">${checkIn.personnelName}</p>
          <p>${checkIn.location}</p>
          <p class="text-muted-foreground">${new Date(checkIn.timestamp).toLocaleTimeString()}</p>
        `

        // Show tooltip on hover
        marker.addEventListener("mouseenter", () => {
          tooltip.classList.remove("hidden")
        })

        marker.addEventListener("mouseleave", () => {
          tooltip.classList.add("hidden")
        })

        marker.appendChild(tooltip)
        mapContainer.appendChild(marker)
      })

      // Add a legend
      const legend = document.createElement("div")
      legend.className = "absolute bottom-4 right-4 bg-background p-2 rounded shadow-md text-xs"
      legend.innerHTML = `
        <p class="font-bold mb-1">Map Legend</p>
        <div class="flex items-center gap-1">
          <div class="w-3 h-3 rounded-full bg-primary"></div>
          <span>Active Personnel</span>
        </div>
      `

      mapContainer.appendChild(legend)
      mapElement.appendChild(mapContainer)
    }
  }, [checkIns])

  return (
    <div ref={mapRef} className="w-full h-full">
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    </div>
  )
}

