import { Link, useNavigate } from "react-router-dom";
import { Home, LogOut, PencilRuler, Settings, Truck, User, } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { useCurrentUser } from "../../hooks/useCurrentUser";

const Navbar = () => {

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const { data: current_user } = useCurrentUser();

    const { mutate: logout } = useMutation({
        mutationFn: () => axiosInstance.post("/auth/logout"),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['current_user'] });
            navigate("/login");
        },
    });

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">

                    {/* MOBILE */}
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link className='flex items-center space-x-1 text-sm btn btn-ghost' to={"/"}>
                                <Home size={20} />
                                <span className='hidden md:inline'>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link className='flex items-center space-x-1 text-sm btn btn-ghost' to={"/worksheets"}>
                                <PencilRuler size={20} />
                                <span className='hidden md:inline'>Worksheets</span>
                            </Link>
                            <ul className="p-2">
                                <li><Link to={"/worksheets"}>View Worksheets</Link></li>
                                <li><Link to={"/worksheets/create"}>Create Worksheet</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link className='flex items-center space-x-1 text-sm btn btn-ghost' to={"/trucks"}>
                                <Truck size={20} />
                                <span className='hidden md:inline'>Trucks</span>
                            </Link>
                        </li>
                        <li>
                            <Link className={`flex items-center space-x-1 text-sm btn btn-ghost ${current_user?.role !== "admin" ? "opacity-50 pointer-events-none" : ""}`} to={"/admin"}>
                                <Settings size={20} />
                                <span className='hidden md:inline'>Admin</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Project O</a>
            </div>

            {/* FULL SIZE */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link className='flex items-center space-x-1 text-sm btn btn-ghost' to={"/"}>
                            <Home size={20} />
                            <span className='hidden md:inline'>Home</span>
                        </Link>
                    </li>
                    <li>
                        <details>
                            <summary className="flex items-center space-x-1 text-sm btn btn-ghost">
                                <PencilRuler size={20} />
                                <span className='hidden md:inline'>Worksheets</span>
                            </summary>
                            <ul className="p-2">
                                <li><Link to={"/worksheets"}>View Worksheets</Link></li>
                                <li><Link to={"/worksheets/create"}>Create Worksheet</Link></li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <Link className='flex items-center space-x-1 text-sm btn btn-ghost' to={"/trucks"}>
                            <Truck size={20} />
                            <span className='hidden md:inline'>Trucks</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={`flex items-center space-x-1 text-sm btn btn-ghost ${current_user?.role !== "admin" ? "opacity-50 pointer-events-none" : ""}`} to={"/admin"}>
                            <Settings size={20} />
                            <span className='hidden md:inline'>Admin</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                {current_user ? (
                    <div className='flex gap-4'>
                        <Link className='flex items-center space-x-1 text-sm btn h-full' to={"/profile"}>
                            <div className="avatar avatar-online">
                                <div className="w-10 rounded-full">
                                    <img src={current_user.profilePicture || "/avatar.png"} />
                                </div>
                            </div>
                            <span className='hidden md:inline font-semibold'>{current_user.name}</span>
                        </Link>
                        <button className='flex items-center space-x-1 text-sm btn btn-secondary' onClick={() => logout()}>
                            <LogOut size={20} />
                            <span className='hidden md:inline'>Logout</span>
                        </button>
                    </div>
                ) :
                    (<>
                        <Link to='/login' className='btn btn-ghost'>
                            Sign In
                        </Link>
                        <Link to='/signup' className='btn btn-primary'>
                            Join now
                        </Link>
                    </>)}
            </div>
        </div>

    );
};
export default Navbar;