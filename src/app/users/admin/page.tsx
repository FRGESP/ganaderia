import { checkRole } from "@/actions"

async function AdminPage() {
  await checkRole(0);
  return (
    <div>
      Esta es la página de administración
    </div>
  )
}

export default AdminPage
