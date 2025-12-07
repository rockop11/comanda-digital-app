import { CreateRestaurantForm } from "@/components/CreateRestaurantForm/CreateRestaurantForm"

export default async function CreateRestaurantPage() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white p-8 shadow-2xl rounded-xl w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Crear Restaurante
                </h2>

                <CreateRestaurantForm />
            </div>
        </div>
    )
}