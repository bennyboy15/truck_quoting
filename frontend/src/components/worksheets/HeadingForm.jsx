import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios.js";
import toast from "react-hot-toast";

export default function HeadingForm() {

    const queryClient = useQueryClient();

    const { data: sections, isPending: isSectionsLoading } = useQuery({
        queryKey: ["sections"],
        queryFn: async () => {
            const res = await axiosInstance.get("/worksheet/section");
            return res.data;
        }
    });

    const [form, setForm] = useState({
        name: "",
        section: "",
        orderId: 0  // Start at 0 or 1 instead of -1
    });

    const { mutate: createHeading, isPending } = useMutation({
        mutationFn: async (data) => {
            // Ensure section is a string
            const payload = {
                ...data,
                section: String(data.section)
            };
            await axiosInstance.post("/worksheet/heading", payload);
        },
        onSuccess: () => {
            toast.success("Created new heading");
            queryClient.invalidateQueries({ queryKey: ["headings"] });
            clearForm();
        },
        onError: (error) => {
            toast.error(error.response.data.message || "Something went wrong");
        }
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        // Validate form
        if (!form.name.trim()) {
            toast.error("Name is required");
            return;
        }

        if (!form.section) {
            toast.error("Please select a section");
            return;
        }

        // Ensure orderId is a positive number
        const orderId = parseInt(form.orderId);
        if (isNaN(orderId) || orderId < 0) {
            toast.error("Order ID must be a positive number");
            return;
        }

        createHeading({
            name: form.name,
            section: String(form.section), // Ensure section is a string
            orderId: orderId
        });
    }

    function clearForm(e) {
        if (e) e.preventDefault(); // make this conditional so when it is called from mutation onSuccess it does not pass an event
        setForm({
            name: "",
            section: "",
            orderId: 0
        })
    }

    return (
        <div className="card bg-base-100">
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/*  */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Name</span></label>
                            <input name="name" value={form.name} onChange={handleChange} required className="input input-bordered bg-white w-full" />
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text">Section</span></label>
                            <select
                                name="section"
                                value={form.section}
                                onChange={handleChange}
                                required
                                className="select select-bordered w-full bg-white"
                            >
                                <option value="">{isSectionsLoading ? "Loading sections..." : "Select section"}</option>
                                {sections?.map((section) => (
                                    <option key={section._id} value={section._id}>{section.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text">Order ID</span></label>
                            <input name="orderId" value={form.orderId} onChange={handleChange} className="input input-bordered bg-white w-full" type="number" />
                        </div>

                    </div>

                    <div className="flex gap-2 justify-end mt-5">
                        <button type="button" onClick={clearForm} className="btn btn-ghost">Reset</button>

                        <button type="submit" className={`btn btn-primary ${isPending ? "loading" : ""}`} disabled={isPending}>
                            {isPending ? "Creating..." : "Create Section"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}