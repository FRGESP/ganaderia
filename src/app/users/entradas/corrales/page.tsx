import DashboardCorrales from "@/components/ui/Entradas/corralesDashboard"
import { checkRole } from "@/actions";

async function EntradasPage() {
  await checkRole(3);
  return (
    <DashboardCorrales/>
  )
}

export default EntradasPage
