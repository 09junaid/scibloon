import React from 'react'
import Link from 'next/link'

function Button({text,url}) {
  return (
    <>
    <Link href={url}>

    <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer mx-auto md:mx-0 w-fit">
      {text}
    </button>
    </Link>
    </>
  )
}

export default Button