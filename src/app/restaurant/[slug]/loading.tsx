import { RestaurantHeaderSkeleton } from "@/components/Skeletons/RestaurantHeaderSkeleton"
import { RestaurantMenuSkeleton } from '@/components/Skeletons/RestaurantMenuSkeleton';

export default function Loading() {
    return (
        <>
            <RestaurantHeaderSkeleton />
            <RestaurantMenuSkeleton />
        </>
    )
}