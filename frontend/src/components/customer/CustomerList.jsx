import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { axiosInstance } from '../../lib/axios';

function CustomerList() { // Also fixed the component name from TruckMakeList

    const { data: customers } = useQuery({
        queryKey: ["customers"],
        queryFn: async () => {
            const res = await axiosInstance.get("/customer")
            return res.data;
        }
    });

    return (
        <div className="bg-white overflow-x-auto border border-base-300 rounded">
            <table className="table w-full table-fixed text-xs">
                {/* head */}
                <thead>
                    <tr>
                        <th className="w-1/6">Name</th>
                        <th className="w-1/12">Code</th>
                        <th className="w-1/6">Email</th>
                        <th className="w-1/6">Phone</th>
                        <th className="w-1/3">Address</th>
                        <th className="w-1/12"></th>
                    </tr>
                </thead>
                <tbody>
                    {customers?.map((customer) => (
                        <tr key={customer._id} className='hover:bg-base-100'>
                            <td className="truncate">{customer.name}</td>
                            <td className="truncate">{customer.code || "N/A"}</td>
                            <td className="truncate">{customer.email}</td>
                            <td className="truncate">{customer.phone || "N/A"}</td>
                            <td className="truncate">{customer.address || "N/A"}</td>
                            <td>
                                <div className="flex justify-end">
                                    <button className="btn btn-ghost btn-xs">View</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total</th>
                        <th colSpan="5">{customers?.length || 0} customers</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default CustomerList