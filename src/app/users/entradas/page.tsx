import { checkRole } from "@/actions";

async function AlmacenPage() {
  await checkRole(0);
  return (
    <div>
      Esta es la pagina de entradas
    </div>
  )
}

export default AlmacenPage
