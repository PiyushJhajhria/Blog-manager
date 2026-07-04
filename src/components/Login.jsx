import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { Input, Button, Logo } from './index.js'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'  //reacthoolform started

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm(); //handleSubmit is used to handle the form submission
    const [error, setError] = useState("");
    const login = async (data) => {
        setError(""); // clear the error
        try {  // important part of the code
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate("/");
                }
            }
        }
        catch (error) {
            setError(error.message);
        }
    }
    return (
        <div className='flex w-full items-center justify-center py-12 sm:py-20'>
            <div className={`mx-auto w-full max-w-md rounded-xl border border-white/10 bg-richblack-800 p-8 shadow-2xl shadow-black/30 sm:p-10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-25">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="mt-6 text-center text-3xl font-black leading-tight text-richblack-50">Sign in to your account</h2>
                <p className="mt-3 text-center text-sm text-richblack-400">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-semibold text-cyan-200 transition-all duration-200 hover:text-cyan-100"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className='mt-4 rounded-lg border border-red-400/20 bg-red-500/10 p-3 text-center text-sm text-red-200'>{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'> {/* handleSubmit  is used to handle the form submission */}
                    <div className='space-y-4'>
                        <Input
                            label="Email:"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email" , {   /*register is a function from React Hook Form — a library that manages form data and validation. */
                                required: "Email is required",
                                validate:{
                                    matchPattern: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Invalid email address",
                                }
                            })}
                        />
                        {errors.email && <p className="text-sm text-red-200">{errors.email.message}</p>}
                        <Input
                            label="Password:"
                            placeholder="Enter your password"
                            type="password"
                            {...register("password" ,{
                                required: "Password is required",
                                minLength:{
                                    value: 8,
                                    message: "Password must be at least 8 characters long",
                                },
                                maxLength:{
                                    value: 16,
                                    message: "Password must be at most 16 characters long",
                                }
                            })}
                        />
                        {errors.password && <p className="text-sm text-red-200">{errors.password.message}</p>}
                    </div>
                    <Button
                        type="submit"
                        className="mt-6 w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Signing in..." : "Sign In"}
                    </Button>
                </form>
            </div>

        </div>
    )
}

export default Login
