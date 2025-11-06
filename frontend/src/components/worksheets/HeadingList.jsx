import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '../../lib/axios'

function HeadingList() {

    const { data: headings } = useQuery({
        queryKey: ['headings'],
        queryFn: async () => {
            const res = await axiosInstance.get("/worksheet/heading");
            return res.data;
        }
    })

    return (
        <div className="bg-white overflow-x-auto border border-base-300 rounded">

            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {headings?.map((heading) => (
                        <tr key={heading._id} className='transition-transform duration-300 ease-in-out hover:scale-99'>
                            <td>{heading.orderId}</td>
                            <td>{heading.name}</td>
                            <td>{heading.section.name || "N/A"}</td>
                            <th className='flex justify-end'>
                                <button className="btn btn-primary-content btn-xs">Edit</button>
                            </th>
                        </tr>
                    ))}
                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th>Total</th>
                        <th>{headings?.length || "N/A"}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default HeadingList