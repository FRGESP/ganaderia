import AnimalDashboard from "@/components/ui/Entradas/animalDashboard";

interface Params {
    id: string;
}

function AnimalEntradaspage({params}: {params: Params}) {
  return (
    <div>
      <AnimalDashboard AreteAnimal={params.id}/>
    </div>
  )
}

export default AnimalEntradaspage
