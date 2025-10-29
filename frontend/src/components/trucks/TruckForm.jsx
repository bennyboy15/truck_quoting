import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios.js";
import toast from "react-hot-toast";

export default function TruckForm() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    stockNo: "",
    chassisNo: "",
    fleetNo: "",
    registration: "",
    offlineDate: "",
    deliveryDate: "",
    truckColour: "",
    chassisColour: "",
    trimColour: "",
    model: "",
  });

  const { data: modelsData, isLoading: modelsLoading } = useQuery({
    queryKey: ["truckModels"],
    queryFn: async () => {
      const res = await axiosInstance.get("/trucks/model");
      console.log("Models data:", res.data);
      return res.data;
    },
  });

  const { mutate: createTruck, isLoading } = useMutation({
    mutationFn: async (data) => {
      return axiosInstance.post("/trucks/truck", data);
    },
    onSuccess: () => {
      toast.success("Truck created");
      queryClient.invalidateQueries({ queryKey: ["trucks"] });
      setForm({
        stockNo: "",
        chassisNo: "",
        fleetNo: "",
        registration: "",
        offlineDate: "",
        deliveryDate: "",
        truckColour: "#ffffff",
        chassisColour: "#ffffff",
        trimColour: "#ffffff",
        model: "",
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create truck");
    },
  });

  function handleChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    createTruck(form);
  }

  function clearForm(e) {
    e.preventDefault();
    setForm({
              stockNo: "",
              chassisNo: "",
              fleetNo: "",
              registration: "",
              offlineDate: "",
              deliveryDate: "",
              truckColour: "",
              chassisColour: "",
              trimColour: "",
              model: "",
            })
  }

  return (
    <div className="card bg-base-100 shadow-md border border-base-300">
      <div className="card-body">
        <h3 className="card-title">Create Truck</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Stock No</span></label>
              <input name="stockNo" value={form.stockNo} onChange={handleChange} required className="input input-bordered" />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Chassis No</span></label>
              <input name="chassisNo" value={form.chassisNo} onChange={handleChange} required className="input input-bordered" />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Fleet No</span></label>
              <input name="fleetNo" value={form.fleetNo} onChange={handleChange} className="input input-bordered" />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Registration</span></label>
              <input name="registration" value={form.registration} onChange={handleChange} className="input input-bordered" />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Offline Date</span></label>
              <input name="offlineDate" value={form.offlineDate} onChange={handleChange} type="date" className="input input-bordered" />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Delivery Date</span></label>
              <input name="deliveryDate" value={form.deliveryDate} onChange={handleChange} type="date" className="input input-bordered" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Truck Colour</span></label>
              <input name="truckColour" value={form.truckColour} onChange={handleChange} type="color" className="w-full h-10 p-0 rounded-md" />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Chassis Colour</span></label>
              <input name="chassisColour" value={form.chassisColour} onChange={handleChange} type="color" className="w-full h-10 p-0 rounded-md" />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Trim Colour</span></label>
              <input name="trimColour" value={form.trimColour} onChange={handleChange} type="color" className="w-full h-10 p-0 rounded-md" />
            </div>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Model</span></label>
            <select
              name="model"
              value={form.model}
              onChange={handleChange}
              required
              className="select select-bordered"
            >
              <option value="">{modelsLoading ? "Loading models..." : "Select model"}</option>
              {modelsData?.map((model) => (
                <option key={model._id} value={model._id}>{model.name} {model.category ? `(${model.category})` : ""}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 justify-end">
            <button type="button" onClick={clearForm} className="btn btn-ghost">Reset</button>

            <button type="submit" className={`btn btn-primary ${isLoading ? "loading" : ""}`} disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Truck"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}