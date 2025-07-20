import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 flex flex-col items-center justify-center h-[60vh] min-h-[400px] text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Find Your Next Dream Car
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-300 sm:text-xl">
            The best marketplace for new and used cars. We offer a wide range of
            vehicles to suit every budget and lifestyle.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/productCar">Explore Cars</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/sell">Sell Your Car</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/50" />
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src="https://cdn.pixabay.com/video/2020/08/19/47388-452382156.mp4"
      />
    </section>
  )
}