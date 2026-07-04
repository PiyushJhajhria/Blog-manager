import React ,{useId} from 'react'

const Input = React.forwardRef( function Input({
    label ,
    type = 'text',
    className = '',
    ...props
}, ref){
    const id = useId();
    return (
        <div className ="w-full">
            {label && <label
            className='mb-2 block text-sm font-medium text-richblack-50'
            htmlFor={id}
            >
            {label}
            </label>
            }
            <input  
            id={id}
            type={type}
            className={`${className} w-full rounded-lg border border-white/10 bg-richblack-800/80 p-3 text-richblack-50 placeholder:text-richblack-400 shadow-inner shadow-black/20 file:mr-4 file:rounded-md file:border-0 file:bg-cyan-400 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-richblack-900 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/30`}
            ref={ref}
            {...props}
            />
        </div>
    )
})

export default Input

// forward ref is used to forward the ref to the input element so that we can use it in the other components
