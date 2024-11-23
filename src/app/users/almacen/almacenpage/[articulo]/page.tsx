import LotesDashboard from "@/components/ui/almacen/AlmacenPage/lotesDashboard";

interface Params {
    articulo: number;
}

function ArticuloAlmacenPage({params}: {params: Params}) {
  return (
    <div>
        <LotesDashboard IdArticulo={params.articulo} Rol={2} />
    </div>
  )
}

export default ArticuloAlmacenPage
