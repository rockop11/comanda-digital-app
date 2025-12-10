
import { AdminPage } from "@/components/AdminPage/AdminPage"
import { getRestaurantList } from "@/services/restaurants"

export default async function AdminIndexPage() {

    const restaurants = await getRestaurantList()

    return (
        <AdminPage restaurants={restaurants}/>
    )
}