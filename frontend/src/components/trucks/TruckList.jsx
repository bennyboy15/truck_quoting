import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { axiosInstance } from '../../lib/axios'
import Status from '../Status'

function TruckList() {

    const { data: trucks } = useQuery({
        queryKey: ["trucks"],
        queryFn: async () => {
            const res = await axiosInstance.get("/trucks");
            return res.data
        }
    })

    return (
        <div className="bg-white overflow-x-auto border border-base-300 rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-101">

            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Customer</th>
                        <th>Stock/Chassis</th>
                        <th>Model</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {trucks?.map((truck) => (
                        <tr key={truck._id} className='transition-transform duration-300 ease-in-out hover:scale-99'>
                            <th>
                                <label>
                                    <Status status={truck.status}/>
                                </label>
                            </th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="w-15 h-10 rounded-box">
                                            <img
                                                src="/t410sar.jpg"
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">Customer Name</div>
                                        <div className="text-sm opacity-50">{truck.stockNo} {truck.chassis}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {truck.stockNo} {truck.chassisNo}
                                <br />
                            </td>
                            <td>{truck.model?.name || "N/A"}</td>
                            <th className='flex justify-end'>
                                <button className="btn btn-primary-content btn-xs">View</button>
                            </th>
                        </tr>
                    ))}
                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Total</th>
                        <th></th>
                        <th>{trucks?.length || "N/A"}</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default TruckList