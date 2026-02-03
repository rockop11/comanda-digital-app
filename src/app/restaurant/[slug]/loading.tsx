import { RestaurantHeaderSkeleton } from "@/components/Dashboard/Skeletons/RestaurantHeaderSkeleton"
import { RestaurantMenuSkeleton } from '@/components/Dashboard/Skeletons/RestaurantMenuSkeleton';

export default function Loading() {
    return (
        <div className="max-w-3xl mx-auto">
            <RestaurantHeaderSkeleton />
            <RestaurantMenuSkeleton />
        </div>
    )
}