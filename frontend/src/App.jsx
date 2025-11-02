import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/auth/LoginPage"
import Layout from "./components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { axiosInstance } from "./lib/axios";
import SignUpPage from "./pages/auth/SignUpPage";
import WorksheetsPage from "./pages/worksheets/WorksheetsPage";
import ProfilePage from "./pages/ProfilePage";
import CreateWorksheetPage from "./pages/worksheets/CreateWorksheetPage";
import IndividualWorksheetPage from "./pages/worksheets/IndividualWorksheetPage";
import TrucksPage from "./pages/trucks/TrucksPage";
import SchedulePage from "./pages/schedule/SchedulePage.jsx"
import AdminPage from "./pages/admin/AdminPage";

function App() {

  const { data: current_user } = useQuery({
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

  // Protected route for roles
  function ProtectedRoute({ user, requiredRole, children }) {
    if (!user) {
      // Not logged in
      return <Navigate to="/login" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
      // Logged in but wrong role
      return <Navigate to="/" replace />;
    }

    // User is logged in and has correct role
    return children;
  }

  return (
    <Layout>
      <Routes>

        <Route path={"/"} element={current_user ? <HomePage /> : <Navigate to={"/login"} />} />
        <Route path={"/login"} element={!current_user ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path={"/signup"} element={!current_user ? <SignUpPage /> : <Navigate to={"/"} />} />
        <Route path={"/profile"} element={current_user ? <ProfilePage /> : <Navigate to={"/login"} />} />

        <Route path={"/worksheets"} element={current_user ? <WorksheetsPage /> : <Navigate to={"/login"} />} />
        <Route path={"/worksheets/:id"} element={current_user ? <IndividualWorksheetPage /> : <Navigate to={"/login"} />} />
        <Route path={"/worksheets/create"} element={current_user ? <CreateWorksheetPage /> : <Navigate to={"/login"} />} />

        <Route path={"/trucks"} element={current_user ? <TrucksPage /> : <Navigate to={"/login"} />} />

        <Route path={"/schedule"} element={current_user ? <SchedulePage /> : <Navigate to={"/login"} />} />

        <Route path={"/admin"} element={
          <ProtectedRoute user={current_user} requiredRole="admin">
            <AdminPage />
          </ProtectedRoute>}
        />

      </Routes>
      <Toaster />
    </Layout>
  );
}

export default App
