import React, { useState } from 'react'
import appwriteService  from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({$id , title , featuredImage ,}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <Link to={`/post/${$id}`} className="group block h-full">
        <div className='h-full w-full overflow-hidden rounded-xl border border-white/10 bg-richblack-800 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-cyan-950/30'>
            <div className='flex h-56 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-richblack-900 via-richblack-800 to-cyan-950/40'>
              {!imageFailed && featuredImage ? (
                <img
                  src={appwriteService.getFilePreview(featuredImage)}
                  alt={title}
                  className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <div className="px-6 text-center">
                  <p className="text-xs font-semibold uppercase text-cyan-200">MegaBlog</p>
                  <p className="mt-2 text-lg font-black text-richblack-50">{title}</p>
                </div>
              )}
            </div>
            <div className="p-5">
              <p className="mb-3 text-xs font-semibold uppercase text-cyan-200">Featured story</p>
              <h2 className='line-clamp-2 text-xl font-bold leading-tight text-richblack-50'>{title}</h2>
              <p className="mt-4 text-sm font-semibold text-richblack-400 transition group-hover:text-cyan-200">Read article</p>
            </div>
          </div>
        </Link>
    )
}
export default PostCard
