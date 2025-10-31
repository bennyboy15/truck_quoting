import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { axiosInstance } from '../../lib/axios';

function TruckMakeList() {

    const { data: customers } = useQuery({
        queryKey: ["customers"],
        queryFn: async () => {
            const res = await axiosInstance.get("/customer")
            return res.data;
        }
    });

  return (
    <div className="overflow-x-auto border border-base-300 rounded shadow-lg transition-transform duration-300 ease-in-out hover:scale-101">

            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {customers?.map((customer) => (
                        <tr key={customer._id} className='transition-transform duration-300 ease-in-out hover:scale-99'>
                            <td>{customer.name}</td>
                            <td>{customer.code || "N/A"}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone || "N/A"}</td>
                            <td>{customer.address || "N/A"}</td>
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
                        <th>{customers?.length || "N/A"}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
  )
}

export default TruckMakeList