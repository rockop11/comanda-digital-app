
import { getRestaurantList } from "@/services/restaurants"
import { SuperAdminPage } from "@/components/Dashboard"

export const dynamic = 'force-dynamic'

export default async function AdminIndexPage() {

    const restaurants = await getRestaurantList()

    return (
        <SuperAdminPage restaurants={restaurants}/>
    )
}