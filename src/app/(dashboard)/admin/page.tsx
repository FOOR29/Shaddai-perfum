import { auth } from "@/src/auth"
import LogoutButton from "@/src/components/ui/LogoutButton";

const AdminPage = async () => {
    const session = await auth()
    console.log(session);

    if (session?.user?.role !== 'ADMIN') {
        return <div>You are not admin</div>
    }
    return (
        <div>
            <pre>
                {
                    JSON.stringify(session, null, 2)
                }
            </pre>
            <LogoutButton />
        </div>
    )
}

export default AdminPage