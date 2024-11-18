import DashboardCorral from "@/components/ui/Entradas/corralDashboard";

interface Params {
    id: number;
}

function AnimalEntradaspage({params}: {params: Params}) {
  return (
    <div>
      <DashboardCorral CorralSelected={params.id} Rol={3}/>
    </div>
  )
}

export default AnimalEntradaspage