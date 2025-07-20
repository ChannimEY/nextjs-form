const API_BASE_URL = "https://car-nextjs-api.cheatdev.online"

export interface Car {
  id: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  description: string
  color: string
  fuel_type: string
  transmission: string
  image: string
  is_sold?: boolean
  created_at?: string
  updated_at?: string
}

export interface CreateCarData {
  make: string
  model: string
  year: number
  price: number
  mileage: number
  description: string
  color: string
  fuel_type: string
  transmission: string
  image: string
}

export interface UpdateCarData extends CreateCarData {
  is_sold: boolean
}

export const carApi = {
  // Get all cars
  getCars: async (): Promise<Car[]> => {
    const response = await fetch(`${API_BASE_URL}/cars`)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'Failed to fetch cars')
    }
    return response.json()
  },

  // Get car by ID
  getCar: async (id: string): Promise<Car> => {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'Failed to fetch car')
    }
    return response.json()
  },

  // Create new car
  createCar: async (data: CreateCarData): Promise<Car> => {
    const response = await fetch(`${API_BASE_URL}/cars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'Failed to create car')
    }
    return response.json()
  },

  // Update car
  updateCar: async (id: string, data: UpdateCarData): Promise<Car> => {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'Failed to update car')
    }
    return response.json()
  },

  // Delete car
  deleteCar: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'Failed to delete car')
    }
  },
}