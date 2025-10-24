import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/auth/LoginPage"
import Layout from "./components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { axiosInstance } from "./lib/axios";


function App() {

  const {data: current_user} = useQuery({
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
    }
  );

  return (
    <Layout>
      <Routes>
        <Route path={"/"} element={current_user ? <HomePage /> : <LoginPage />} />
        <Route path={"/login"} element={!current_user ? <LoginPage /> : <HomePage />} />
      </Routes>
      <Toaster/>
    </Layout>
  );
}

export default App
