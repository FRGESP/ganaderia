import DietaForm from "@/components/ui/almacen/dietas/dietaForm";

interface Params {
  id: string;
}

function dietaPage({params}: {params: Params}) {
  return (
    <div>
      <DietaForm idDieta={params.id}/>
    </div>
  )
}

export default dietaPage
