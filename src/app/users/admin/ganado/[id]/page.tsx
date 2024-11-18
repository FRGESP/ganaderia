import AnimalDashboard from "@/components/ui/Entradas/animalDashboard";

interface Params {
    id: string;
}

function AnimalAdminpage({params}: {params: Params}) {
  return (
    <div>
      <AnimalDashboard AreteAnimal={params.id} Admin={true}/>
    </div>
  )
}

export default AnimalAdminpage