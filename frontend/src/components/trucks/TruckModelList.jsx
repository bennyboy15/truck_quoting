import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { axiosInstance } from '../../lib/axios'

function TruckModelList() {

    const {data:truckModels} = useQuery({
        queryKey: ["truckModels"],
        queryFn: async () => {
            const res = axiosInstance.get("trucks/model");
            return res.data
        }
    });

    return (
        <div className="bg-white overflow-x-auto border border-base-300 rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-101">

            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Make</th>
                        <th>Name</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {truckModels?.map((model) => (
                        <tr key={model._id} className='transition-transform duration-300 ease-in-out hover:scale-99'>
                            <td>{model.make.name}</td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="w-15 h-10 rounded-box">
                                            <img
                                                src={`/${model.name.toLowerCase()}.jpg`}
                                                alt={model.name} />
                                        </div>
                                    </div>
                                        <div className="font-bold">{model.name}</div>
                                </div>
                            </td>
                            <td>{model.category || "N/A"}</td>
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
                        <th>{truckModels?.length || "N/A"}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
  )
}

export default TruckModelList