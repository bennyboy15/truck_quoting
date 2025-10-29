import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react'
import { axiosInstance } from '../../lib/axios';
import toast from 'react-hot-toast';

function TruckMakeForm() {

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [make, setMake] = useState("");

    const queryClient = useQueryClient();

    const { data: truckMakes } = useQuery({
        queryKey: ["truckMakes"],
        queryFn: async () => {
            const res = await axiosInstance.get("/trucks/make");
            console.log(res.data);
            return res.data;
        }
    })

    const { mutate: createModel } = useMutation({
        mutationFn: async (data) => {
            return await axiosInstance.post("/trucks/model", data);
        },
        onSuccess: () => {
            toast.success("Successfully created new truck model");
            queryClient.invalidateQueries({ queryKey: ["truckModels"] });
            setName("");
            setCategory("");
            setMake("");
        },
        onError: (error) => {
            toast.error(error.response.data.message || "Something went wrong");
        }
    })

    function handleSubmit(e) {
        e.preventDefault();
        createModel({ name, category, make });
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

                    {/* CATEGORY */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Category</span></label>
                            <input name="code" value={category} onChange={(e) => setCategory(e.target.value)} required className="input input-bordered" />
                        </div>
                    </div>

                    {/* MAKE */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Make</span></label>
                            <fieldset className="fieldset">
                                <select defaultValue="Pick a browser" className="select border-2 border-base-500" onChange={(e) => setMake(e.target.value)}>
                                    <option disabled={true}>Pick a make</option>
                                    {truckMakes?.map((make) => (
                                        <option key={make._id}>{make.name}</option>
                                    ))}
                                </select>
                            </fieldset>
                        </div>
                    </div>

                    <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default TruckMakeForm