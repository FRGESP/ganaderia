import DashboardCorral from "@/components/ui/Entradas/corralDashboard";

interface Params {
    id: number;
}

function AnimalAdminpage({params}: {params: Params}) {
  return (
    <div>
      <DashboardCorral CorralSelected={params.id} Rol={1}/>
    </div>
  )
}

export default AnimalAdminpage