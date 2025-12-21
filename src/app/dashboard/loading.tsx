import { NavbarSkeleton } from "@/components/Skeletons/NavbarSkeleton"
import { RestaurantHeaderSkeleton } from "@/components/Skeletons/RestaurantHeaderSkeleton"
import { RestaurantMenuSkeleton } from "@/components/Skeletons/RestaurantMenuSkeleton"

export default function Loading() {
    return (
        <div className="max-w-3xl mx-auto">
            <NavbarSkeleton />
            <RestaurantHeaderSkeleton />
            <RestaurantMenuSkeleton />
        </div>
    )
}