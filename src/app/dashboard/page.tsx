import { RestaurantAdminPage } from '@/components/RestaurantAdminPage/RestaurantAdminPage';
import { getRestaurantDataByUser } from '@/services/restaurants';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return
    }

    const parsedId = parseInt(session?.user.id)

    const restaurant = await getRestaurantDataByUser(parsedId)

    if (!restaurant) {
        return null
    }

    return (
        <RestaurantAdminPage restaurant={restaurant} />
    );
}