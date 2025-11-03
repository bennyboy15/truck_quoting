import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '../../lib/axios'

function SectionList() {

    const { data: sections } = useQuery({
        queryKey: ['sections'],
        queryFn: async () => {
            const res = await axiosInstance.get("/worksheet/section");
            return res.data;
        }
    })

    return (
        <div className="bg-white overflow-x-auto border border-base-300 rounded shadow-lg transition-transform duration-300 ease-in-out hover:scale-101">

            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Section ID</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {sections?.map((section) => (
                        <tr key={section._id} className='transition-transform duration-300 ease-in-out hover:scale-99'>
                            <td>{section.section_id}</td>
                            <td>{section.name}</td>
                            <td>{section.description || "N/A"}</td>
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
                        <th>{sections?.length || "N/A"}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default SectionList