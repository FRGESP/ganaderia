import Dashboard from "@/components/ui/Entradas/dashboard"
import { checkRole } from "@/actions";

async function EntradasPage() {
  await checkRole(3);
  return (
    <Dashboard/>
  )
}

export default EntradasPage
