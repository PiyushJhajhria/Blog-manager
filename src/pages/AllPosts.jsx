import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components/index'
import service from '../appwrite/config'

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        service.getPosts([]).then((posts) => {
            if (posts && posts.documents) {
                setPosts(posts.documents)
            }
        })
    }, [])

    return (
        <div className='w-full py-10 sm:py-14'>
            <Container>
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase text-cyan-200">Library</p>
                    <h1 className="mt-2 text-3xl font-black text-richblack-50">All published posts</h1>
                </div>
                <div className='grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                    {posts.map(post => (
                        <div key = {post.$id} className='w-full'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
                {posts.length === 0 && (
                    <div className="rounded-xl border border-white/10 bg-richblack-800 p-8 text-center text-richblack-400">
                        No posts found yet.
                    </div>
                )}
            </Container>
        </div>
    )
}

export default AllPosts
