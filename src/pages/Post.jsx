import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [imageFailed, setImageFailed] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        setImageFailed(false);
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-10 sm:py-16">
            <Container>
                <div className="mx-auto mb-8 max-w-5xl">
                    <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <div className="max-w-3xl">
                            <p className="mb-3 text-sm font-semibold uppercase text-cyan-200">Article</p>
                            <h1 className="text-4xl font-black leading-tight text-richblack-50 sm:text-5xl lg:text-6xl">{post.title}</h1>
                        </div>

                    {isAuthor && (
                            <div className="flex shrink-0 gap-3">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-emerald-400 hover:bg-emerald-300">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500 hover:bg-red-400" textColor="text-white" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                    </div>

                    <div className="overflow-hidden rounded-xl border border-white/10 bg-richblack-800 p-2 shadow-2xl shadow-black/30">
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gradient-to-br from-richblack-800 via-richblack-900 to-cyan-950/40">
                            {!imageFailed && post.featuredImage ? (
                                <img
                                    src={appwriteService.getFilePreview(post.featuredImage)}
                                    alt={post.title}
                                    className="h-full w-full object-cover"
                                    onError={() => setImageFailed(true)}
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center px-8 text-center">
                                    <div>
                                        <p className="text-sm font-semibold uppercase text-cyan-200">MegaBlog</p>
                                        <p className="mt-3 text-2xl font-black text-richblack-50 sm:text-4xl">{post.title}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <article className="browser-css mx-auto max-w-3xl rounded-xl border border-white/10 bg-richblack-800 p-6 text-richblack-50 shadow-2xl shadow-black/20 sm:p-8 lg:p-10">
                    {parse(post.content)} {/* Render the content as HTML */}
                </article>
            </Container>
        </div>
    ) : null;
}
