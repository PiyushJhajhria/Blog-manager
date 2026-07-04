import React from 'react'
import Container from '../components/Container'
import Postform from '../components/Postform'
function AddPost() {
  return (
    <div className="py-10 sm:py-14">
      <Container>
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase text-cyan-200">Create</p>
          <h1 className="mt-2 text-3xl font-black text-richblack-50">Write a new post</h1>
        </div>
        <Postform />
      </Container>
    </div>
  )
}

export default AddPost
