import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from './Button'
import Input from './Input'
import RTE from './RTE'
import Select from './Select'
import appwriteService from '../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Postform({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      slug: post?.slug || '',
      status: post?.status || 'active'
    }
  })
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async (data) => {
    setError('');
    setIsSubmitting(true);

    try {
      if (!userData?.$id) {
        throw new Error('Please log in again before publishing.');
      }

      if (post) {
        const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;

        if (file) {
          await appwriteService.deleteFile(post.featuredImage);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });

        navigate(`/post/${dbPost.$id}`);
      } else {
        if (!data.image?.[0]) {
          throw new Error('Please choose a featured image before publishing.');
        }

        const file = await appwriteService.uploadFile(data.image[0]);
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

        navigate(`/post/${dbPost.$id}`);
      }
    } catch (error) {
      setError(error.message || 'Unable to save the post. Please check your Appwrite permissions.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if(value && typeof value ==='string'){
      return value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }
  },[])

   useEffect(() => {
    const subscription = watch((value, { name }) => {
      if(name==='title'){
        setValue('slug', slugTransform(value.title , {shouldValidate: true }));
      }
    })
    return () => {
      subscription.unsubscribe();
    }
  },[watch , slugTransform , setValue]);

  return (
        <form onSubmit={handleSubmit(submit)} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="rounded-xl border border-white/10 bg-richblack-800 p-5 shadow-2xl shadow-black/20 sm:p-6">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="rounded-xl border border-white/10 bg-richblack-800 p-5 shadow-2xl shadow-black/20 sm:p-6">
                <h2 className="mb-5 text-lg font-bold text-richblack-50">Publishing settings</h2>
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full rounded-lg border border-white/10 object-cover"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-emerald-400 hover:bg-emerald-300" : undefined} className="mt-2 w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : post ? "Update" : "Submit"}
                </Button>
                {error && (
                    <p className="mt-4 rounded-lg border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-200">
                        {error}
                    </p>
                )}
            </div>
        </form>
    );
}
