import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const authStaus = useSelector((state) => state.auth.status);
    useEffect(() => {
        setLoader(true);
        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }


        if (authentication && authStaus !== authentication) {
            navigate("/login");
        }
        else if (!authentication && authStaus === true) {
            navigate("/");
        }
        setLoader(false);
    }, [authStaus, navigate, authentication])

    return loader ? (
        <div className="flex min-h-[50vh] items-center justify-center text-richblack-50">Loading...</div>
    ) : <>{children}</>
}
