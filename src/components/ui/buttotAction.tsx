// El boton que se usará en la tabla en la columna de acciones
import {Edit, Trash} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface butonActionProps {
    action: "edit" | "delete";
    id: string
}




function ButtonAction({action,id}: butonActionProps) {
    const isedit = action === "edit" ? true : false;  
    const router = useRouter();
    return (
    <button className=" border border-[#ececec] h-10 w-10 flex items-center justify-center rounded-md hover:bg-[#ececec]"
    onClick={async () =>{
        if(isedit) {
            console.log('Edit pa')
            console.log(id);
        } else {
            if(confirm("¿Está seguro de eliminar este registro?")){
                const res = await axios.delete(`/api/users/admin/empleados/${id}`);
                    if(res.status == 204) {
                        router.refresh();
                    }
            }
        }
        
    }}
    >
        {isedit ? <Edit className="text-yellow-600 size-7"/> : <Trash className="text-red-600 size-7"/>}
    </button>
  )
}

export default ButtonAction
