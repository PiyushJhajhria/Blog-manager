import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-cyan-400 hover:bg-cyan-300',
    textColor = 'text-richblack-900',
    className = '',
    ...props
}) {
  return (
    <button
      type={type}
      className={`${bgColor} ${textColor} ${className} rounded-lg px-5 py-2.5 text-sm font-semibold shadow-lg shadow-black/20 transition duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-richblack-900 disabled:cursor-not-allowed disabled:opacity-60`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

