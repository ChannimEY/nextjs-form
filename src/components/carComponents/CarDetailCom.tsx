"use client";

import { useGetCarByIdQuery } from "@/redux/service/cars/car";
import Image from "next/image";

type CarDetailProps = {
  carId: string;
};

export default function CarDetailCom({ carId }: CarDetailProps) {
  const { data } = useGetCarByIdQuery(carId);

  const imageUrl = data?.image || "/fallback.jpg";

  return (
    <div>
      <p>{data?.make}</p>
      <p>{data?.description}</p>
      {imageUrl && (
        <Image
          src={imageUrl}
          width={300}
          height={250}
          alt={data?.model || "Car image"}
          className="rounded-lg object-cover"
        />
      )}
    </div>
  );
}
