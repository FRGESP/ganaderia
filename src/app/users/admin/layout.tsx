import { checkRole } from "@/actions";

async function layoutAdmin({ children }: { children: React.ReactNode }) {
    await checkRole(1);
    return (
      <div>
        {children}
        
      </div>
    )
  }
  
  export default layoutAdmin
  