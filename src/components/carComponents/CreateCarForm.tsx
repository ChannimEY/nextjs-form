"use client";

import { useForm } from "react-hook-form";

type CarFormType = {
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  description: string;
  color: string;
  fuel_type: string;
  transmission: string;
  image: string;
};

export default function CarFormComponent() {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<CarFormType>({
    defaultValues: {
      make: "",
      model: "",
      year: 2023,
      price: 0,
      mileage: 0,
      description: "",
      color: "",
      fuel_type: "",
      transmission: "",
      image: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (data: CarFormType) => {
    console.log("Submitted Car Data:", data);
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Create New Car</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Text Inputs */}
        {[
          { label: "Make", name: "make" },
          { label: "Model", name: "model" },
          { label: "Color", name: "color" },
          { label: "Fuel Type", name: "fuel_type" },
          { label: "Transmission", name: "transmission" },
          { label: "Description", name: "description" },
          { label: "Image URL", name: "image" },
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type="text"
              {...register(name as keyof CarFormType)}
              placeholder={`Enter ${label.toLowerCase()}`}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        {/* Number Inputs */}
        {[
          { label: "Year", name: "year" },
          { label: "Price", name: "price" },
          { label: "Mileage", name: "mileage" },
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type="number"
              {...register(name as keyof CarFormType, { valueAsNumber: true })}
              placeholder={`Enter ${label.toLowerCase()}`}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        {/* Submit Button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
