import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react'
import { axiosInstance } from '../../lib/axios';
import toast from 'react-hot-toast';
function TruckMakeForm() {

    const [name, setName] = useState("");
    const [code, setCode] = useState("");

    const queryClient = useQueryClient();

    const {mutate: createMake} = useMutation({
        mutationFn: async (data) => {
            return await axiosInstance.post("/trucks/make", data);
        },
        onSuccess: ()=>{
            toast.success("Successfully created new truck make");
            queryClient.invalidateQueries({queryKey: ["truckMakes"]});
            setName("");
            setCode("");
        }, 
        onError: (error) => {
            toast.error(error.response.data.message || "Something went wrong");
        }
    })

    function handleSubmit(e) {
        e.preventDefault();
        createMake({name, code});
    }

    return (
        <div className='card bg-base-100 w-full'>
            <div className="card-body">
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* NAME */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Name</span></label>
                            <input name="name" value={name} onChange={(e) => setName(e.target.value)} required className="input input-bordered" />
                        </div>
                    </div>

                    {/* CODE */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Code</span></label>
                            <input name="code" value={code} onChange={(e) => setCode(e.target.value)} required className="input input-bordered" />
                        </div>
                    </div>

                    <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default TruckMakeForm