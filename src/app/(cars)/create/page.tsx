

"use client"
import CreateCarForm from "@/components/carComponents/CreateCarForm"
import { CarProvider } from "@/contexts/CarContext"
import { useRouter } from "next/navigation"

export default function CreateCarPage() {
  const router = useRouter()

  const handleSuccess = () => {
    router.push("/productCar")
  }

  return (
    <CarProvider>
      <div className="container mx-auto py-8">
        <CreateCarForm onSuccess={handleSuccess} />
      </div>
    </CarProvider>
  )
}
