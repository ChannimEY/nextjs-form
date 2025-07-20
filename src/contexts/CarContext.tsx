"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { type CarFormData } from "@/lib/validations/car"
import { carApi, type Car } from "@/lib/api/cars"

interface CarContextType {
  cars: Car[]
  loading: boolean
  error: string | null
  fetchCars: () => void
  createCar: (car: CarFormData) => Promise<void>
  updateCar: (
    id: string,
    car: Partial<CarFormData> & { is_sold?: boolean }
  ) => Promise<void>
  deleteCar: (id: string) => Promise<void>
}

const CarContext = createContext<CarContextType | undefined>(undefined)

export const CarProvider = ({ children }: { children: ReactNode }) => {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCars = async () => {
    try {
      setLoading(true)
      const fetchedCars = await carApi.getCars()
      setCars(fetchedCars)
    } catch (err) {
      console.error(err)
      setError("Failed to fetch cars")
    } finally {
      setLoading(false)
    }
  }

  const createCar = async (car: CarFormData) => {
    try {
      await carApi.createCar({ ...car, image: car.image || "" })
      await fetchCars()
    } catch (err) {
      console.error(err)
      setError("Failed to create car")
    }
  }

  const updateCar = async (
    id: string,
    car: Partial<CarFormData> & { is_sold?: boolean }
  ) => {
    try {
      const originalCar = cars.find(c => c.id === id)
      if (!originalCar) {
        throw new Error("Car not found")
      }

      // Create a new object with only the fields expected by the API
      const updatedCarData = {
        make: car.make ?? originalCar.make,
        model: car.model ?? originalCar.model,
        year: car.year ?? originalCar.year,
        price: car.price ?? originalCar.price,
        mileage: car.mileage ?? originalCar.mileage,
        description: car.description ?? originalCar.description,
        color: car.color ?? originalCar.color,
        fuel_type: car.fuel_type ?? originalCar.fuel_type,
        transmission: car.transmission ?? originalCar.transmission,
        image: car.image || originalCar.image,
        is_sold: car.is_sold ?? originalCar.is_sold ?? false,
      }

      await carApi.updateCar(id, updatedCarData)
      await fetchCars()
    } catch (err) {
      console.error(err)
      setError("Failed to update car")
      throw err // Re-throw the error to be caught in the form
    }
  }

  const deleteCar = async (id: string) => {
    try {
      await carApi.deleteCar(id)
      await fetchCars()
    } catch (err) {
      console.error(err)
      setError("Failed to delete car")
    }
  }

  useEffect(() => {
    fetchCars()
  }, [])

  return (
    <CarContext.Provider
      value={{
        cars,
        loading,
        error,
        fetchCars,
        createCar,
        updateCar,
        deleteCar,
      }}
    >
      {children}
    </CarContext.Provider>
  )
}

export const useCar = () => {
  const context = useContext(CarContext)
  if (context === undefined) {
    throw new Error("useCar must be used within a CarProvider")
  }
  return context
}