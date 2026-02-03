import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Navbar } from "@/components/Dashboard"
import { getRestaurantDataByUser } from "@/services/restaurants"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const session = await getServerSession(authOptions)

    if (!session) return null

    const parsedId = parseInt(session?.user.id)

    const restaurant = await getRestaurantDataByUser(parsedId)

    if (!restaurant) return null

    const { slug } = restaurant

    return (
        <div>
            <Navbar
                session={session}
                slug={slug}
            />

            <main>
                {children}
            </main>
        </div>
    )
}
