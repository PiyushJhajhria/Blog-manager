import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../appwrite/auth'
import {logout} from '../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='inline-flex items-center justify-center rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-richblack-50 transition duration-200 hover:border-red-300/50 hover:bg-red-400/10 hover:text-red-100'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn
