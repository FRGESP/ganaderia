import AnimalDashboard from "@/components/ui/Entradas/animalDashboard";

interface Params {
    arete: string;
}

function AnimalAdminpage({params}: {params: Params}) {
  return (
    <div>
      <AnimalDashboard AreteAnimal={params.arete} Admin={true}/>
    </div>
  )
}

export default AnimalAdminpage