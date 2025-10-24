import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react"
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function SignUpPage() {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const queryClient = useQueryClient();

    const { mutate: signup, isLoading } = useMutation({
        mutationFn: async (data) => {
            return await axiosInstance.post("/auth/signup", data);
        },
        onSuccess: () => {
            toast.success("Successfully signed up");
            queryClient.invalidateQueries({ queryKey: ["current_user"] });
            setName("");
            setUsername("");
            setEmail("");
            setPhone("");
            setPassword("");
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    })

    function handleSubmit(e) {
        e.preventDefault();
        signup({ name, username, email, phone, password});
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center">

                    <div className="card border border-base-300 w-full max-w-md bg-base-100 shadow-xl">
                        <div className="card-body p-8">
                            <h2 className="card-title">Hi there!</h2>
                            <p className="text-sm text-base-content/60 mb-4">Enter your details to signup</p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Full Name</span>
                                    </label>
                                    <div className="relative">
                                        <svg className="absolute left-3 top-3 h-5 w-5 opacity-60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        <input
                                            className="input input-bordered w-full pl-10"
                                            type="text"
                                            required
                                            placeholder="Full Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            aria-label="name"
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Username</span>
                                    </label>
                                    <div className="relative">
                                        <svg className="absolute left-3 top-3 h-5 w-5 opacity-60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        <input
                                            className="input input-bordered w-full pl-10"
                                            type="text"
                                            required
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            aria-label="username"
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <div className="relative">
                                        <svg className="absolute left-3 top-3 h-5 w-5 opacity-60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        <input
                                            className="input input-bordered w-full pl-10"
                                            type="email"
                                            required
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            aria-label="email"
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Phone</span>
                                    </label>
                                    <div className="relative">
                                        <svg className="absolute left-3 top-3 h-5 w-5 opacity-60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        <input
                                            className="input input-bordered w-full pl-10"
                                            type="phone"
                                            required
                                            placeholder="Phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            aria-label="phone"
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <div className="relative">
                                        <svg className="absolute left-3 top-3 h-5 w-5 opacity-60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                                            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                        </svg>
                                        <input
                                            className="input input-bordered w-full pl-10"
                                            type="password"
                                            required
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            aria-label="password"
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <button
                                        className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Signing up..." : "Sign Up"}
                                    </button>
                                </div>
                            </form>

                            <div className="divider">OR</div>

                            <div className="flex gap-3">
                                <Link to={"/login"} className="btn btn-outline w-full">Log In</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SignUpPage