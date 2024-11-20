import AnimalDashboard from "@/components/ui/Entradas/animalDashboard";

interface Params {
    arete: string;
}

function AnimalEntradaspage({params}: {params: Params}) {
  return (
    <div>
      <AnimalDashboard AreteAnimal={params.arete} Admin={false} Rol={3}/>
    </div>
  )
}

export default AnimalEntradaspage
