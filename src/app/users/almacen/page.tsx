import { checkRole } from "@/actions";

async function AlmacenPage() {
  await checkRole(0);
  return (
    <div>
      Esta es la pagina del almacen
    </div>
  )
}

export default AlmacenPage
