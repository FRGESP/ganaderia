import DashboardCorral from "@/components/ui/Entradas/corralDashboard";

interface Params {
    id: number;
}

function AnimalAlmacenpage({params}: {params: Params}) {
  return (
    <div>
      <DashboardCorral CorralSelected={params.id} Rol={2}/>
    </div>
  )
}

export default AnimalAlmacenpage