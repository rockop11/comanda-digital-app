import {
    NavbarSkeleton,
    RestaurantHeaderSkeleton,
    RestaurantMenuSkeleton
} from "@/components/Dashboard";

export default function Loading() {
    return (
        <div className="max-w-3xl mx-auto">
            <NavbarSkeleton />
            <RestaurantHeaderSkeleton />
            <RestaurantMenuSkeleton />
        </div>
    )
}