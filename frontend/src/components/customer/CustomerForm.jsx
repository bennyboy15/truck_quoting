import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios.js";
import toast from "react-hot-toast";

export default function TruckForm() {

    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        name: "",
        code: "",
        email: "",
        phone: "",
        address: "",
    });

    const {mutate: createCustomer, isPending} = useMutation({
        mutationFn: async (data) => {
            await axiosInstance.post("/customer", data)
        },
        onSuccess: () => {
            toast.success("Created new customer");
            queryClient.invalidateQueries({queryKey: ["customers"]});
            clearForm();
        },
        onError: (error) => {
            toast.error(error.response.data.message || "Something went wrong");
        }
    })

    function handleChange(e) {
        const { name, value } = e.target;
        console.log(name, value);
        setForm((s) => ({ ...s, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        createCustomer(form);
    }

    function clearForm(e) {
        if (e) e.preventDefault(); // make this conditional so when it is called from mutation onSuccess it does not pass an event
        setForm({
            name: "",
            code: "",
            email: "",
            phone: "",
            address: "",
        })
    }

    return (
        <div className="card bg-base-100">
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Name</span></label>
                            <input name="name" value={form.name} onChange={handleChange} required className="input input-bordered bg-white w-full" />
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text">Code</span></label>
                            <input name="code" value={form.code} onChange={handleChange} required className="input input-bordered bg-white w-full" />
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input name="email" value={form.email} onChange={handleChange} className="input input-bordered bg-white w-full" type="email"/>
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text">Phone</span></label>
                            <input name="phone" value={form.phone} onChange={handleChange} className="input input-bordered bg-white w-full"/>
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text">Address</span></label>
                            <input name="address" value={form.address} onChange={handleChange} className="input input-bordered bg-white w-full" />
                        </div>

                    </div>

                    <div className="flex gap-2 justify-end mt-5">
                        <button type="button" onClick={clearForm} className="btn btn-ghost">Reset</button>

                        <button type="submit" className={`btn btn-primary ${isPending ? "loading" : ""}`} disabled={isPending}>
                            {isPending ? "Creating..." : "Create Customer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}