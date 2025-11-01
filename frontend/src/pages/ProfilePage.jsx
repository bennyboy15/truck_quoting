import { useCurrentUser } from "../hooks/useCurrentUser";
import { UserPen, Mail, Phone, Truck, DollarSign, Calendar, CircleX } from "lucide-react";
import StatCard from "../components/StatCard";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export default function ProfilePage() {

    const [isEditing, setIsEditing] = useState(false);
    const { data: current_user } = useCurrentUser();

    const [name, setName] = useState(current_user.name);
    const [email, setEmail] = useState(current_user.email);
    const [phone, setPhone] = useState(current_user.phone);

    const queryClient = useQueryClient();

    const { mutate: updateProfile } = useMutation({
        mutationFn: async (data) => {
            return await axiosInstance.post("/user/update-profile", data)
        },
        onSuccess: () => {
            toast.success("Successfully updated profile");
            setIsEditing(false);
            queryClient.invalidateQueries({ queryKey: ["current_user"] });
        },
        onError: (error) => {
            toast.error(error.response.data.message || "Something went wrong when updating profile");
        }
    });

    function handleEdit(e) {
        e.preventDefault();
        updateProfile({ name, email, phone });
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="md:col-span-1">
                <div className="card bg-base-100 shadow-lg border border-base-300">
                    <figure className="px-4 pt-4">
                        <img
                            src={current_user.profilePicture || "/avatar.png"}
                            alt="Profile Picture"
                            className="rounded-xl h-48 w-48 object-cover"
                        />
                    </figure>
                    <div className="card-body">
                        <div className="card-actions justify-between items-center">

                            {isEditing ?
                                (
                                    <div className="flex gap-2 w-full">
                                        <label className="input flex-2">
                                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <g
                                                    strokeLinejoin="round"
                                                    strokeLinecap="round"
                                                    strokeWidth="2.5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                >
                                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                                    <circle cx="12" cy="7" r="4"></circle>
                                                </g>
                                            </svg>
                                            <input
                                                type="text"
                                                required
                                                title="Only letters, numbers or dash"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </label>
                                        <button className="btn btn-error btn-sm h-10" onClick={() => setIsEditing(false)}>
                                            <CircleX size={18} /> Cancel
                                        </button>
                                    </div>
                                ) :
                                (
                                    <>
                                        <h2 className="card-title">{current_user.name}</h2>
                                        <button className="btn btn-primary btn-sm" onClick={() => setIsEditing(true)}>
                                            <UserPen size={18} /> Edit
                                        </button>
                                    </>)
                            }
                        </div>
                        <div className="divider my-1"></div>
                        <div className="space-y-2">
                            {!isEditing ?
                                (<>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Mail size={16} className="opacity-70" />
                                        <span>{current_user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Phone size={16} className="opacity-70" />
                                        <span>{current_user.phone}</span>
                                    </div>
                                </>
                                ) :
                                (
                                    <form onSubmit={handleEdit} className="flex flex-col items-center gap-2 w-full">
                                        <div className="text-sm  w-full">
                                            <label className="input w-full">
                                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <g
                                                        strokeLinejoin="round"
                                                        strokeLinecap="round"
                                                        strokeWidth="2.5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                    >
                                                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                                    </g>
                                                </svg>
                                                <input type="email" placeholder="mail@site.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </label>
                                        </div>
                                        <div className="text-sm w-full">
                                            <label className="input w-full">
                                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                    <g fill="none">
                                                        <path
                                                            d="M7.25 11.5C6.83579 11.5 6.5 11.8358 6.5 12.25C6.5 12.6642 6.83579 13 7.25 13H8.75C9.16421 13 9.5 12.6642 9.5 12.25C9.5 11.8358 9.16421 11.5 8.75 11.5H7.25Z"
                                                            fill="currentColor"
                                                        ></path>
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M6 1C4.61929 1 3.5 2.11929 3.5 3.5V12.5C3.5 13.8807 4.61929 15 6 15H10C11.3807 15 12.5 13.8807 12.5 12.5V3.5C12.5 2.11929 11.3807 1 10 1H6ZM10 2.5H9.5V3C9.5 3.27614 9.27614 3.5 9 3.5H7C6.72386 3.5 6.5 3.27614 6.5 3V2.5H6C5.44771 2.5 5 2.94772 5 3.5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V3.5C11 2.94772 10.5523 2.5 10 2.5Z"
                                                            fill="currentColor"
                                                        ></path>
                                                    </g>
                                                </svg>
                                                <input
                                                    type="tel"
                                                    className="tabular-nums"
                                                    required
                                                    placeholder="Phone"
                                                    pattern="[0-9]*"
                                                    minLength="10"
                                                    maxLength="10"
                                                    title="Must be 10 digits"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                            </label>
                                        </div>
                                        <button className="btn btn-success w-full">Save</button>
                                    </form>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="md:col-span-2 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Total Trucks Card */}
                    <StatCard title="Total Trucks" value={25} icon={Truck} iconBg={"red"} />

                    {/* Revenue Card */}
                    <StatCard title="Revenue" value={"$15k"} icon={DollarSign} iconBg={"secondary"} />

                    {/* Active Quotes Card */}
                    <StatCard title="Active Quotes" value={12} icon={Calendar} iconBg={"accent"} />
                </div>

                {/* Additional Stats Section */}
                <div className="card bg-base-100 shadow-lg border border-base-300">
                    <div className="card-body">
                        <h3 className="card-title">Recent Activity</h3>
                        <div className="text-base-content/60 text-center py-8">
                            Activity stats will be added here
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    );
}