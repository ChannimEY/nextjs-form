import CarDetailCom from "@/components/carComponents/CarDetailCom";



export default async function CarPageDetail({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const carId = await (await params).id;
  return (
    <div>

        <CarDetailCom carId={carId}/>

    </div>


  )
}
