import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios.js";
import toast from "react-hot-toast";

export default function SectionForm() {

    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        name: "",
        section_id: "",
        description: ""
    });

    const { mutate: createSection, isPending } = useMutation({
        mutationFn: async (data) => {
            await axiosInstance.post("/worksheet/section", data)
        },
        onSuccess: () => {
            toast.success("Created new section");
            queryClient.invalidateQueries({ queryKey: ["sections"] });
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
        createSection(form);
    }

    function clearForm(e) {
        if (e) e.preventDefault(); // make this conditional so when it is called from mutation onSuccess it does not pass an event
        setForm({
            name: "",
            section_id: "",
            description: ""
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
                            <label className="label"><span className="label-text">Section ID</span></label>
                            <input name="section_id" value={form.section_id} onChange={handleChange} required className="input input-bordered bg-white w-full" type="number"/>
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text">Description</span></label>
                            <input name="description" value={form.description} onChange={handleChange} className="input input-bordered bg-white w-full" />
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