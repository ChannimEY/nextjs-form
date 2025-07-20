import { z } from "zod"

export const carSchema = z.object({
  make: z.string().min(1, "Make is required").max(50, "Make must be less than 50 characters"),
  model: z.string().min(1, "Model is required").max(50, "Model must be less than 50 characters"),
  year: z.number().min(1900, "Year must be 1900 or later").max(new Date().getFullYear() + 1, "Year cannot be in the future"),
  price: z.number().min(0, "Price must be positive").max(10000000, "Price must be reasonable"),
  mileage: z.number().min(0, "Mileage must be positive").max(1000000, "Mileage must be reasonable"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description must be less than 500 characters"),
  color: z.string().min(1, "Color is required").max(30, "Color must be less than 30 characters"),

  fuel_type: z.union([
    z.literal("gasoline"),
    z.literal("diesel"),
    z.literal("electric"),
    z.literal("hybrid"),
  ], {
    errorMap: () => ({ message: "Fuel type is required" }),
  }),

  transmission: z.union([
    z.literal("manual"),
    z.literal("automatic"),
    z.literal("cvt"),
  ], {
    errorMap: () => ({ message: "Transmission type is required" }),
  }),

  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
})

export const updateCarSchema = carSchema.extend({
  is_sold: z.boolean().default(false),
})

export type CarFormData = z.infer<typeof carSchema>
export type UpdateCarFormData = z.infer<typeof updateCarSchema>
