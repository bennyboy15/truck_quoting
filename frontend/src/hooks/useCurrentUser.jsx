import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["current_user"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data
      } catch (error) {
        if (error.response && error.response.status === 401) {
          return null;
        }
        console.log("Error trying to get current_user in App.jsx");
        toast.error(error.response.data.message || "Something went wrong");
      }
    },
  });
}