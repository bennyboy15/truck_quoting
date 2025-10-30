import { useQuery } from '@tanstack/react-query';
import React from 'react'

function TruckMakeList() {

    const { data: truckMakes } = useQuery({
        queryKey: ["truckMakes"]
    });

  return (
    <div className="overflow-x-auto border border-base-300 rounded shadow-lg transition-transform duration-300 ease-in-out hover:scale-101">

            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Code</th>
                    </tr>
                </thead>
                <tbody>
                    {truckMakes?.map((make) => (
                        <tr key={make._id} className='transition-transform duration-300 ease-in-out hover:scale-99'>
                            <td>{make.name}</td>
                            <td>{make.code || "N/A"}</td>
                            <td></td>
                            <th className='flex justify-end'>
                                <button className="btn btn-primary-content btn-xs">View</button>
                            </th>
                        </tr>
                    ))}
                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th>Total</th>
                        <th>{truckMakes?.length || "N/A"}</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
  )
}

export default TruckMakeList