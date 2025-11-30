import { JSX } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";

export const RestaurantMenuSkeleton = (): JSX.Element => {
    const skeletonCategories = ["Loading 1", "Loading 2"];

    return (
        <div className="p-4 animate-pulse">
            {skeletonCategories.map((cat, i) => (
                <Accordion
                    key={i}
                    type="multiple"
                    defaultValue={[`item-${i}`]}
                >
                    <AccordionItem value={`item-${i}`}>

                        <AccordionTrigger disabled className="text-2xl font-semibold">
                            <div className="h-6 w-40 bg-gray-300 rounded-md"></div>
                        </AccordionTrigger>

                        <AccordionContent>
                            <div className="flex flex-col gap-4 mt-4">
                                {[...Array(4)].map((_, idx) => (
                                    <div
                                        key={idx}
                                        className="flex gap-4 p-4 rounded-xl shadow-sm bg-white border border-gray-100"
                                    >
                                        <div className="w-[120px] h-[120px] bg-gray-300 rounded-lg"></div>

                                        <div className="flex flex-col flex-1 justify-between">

                                            <div className="h-5 w-3/4 bg-gray-300 rounded-md"></div>

                                            <div className="mt-2 space-y-2">
                                                <div className="h-4 w-full bg-gray-200 rounded-md"></div>
                                                <div className="h-4 w-2/3 bg-gray-200 rounded-md"></div>
                                            </div>

                                            <div className="flex justify-end mt-3">
                                                <div className="h-5 w-16 bg-gray-300 rounded-md"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ))}
        </div>
    );
}
