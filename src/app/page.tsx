import Hero from "@/components/uiComponent/Hero"
import CarList from "@/components/carComponents/CarList"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div>
      <Hero />
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Featured Vehicles
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Browse our hand-picked selection of quality cars.
            </p>
          </div>
          <CarList />
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/productCar">View All Cars</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}