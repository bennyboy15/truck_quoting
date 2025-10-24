import { useLocation } from "react-router-dom";
import Navbar from "../layout/Navbar";

function Layout({children}) {
  const location = useLocation();
  const authRoutes = ['/login', '/signup'];
  const showNavbar = !authRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-base-100">
        {showNavbar && <Navbar/>}
        <main className="max-w-7xl mx-auto px-4 py-6">
            {children}
        </main>
    </div>
  )
}

export default Layout