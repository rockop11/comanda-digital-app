import { JSX } from 'react'

export const NavbarSkeleton = (): JSX.Element => {
    return (
        <nav className="max-w-3xl mx-auto flex justify-between items-center my-4">
            
            <div className="h-5 w-48 bg-gray-200 rounded-md animate-pulse" />

            <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse" />
        </nav>
    )
}