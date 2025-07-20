import Link from "next/link"
import { type Car } from "@/lib/api/cars"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import DeleteCarDialog from "./DeleteCarDialog"
import Image from "next/image"

interface CarCardProps {
  car: Car
  onSuccess: () => void
}

export default function CarCard({ car, onSuccess }: CarCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="relative w-full h-48 mb-4">
          <Image
            src={car.image || "/photo/placeholder.jpg"}
            alt={`${car.make} ${car.model}`}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
        <CardTitle className="text-xl font-bold">{car.make} {car.model}</CardTitle>
        <p className="text-lg font-semibold text-primary">${car.price.toLocaleString()}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">{car.year}</Badge>
          <Badge variant="secondary">{car.fuel_type}</Badge>
          <Badge variant="secondary">{car.transmission}</Badge>
          <Badge variant={car.is_sold ? "destructive" : "default"}>
            {car.is_sold ? "Sold" : "Available"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">{car.description}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button asChild variant="outline" size="sm">
          <Link href={`/cars/update?id=${car.id}`}>Update</Link>
        </Button>
        <DeleteCarDialog carId={car.id} onSuccess={onSuccess} />
      </CardFooter>
    </Card>
  )
}
