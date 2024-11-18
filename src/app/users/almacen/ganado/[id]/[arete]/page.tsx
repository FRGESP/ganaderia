import AnimalDashboard from "@/components/ui/Entradas/animalDashboard";

interface Params {
    arete: string;
}

function AnimalAlmacenpage({params}: {params: Params}) {
  return (
    <div>
      <AnimalDashboard AreteAnimal={params.arete} Admin={false}/>
    </div>
  )
}

export default AnimalAlmacenpage