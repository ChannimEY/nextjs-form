"use client";

import { useState } from "react";

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
  is_sold: boolean;
};

export default function UpdateCarForm({ carId }: { carId: string }) {
  const [form, setForm] = useState<CarFormType>({
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
    is_sold: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const val = type === "checkbox" ? target.checked : value;
    setForm((prev) => ({ ...prev, [name]: type === "number" ? +val : val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!e || typeof e.preventDefault !== "function") {
      console.error("Event is invalid or missing preventDefault");
      return;
    }
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${carId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update car");

      alert("Car updated successfully!");
    } catch (err) {
      alert("Error updating car.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4 bg-white shadow rounded-xl mt-10">
      <h2 className="text-xl font-bold">Update Car</h2>

      {Object.entries(form).map(([key, value]) => {
        if (typeof value === "boolean") {
          return (
            <div key={key}>
              <label className="mr-2">
                <input
                  type="checkbox"
                  name={key}
                  checked={value}
                  onChange={handleChange}
                />{" "}
                {key}
              </label>
            </div>
          );
        }

        return (
          <div key={key}>
            <label className="block text-sm font-medium capitalize mb-1">{key}</label>
            <input
              type={typeof value === "number" ? "number" : "text"}
              name={key}
              value={value}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        );
      })}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Update Car
      </button>
    </form>
  );
}
