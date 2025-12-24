
import { SuperAdminPage } from "@/components/SuperAdminPage/SuperAdminPage"
import { getRestaurantList } from "@/services/restaurants"

export const dynamic = 'force-dynamic'

export default async function AdminIndexPage() {

    const restaurants = await getRestaurantList()

    return (
        <SuperAdminPage restaurants={restaurants}/>
    )
}