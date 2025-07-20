import CarList from "@/components/carComponents/CarList"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CarProvider } from "@/contexts/CarContext"

export default function ProductCarPage() {
  return (
    <CarProvider>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Our Car Collection</h1>
          <Button asChild>
            <Link href="/create">Add New Car</Link>
          </Button>
        </div>
        <CarList />
      </div>
    </CarProvider>
  )
}