import React from 'react'
import { useQuery } from "@tanstack/react-query"
import WorksheetForm from '../../components/worksheets/WorksheetForm'

function CreateWorksheetPage() {

  const { data: truckMakes } = useQuery({
    queryKey: ["truckMakes"]
  });

  return (
    <div className='flex flex-col gap-5'>
      
      {/* MAKE SELECT */}
      <div className='flex gap-5'>
        {truckMakes?.map((make) => (
          <button key={make._id} className='btn btn-primary'>{make.name}</button>
        ))}
      </div>
        
      <WorksheetForm />

    </div>
  )
}

export default CreateWorksheetPage