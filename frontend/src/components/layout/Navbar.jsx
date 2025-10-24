import { Link } from "react-router-dom";
import { Bell, Home, LogOut, User, Users } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { useCurrentUser } from "../../hooks/useCurrentUser";

const Navbar = () => {

    const queryClient = useQueryClient();

    const { data: current_user } = useCurrentUser();

    const { mutate: logout } = useMutation({
		mutationFn: () => axiosInstance.post("/auth/logout"),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['current_user'] });
		},
	});

    return (
        <nav className='bg-base-100 shadow-md sticky top-0 z-10'>
            <div className='max-w-7xl mx-auto px-4'>
                <div className='flex justify-between items-center py-3'>
                    <div className='flex items-center space-x-4'>
                        <Link to='/'>
                            <img className='h-8 rounded' src='/small-logo.png' alt='Company Logo' />
                        </Link>
                    </div>
                    <div className='flex items-center gap-2 md:gap-6'>
                        {current_user ? (<button
                            className='flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800'
                            onClick={() => logout()}
                        >
                            <LogOut size={20} />
                            <span className='hidden md:inline'>Logout</span>
                        </button>) :
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
            </div>
        </nav>
    );
};
export default Navbar;