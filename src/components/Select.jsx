import React, { useId } from 'react'

const Select = React.forwardRef(function Select({
    options , label , className = '', ...props
}, ref) {
    const id = useId();
    return (
        <div className="w-full">
            {label && <label
            className='mb-2 block text-sm font-medium text-richblack-50'
            htmlFor={id}
            >
            {label}
            </label>
            }
            <select
            id={id}
            className={`${className} w-full rounded-lg border border-white/10 bg-richblack-800/80 p-3 text-richblack-50 shadow-inner shadow-black/20 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/30`}
            ref={ref}
            {...props}
            >
                {options?.map((option) => {
                    const value = typeof option === 'string' ? option : option.value;
                    const label = typeof option === 'string' ? option : option.label;
                    return <option key={value} value={value}>{label}</option>;
                })}
            </select>
        </div>
    )
})

export default Select;
