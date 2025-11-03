import StatCard from '../components/StatCard';
import { CircleCheckBig, DraftingCompass, Hourglass, Truck } from 'lucide-react';
import TruckCard from "../components/trucks/TruckCard.jsx"
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios.js';
import { Link } from 'react-router-dom';

function HomePage() {

  const {data: trucks } = useQuery({
    queryKey: ["trucks"],
    queryFn: async () => {
      const res = await axiosInstance.get("/trucks");
      return res.data;
    }
  })

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex justify-between gap-4'>
        {/* Header */}
        <div className='flex flex-col gap-2'>
          <h1 className='font-bold text-4xl'>Worksheets</h1>
          <h3 className='text-sm text-gray-600'>Manage truck worksheets</h3>
        </div>
        <Link to={"/worksheets/create"} className='btn btn-ghost btn-soft'>+ New Worksheet</Link>
      </div>

      {/* Stat Cards */}
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <StatCard title="Total Worksheets" value={25} icon={Truck} iconBg={"bg-blue-50"} stripeColor={"bg-blue-600"} iconColor={'text-blue-700'}/>
        <StatCard title="Drafts" value={25} icon={DraftingCompass} iconBg={"bg-orange-50"} stripeColor={"bg-orange-600"} iconColor={'text-orange-700'}/>
        <StatCard title="In-Progress" value={25} icon={Hourglass} iconBg={"bg-purple-50"} stripeColor={"bg-purple-600"} iconColor={'text-purple-700'}/>
        <StatCard title="Completed" value={25} icon={CircleCheckBig} iconBg={"bg-green-50"} stripeColor={"bg-green-600"} iconColor={'text-green-700'}/>
      </div>

      <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-4'>  
        {trucks?.map((truck) => (
          <TruckCard truck={truck} key={truck._id}/>
        ))}
      </div>

    </div>
  )
}

export default HomePage