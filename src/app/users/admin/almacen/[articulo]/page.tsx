import LotesDashboard from "@/components/ui/almacen/AlmacenPage/lotesDashboard";

interface Params {
    articulo: number;
}

function ArticuloAdminPage({params}: {params: Params}) {
  return (
    <div>
        <LotesDashboard IdArticulo={params.articulo} Rol={1} />
    </div>
  )
}

export default ArticuloAdminPage
