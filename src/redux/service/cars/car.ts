import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CarResponseType } from "./CarResponse";

export const carApi = createApi({
  reducerPath: "carSellingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  }),
  endpoints: (builder) => ({
    getCars: builder.query<CarResponseType[], { page: number; limit: number }>({
      query: ({ page, limit }) => `/cars?skip=${page}&limit=${limit}`,
    }),

    getCarById: builder.query<CarResponseType, string>({
      query: (id) => `/cars/${id}`,
    }),
  }), 
});

export const {
  useGetCarsQuery,
  useGetCarByIdQuery,
} = carApi;
