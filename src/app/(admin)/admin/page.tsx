
import { SuperAdminPage } from "@/components/SuperAdminPage/SuperAdminPage"
import { getRestaurantList } from "@/services/restaurants"

export default async function AdminIndexPage() {

    const restaurants = await getRestaurantList()

    return (
        <SuperAdminPage restaurants={restaurants}/>
    )
}