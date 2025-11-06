import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from '../../lib/axios';
import toast from "react-hot-toast";

export default function OptionsList() {
  const queryClient = useQueryClient();

  const { data: options = [], isLoading } = useQuery({
    queryKey: ["options"],
    queryFn: async () => {
      const res = await axiosInstance.get("/worksheet/options");
      return res.data;
    },
    staleTime: 1000 * 60 * 2,
  });

  const { mutate: deleteOption, isLoading: isDeleting } = useMutation({
    mutationFn: async (id) => {
      return axiosInstance.delete(`/worksheet/options/${id}`);
    },
    onSuccess: () => {
      toast.success("Option deleted");
      queryClient.invalidateQueries({ queryKey: ["options"] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Delete failed");
    },
  });

  if (isLoading) {
    return (
      <div className="card bg-base-100 shadow-md p-4">
        <div className="animate-pulse h-8 w-32 bg-base-200 rounded mb-2" />
        <div className="h-4 bg-base-200 rounded my-1" />
      </div>
    );
  }

  return (
    <div className="card bg-white shadow-md border border-base-300">
      <div className="card-body">
        <h3 className="card-title">Options</h3>
        {options.length === 0 ? (
          <div className="text-sm text-base-content/60 py-4">No options found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Label</th>
                  <th>Value</th>
                  <th>Heading</th>
                  <th>Make</th>
                  <th>Model</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {options.map((opt) => (
                  <tr key={opt._id}>
                    <td>{opt.label}</td>
                    <td>{opt.value}</td>
                    <td>{opt.heading?.name ?? opt.heading}</td>
                    <td>{opt.make?.name ?? "-"}</td>
                    <td>{opt.model?.name ?? "-"}</td>
                    <td className="text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          className="btn btn-sm btn-ghost"
                          onClick={() => {
                            navigator.clipboard?.writeText(opt._id);
                            toast.success("Option id copied");
                          }}
                          title="Copy id"
                        >
                          Copy
                        </button>

                        <button
                          className="btn btn-sm btn-error"
                          onClick={() => {
                            if (confirm("Delete this option?")) deleteOption(opt._id);
                          }}
                          disabled={isDeleting}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}