// El boton que se usará en la tabla en la columna de acciones
import { Edit, Trash } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface butonActionProps {
  id: string;

}

function ButtonDelete({ id }: butonActionProps) {
  const { toast } = useToast();
  const router = useRouter();
  return (
    <button
      className=" border border-[#ececec] h-10 w-10 flex items-center justify-center rounded-md hover:bg-[#ececec]"
      onClick={async () => {
        if (confirm("¿Está seguro de eliminar este registro?")) {
          const res = await axios.delete(`/api/users/admin/empleados/${id}`);
          if (res.status == 204) {
            toast({
              title: "Empleado eliminado",
              description: "El empleado ha sido eliminado correctamente",
              variant: "success",
            });
            router.refresh();
          } else {
            toast({
              title: "Error al eliminar el empleado",
              description: "Hubo un error al eliminar el empleado",
              variant: "destructive",
            });
          }
        }
      }}
    >
      <Trash className="text-red-600 size-7" />
    </button>
  );
}

export default ButtonDelete;
