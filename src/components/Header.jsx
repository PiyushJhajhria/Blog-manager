import React from 'react'
import Container from './Container'
import Logo from './Logo'
import LogoutBtn from './LogoutBtn'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]
    return (
        <header className='sticky top-0 z-50 border-b border-white/10 bg-richblack-900/90 py-3 shadow-2xl shadow-black/20 backdrop-blur'>    
            <Container>
                <nav className='flex flex-wrap items-center justify-between gap-4'>
                    <div className='flex items-center gap-4'>
                        <Link to="/">
                            <Logo />
                        </Link>
                    </div>
                    <ul className='flex flex-wrap items-center gap-2'>
                        {navItems.map((item)=>
                        item.active  ?(
                            <li key={item.name}>
                                <button
                                onClick={()=>navigate(item.slug)}
                                className='inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-richblack-50 transition duration-200 hover:bg-white/10 hover:text-cyan-200'>
                                    {item.name}
                                </button>
                            </li>
                        ) : null)}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header
