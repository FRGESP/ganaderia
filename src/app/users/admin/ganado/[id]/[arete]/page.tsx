import AnimalDashboard from "@/components/ui/Entradas/animalDashboard";

interface Params {
    arete: string;
}

function AnimalAdminpage({params}: {params: Params}) {
  return (
    <div>
      <AnimalDashboard AreteAnimal={params.arete} Admin={true} Rol={1}/>
    </div>
  )
}

export default AnimalAdminpage