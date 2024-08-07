"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const navigationTestPage = () => {

    //client side navigation
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    console.log(searchParams.get('q'))

    const handleClick = () => {
        console.log("clicked")
        router.push('/')
        // router.replace('/')
        // router.refresh('/')
        // router.back()
        // router.forward()
        
    }
    return (
        <div>
            <Link href="/" prefetch={false}>click me </Link>
            <button onClick={handleClick}>Write and Redirect</button>
        </div>
    )
}

export default navigationTestPage