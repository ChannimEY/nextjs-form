"use client";

import { useGetCarsQuery } from "@/redux/service/cars/car";
import { CardCarousel } from "../ui/card-carousel";

export default function CarCard() {
  // declare data as data is loading, fetching, or error
  const { data, isLoading, isFetching, error } = useGetCarsQuery({
    page: 1,
    limit: 5,
  });

  console.log("data: ", data);
  console.log("isLoading: ", isLoading);
  console.log("isFetching: ", isFetching);
  console.log("error: ", error);

  const images =
    data?.map((item) => ({
      src: item.image || '',
      alt: item.make,
    })) ?? [];

  return (
    <div>
      <CardCarousel
    
        images={images}
        autoplayDelay={2000}
        showPagination={true}
        showNavigation={true}
      />
    </div>
  );
}
