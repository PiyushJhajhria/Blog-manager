import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        }
        else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (<div className="min-h-screen w-full bg-richblack-900 text-richblack-50 flex flex-col font-inter">
    <Header />
    <main className="flex-1">
      <Outlet/>
    </main>
    <Footer />
  </div>) : (<div className="flex h-screen items-center justify-center bg-richblack-900">
    <div className="rounded-xl border border-white/10 bg-richblack-800 px-6 py-4 text-lg font-semibold text-richblack-50 shadow-2xl shadow-black/30">Loading MegaBlog...</div>
  </div>)
}

export default App
