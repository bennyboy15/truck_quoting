import TruckForm from '../../components/trucks/TruckForm'
import TruckMakeForm from '../../components/trucks/TruckMakeForm'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '../../lib/axios'
import TruckModelForm from "../../components/trucks/TruckModelForm"
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function TrucksCreatePage() {

  const { data: truckMakes } = useQuery({
    queryKey: ["truckMakes"],
    queryFn: async () => {
      const res = await axiosInstance.get("/trucks/make");
      console.log("Make data:", res.data);
      return res.data;
    },
  })

  return (
    <>
    <Link to={"/trucks"} className="btn btn-active mb-2"><ArrowLeft/> Back</Link>
    <div className='flex flex-col gap-5'>
      <div className='flex gap-5'>
        <TruckMakeForm />
        <TruckModelForm/>
      </div>
      <TruckForm />
    </div>
    </>
  )
}

export default TrucksCreatePage