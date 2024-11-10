// El boton que se usará en la tabla en la columna de acciones
import {Edit, Trash} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
interface butonActionProps {
    action: "edit" | "delete";
    id: string;
    labelsRoute: string;
    dataRoute?: string;
}

async function getLabels(route: string) {
    const res = await axios.get(`api/columns/${route}`);
    return res.data;
}

function ButtonAction({action,id, labelsRoute, dataRoute}: butonActionProps) {
    const labels = getLabels(labelsRoute);
    const {toast} = useToast();
    const isedit = action === "edit" ? true : false;  
    const router = useRouter();

    if(isedit) {
        return(
        <Dialog>
        <DialogTrigger asChild>
        <button className=" border border-[#ececec] h-10 w-10 flex items-center justify-center rounded-md hover:bg-[#ececec]">
        {isedit ? <Edit className="text-yellow-600 size-7"/> : <Trash className="text-red-600 size-7"/>}
    </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )}
      else {
        return (
            <button className=" border border-[#ececec] h-10 w-10 flex items-center justify-center rounded-md hover:bg-[#ececec]"
            onClick={async () =>{
                if(isedit) {
                
                } else {
                    if(confirm("¿Está seguro de eliminar este registro?")){
                        const res = await axios.delete(`/api/users/admin/empleados/${id}`);
                            if(res.status == 204) {
                                toast({
                                    title: "Empleado eliminado",
                                    description: "El empleado ha sido eliminado correctamente",
                                    variant: "success",
                                });
                                router.refresh();
                            } else {
                                toast({
                                    title: 'Error al eliminar el empleado',
                                    description: "Hubo un error al eliminar el empleado",
                                    variant: "destructive",
                                });
                            }
                    }
                }
                
            }}
            >
                {isedit ? <Edit className="text-yellow-600 size-7"/> : <Trash className="text-red-600 size-7"/>}
            </button>
          )
      }
    
}

export default ButtonAction
