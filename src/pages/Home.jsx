import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components/index'
import service from '../appwrite/config'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts && posts.documents) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full py-16 sm:py-24">
                <Container>
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="mb-4 text-sm font-semibold uppercase text-cyan-200">Welcome to MegaBlog</p>
                        <h1 className="text-4xl font-black leading-tight text-richblack-50 sm:text-6xl">
                            Publish thoughtful stories with a calmer writing space.
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-richblack-400 sm:text-lg">
                            Log in to read posts, manage your articles, and keep your ideas beautifully organized.
                        </p>
                        <div className="mt-8 rounded-xl border border-white/10 bg-richblack-800 p-6 shadow-2xl shadow-black/20">
                            <h2 className="text-xl font-bold text-richblack-50">No posts are available yet.</h2>
                            <p className="mt-2 text-sm text-richblack-400">Once active posts are published, they will appear here.</p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="w-full py-10 sm:py-14">
            <Container>
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase text-cyan-200">Latest posts</p>
                    <h1 className="mt-2 text-3xl font-black text-richblack-50">Fresh from the blog</h1>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <div key={post.$id} className="w-full">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
