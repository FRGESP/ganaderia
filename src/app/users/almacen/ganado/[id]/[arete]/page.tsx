import AnimalDashboard from "@/components/ui/Entradas/animalDashboard";

interface Params {
    arete: string;
}

function AnimalAlmacenpage({params}: {params: Params}) {
  return (
    <div>
      <AnimalDashboard AreteAnimal={params.arete} Admin={false} Rol={2}/>
    </div>
  )
}

export default AnimalAlmacenpage