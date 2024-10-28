import { checkRole } from "@/actions"

async function layoutAlmacen({ children }: { children: React.ReactNode }) {
 await checkRole(2);
    return (
    <div>
      {children}
    </div>
  )
}

export default layoutAlmacen
