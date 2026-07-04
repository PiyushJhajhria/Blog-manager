import React from 'react'
import Logo from './Logo'
import Input from './Input'
import Button from './Button'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useState } from 'react'

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [error, setError] = useState("");
    const signup = async(data)=>{
        setError("");
        try{
            const session = await authService.signup(data);
            if(session){
                const userData = await authService.getCurrentUser();
                if(userData){
                    dispatch(authLogin(userData))
                    navigate("/");
                }
            }
        }
        catch(error){
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
            <h2 className="mt-6 text-center text-3xl font-black leading-tight text-richblack-50">Create an account</h2>
            <p className="mt-3 text-center text-sm text-richblack-400">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-semibold text-cyan-200 transition-all duration-200 hover:text-cyan-100"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className='mt-4 rounded-lg border border-red-400/20 bg-red-500/10 p-3 text-center text-sm text-red-200'>{error}</p>}
            <form onSubmit = {handleSubmit(signup)} className='mt-8'>
                <div className='space-y-4'>
                    <Input
                        label="Name:"
                        placeholder="Enter your name"
                        type="text"
                        {...register("name",{
                            required: "Name is required",
                        })}
                    />
                    {errors.name && <p className="text-sm text-red-200">{errors.name.message}</p>}
                    <Input
                        label="Email:"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email" , {
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
                        {...register("password" , {
                            required: "Password is required",
                            minLength:{
                                value: 8,
                                message: "Password must be at least 8 characters long",
                            }
                        })}
                    />
                    {errors.password && <p className="text-sm text-red-200">{errors.password.message}</p>}
                </div>
                <Button type="submit" className="mt-6 w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Creating account..." : "Sign Up"}
                </Button>
            </form>
        </div>
    </div>
  )
}

export default Signup
