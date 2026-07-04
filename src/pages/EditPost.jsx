import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container } from '../components/index'
import service from '../appwrite/config'
import Postform from '../components/Postform'
function EditPost() {
    const [post, setPost] = useState(null)
    const { slug } = useParams(); // useParams is used to get the slug from the url
    const navigate = useNavigate();

    useEffect(()=>{

        if(slug){
            service.getPost(slug).then((post)=>{
                if(post){
                    setPost(post)
                }
                else{
                    navigate('/404')
                }
            })
        }

    },[slug,navigate])

  return post ? (
    <div className='py-10 sm:py-14'>
        <Container>
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase text-cyan-200">Edit</p>
                <h1 className="mt-2 text-3xl font-black text-richblack-50">Update your post</h1>
            </div>
            <Postform post={post} />
        </Container>
    </div>
  ) : null;
}

export default EditPost
