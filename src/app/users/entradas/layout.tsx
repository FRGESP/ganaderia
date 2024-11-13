import { checkRole } from "@/actions";

async function layoutEntradas({ children }: { children: React.ReactNode }) {
    await checkRole(3);
    return (
      <div>
        {children}
      </div>
    )
  }
  
  export default layoutEntradas
  