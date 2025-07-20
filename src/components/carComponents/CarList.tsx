"use client"

import { useCar } from "@/contexts/CarContext"
import CarCard from "./CarCard"
import { Loader2 } from "lucide-react"

export default function CarList() {
  const { cars, loading, error, fetchCars } = useCar()

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2 text-lg">Loading cars...</span>
      </div>
    )
  }

  if (error) {
    return <p className="text-center py-12 text-red-500">{error}</p>
  }

  if (cars.length === 0) {
    return <p className="text-center py-12">No cars found.</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map(car => (
        <CarCard key={car.id} car={car} onSuccess={fetchCars} />
      ))}
    </div>
  )
}