import { signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { auth } from "../firebase";
import { toast } from "react-toastify";

export default function Signin() {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login successful", {
                position: "top-right",
            });
            setLoading(false);
            navigate("/");
        } catch (error) {
            let errorMessage = "Invalid email or password";
            if (error.code === "auth/user-not-found") {
                errorMessage = "User not found";
            }
            toast.error(errorMessage, {
                position: "top-right",
            });
            setLoading(false);
        }
    };

    return (
        <div className="py-20 flex items-center justify-center w-full dark:bg-gray-950">
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md w-full">
                <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
                    Welcome Back!
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="your@email.com"
                            required
                            ref={emailInputRef}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password"
                            required
                            ref={passwordInputRef}
                        />
                    </div>

                    {loading ? (
                        <p className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Processing
                        </p>
                    ) : (
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Login
                        </button>
                    )}
                    <div className="text-center mt-4 text-xs text-gray-500">
                        New here?{" "}
                        <Link
                            to="/sign-up"
                            className="text-xs text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Create Account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
