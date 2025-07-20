"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useCar } from "@/contexts/CarContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateCarSchema, type UpdateCarFormData } from "@/lib/validations/car"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface UpdateCarFormProps {
  carId: string
}

export default function UpdateCarForm({ carId }: UpdateCarFormProps) {
  const { cars, updateCar, loading: carsLoading, error: carsError } = useCar()
  const [isLoading, setIsLoading] = useState(false)
  const car = cars.find(c => c.id === carId)
  const router = useRouter()


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<UpdateCarFormData>({
    resolver: zodResolver(updateCarSchema),
  })

  useEffect(() => {
    if (car) {
      reset({
        make: car.make,
        model: car.model,
        year: car.year,
        price: car.price,
        mileage: car.mileage,
        description: car.description,
        color: car.color,
        fuel_type: car.fuel_type,
        transmission: car.transmission,
        image: car.image || "",
        is_sold: car.is_sold || false,
      })
    }
  }, [car, reset])

  const onSubmit = async (data: UpdateCarFormData) => {
    setIsLoading(true)
    try {
      await updateCar(carId, data)
      toast.success("Car updated successfully!")
      router.push("/productCar")
    } catch (error) {
      toast.error("Failed to update car. Please try again.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (carsLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Loading car data...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (carsError) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6 text-center text-red-500">
          <p>Failed to load car data. Please try again later.</p>
        </CardContent>
      </Card>
    )
  }

  if (!car) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6 text-center">
          <p>Car not found. It might have been deleted.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Update Car</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Make */}
            <div className="space-y-2">
              <Label htmlFor="make">Make</Label>
              <Input
                id="make"
                {...register("make")}
                placeholder="Enter car make"
              />
              {errors.make && (
                <p className="text-sm text-red-500">{errors.make.message}</p>
              )}
            </div>

            {/* Model */}
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                {...register("model")}
                placeholder="Enter car model"
              />
              {errors.model && (
                <p className="text-sm text-red-500">{errors.model.message}</p>
              )}
            </div>

            {/* Year */}
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                {...register("year", { valueAsNumber: true })}
                placeholder="Enter year"
              />
              {errors.year && (
                <p className="text-sm text-red-500">{errors.year.message}</p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
                placeholder="Enter price"
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>

            {/* Mileage */}
            <div className="space-y-2">
              <Label htmlFor="mileage">Mileage</Label>
              <Input
                id="mileage"
                type="number"
                {...register("mileage", { valueAsNumber: true })}
                placeholder="Enter mileage"
              />
              {errors.mileage && (
                <p className="text-sm text-red-500">{errors.mileage.message}</p>
              )}
            </div>

            {/* Color */}
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                {...register("color")}
                placeholder="Enter color"
              />
              {errors.color && (
                <p className="text-sm text-red-500">{errors.color.message}</p>
              )}
            </div>

            {/* Fuel Type */}
            <div className="space-y-2">
              <Label htmlFor="fuel_type">Fuel Type</Label>
              <Select
                onValueChange={(value: "gasoline" | "diesel" | "electric" | "hybrid") => setValue("fuel_type", value)}
                value={watch("fuel_type")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gasoline">Gasoline</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
              {errors.fuel_type && (
                <p className="text-sm text-red-500">{errors.fuel_type.message}</p>
              )}
            </div>

            {/* Transmission */}
            <div className="space-y-2">
              <Label htmlFor="transmission">Transmission</Label>
              <Select
                onValueChange={(value: "manual" | "automatic" | "cvt") => setValue("transmission", value)}
                value={watch("transmission")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select transmission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="automatic">Automatic</SelectItem>
                  <SelectItem value="cvt">CVT</SelectItem>
                </SelectContent>
              </Select>
              {errors.transmission && (
                <p className="text-sm text-red-500">{errors.transmission.message}</p>
              )}
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="image">Image URL (optional)</Label>
            <Input
              id="image"
              {...register("image")}
              placeholder="Enter image URL"
            />
            {errors.image && (
              <p className="text-sm text-red-500">{errors.image.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              {...register("description")}
              placeholder="Enter car description"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Is Sold */}
          <div className="space-y-2">
            <Label htmlFor="is_sold">Status</Label>
            <Select
              onValueChange={(value) => setValue("is_sold", value === "true")}
              value={watch("is_sold") ? "true" : "false"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">Available</SelectItem>
                <SelectItem value="true">Sold</SelectItem>
              </SelectContent>
            </Select>
            {errors.is_sold && (
              <p className="text-sm text-red-500">{errors.is_sold.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update Car
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}