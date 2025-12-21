import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Navbar } from "@/components/Navbar/Navbar"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const session = await getServerSession(authOptions)

    return (
        <div>
            <Navbar session={session} />

            <main>
                {children}
            </main>
        </div>
    )
}
