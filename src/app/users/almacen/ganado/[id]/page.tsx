import AnimalDashboard from "@/components/ui/Entradas/animalDashboard";

interface Params {
    id: string;
}

function AnimalAlmacenpage({params}: {params: Params}) {
  return (
    <div>
      <AnimalDashboard AreteAnimal={params.id} Admin={false}/>
    </div>
  )
}

export default AnimalAlmacenpage