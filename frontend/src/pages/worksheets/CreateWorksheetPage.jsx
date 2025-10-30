import React from 'react'
import {useQuery} from "@tanstack/react-query"

function CreateWorksheetPage() {

  const {data:truckMakes} = useQuery({
    queryKey: ["truckMakes"]
  })

  return (
    <div className='flex gap-5'>
      {truckMakes?.map((make) => (
        <button key={make._id} className='btn btn-primary'>{make.name}</button>
      ))}
    </div>
  )
}

export default CreateWorksheetPage