import React from 'react'
import Link from 'next/link'

function Button({ text, url, variant = "default", className = "" }) {
  const baseClasses = "px-6 py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer mx-auto md:mx-0 w-fit inline-flex items-center justify-center";
  
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-lg"
  };

  return (
    <Link href={url} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {text}
    </Link>
  )
}

export default Button
