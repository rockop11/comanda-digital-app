import { JSX } from "react"

export const RestaurantHeaderSkeleton = (): JSX.Element => {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm w-full animate-pulse">

            <div className="shrink-0 rounded-sm bg-gray-200 w-[100px] h-[100px] md:w-[150px] md:h-[150px]" />

            <div className="flex flex-col gap-3 flex-1">

                <div className="h-6 w-40 md:w-60 bg-gray-200 rounded-md" />

                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-300 rounded" />
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-300 rounded" />
                    <div className="h-4 w-20 bg-gray-200 rounded" />

                    <div className="w-4 h-4 bg-gray-300 rounded" />
                </div>

            </div>
        </div>
    );
}
