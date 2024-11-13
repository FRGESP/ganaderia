import GuiaForm from "@/components/ui/admin/Guias/guiaForm";

interface Params {
  id: string;
}

function guiaPage({params}: {params: Params}) {
  return (
    <div>
      <GuiaForm idGuia={params.id}/>
    </div>
  )
}

export default guiaPage
