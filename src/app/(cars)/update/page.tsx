"use client"
import UpdateCarForm from "@/components/carComponents/UpdateCarForm"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { CarProvider } from "@/contexts/CarContext"

function UpdateCarContent() {
  const searchParams = useSearchParams()
  const carId = searchParams.get("id")

  if (!carId) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p>Car ID is missing. Please go back and select a car to update.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <UpdateCarForm carId={carId} />
    </div>
  )
}

export default function UpdateCarPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CarProvider>
        <UpdateCarContent />
      </CarProvider>
    </Suspense>
  )
}
