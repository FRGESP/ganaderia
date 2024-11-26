"use client";
import { Search, Trash, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import AddcorralModal from "@/components/ui/Entradas/addCorralModal";

interface DashboardProps {
  Rol: number;
}

function DashboardCorrales({ Rol }: DashboardProps) {
  const router = useRouter();
  //La ruta según el rol
  const ruta =
    Rol == 1
      ? "/users/admin/ganado"
      : Rol == 2
      ? "/users/almacen/ganado"
      : "/users/entradas/corrales";

  const { toast } = useToast();

  interface Corral {
    IdCorral: number;
    Corral: string;
    Cantidad: number;
    Estatus: number;
  }

  //Guarda la informacion de los corrales
  const [corrales, setCorrales] = useState<Corral[]>([]);

  //El valor del input para buscar
  const [inputValue, setInputValue] = useState({
    search: "",
    nombreCorral: "",
    dieta: "",
  });

  //Controla el cambio del input
  const handleChange = (e: any) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  //Cuando se selecciona un corral
  const handleSelectCorral = async (Id: number) => {
    router.push(`${ruta}/${Id}`);
  };

  //Cuando se desea borrar el corral
  const handleDeleteCorral = async (Id: number) => {
    if(confirm("¿Está seguro de que desea borrar este corral?")){
        const response = await axios.delete(`/api/users/entradas/corrales/${Id}`);
      if(response.status == 200){
        toast({
          title: "Corral eliminado",
          description: "El corral ha sido eliminado correctamente",
          variant: "success",
        });
      } else{
        toast({
          title: "Error",
          description: "No se pudo eliminar el corral",
          variant: "destructive",
        });
      }
      getCorrales();
    }
  }

  const getCorrales = async () => {
    const response = await axios.post("/api/users/entradas/corrales", {
      Nombre: inputValue.search,
    });
    setCorrales(response.data);
  };

  useEffect(() => {
    getCorrales();
  }, []);

  return (
    <div className="w-full h-[90vh] p-10">
      <div className="flex mb-8">
        <input
          type="text"
          name="search"
          id="search"
          onChange={handleChange}
          className=" py-4 rounded-full text-lg px-2 w-full flex-grow border-2 border-gray-500"
        />
        <button
          className=" ml-1 rounded-md p-2 hover:bg-gray-200"
          onClick={getCorrales}
        >
          <Search size={44} />
        </button>
        {Rol == 1 && (<AddcorralModal/>)}
      </div>

      <div
        className={`border-2 border-black h-[80%] overflow-y-auto grid grid-cols-4 gap-6 p-6`}
      >
        {corrales.map((corral) => (
          <div
            className="border-double border-8 border-[#99582a]  h-64 w-full rounded-xl"
            key={corral.IdCorral}
          >
            {/*  */}
            {corral.Cantidad != 0 ? (
              <button
                className={`h-full w-full bg-[#e1bb80] hover:bg-[#bc8a5f]`}
                onClick={() => handleSelectCorral(corral.IdCorral)}
              >
                <div>
                  <h1 className="text-2xl font-bold">{corral.Corral}</h1>
                  <p className="text-xl">
                    {corral.Cantidad}{" "}
                    {`${corral.Cantidad > 1 ? "Animales" : "Animal"}`}
                  </p>
                </div>
              </button>
            ) : (
              <div
                className={`h-full w-full ${corral.Estatus == 2 ? 'bg-yellow-400' : 'bg-[#70e000]'} flex justify-center items-center relative`}
              >
                {Rol == 1 && corral.IdCorral != 1 && corral.Estatus != 2 ? (<div className="absolute top-2 right-2">
                    <button className=" bg-white rounded-md p-3 hover:bg-gray-200" onClick={() => handleDeleteCorral(corral.IdCorral)}>
                      <Trash className="text-red-600" />
                    </button>
                  </div>) : ''}
                <div>
                  <h1 className="text-2xl font-bold text-center">
                    {corral.Corral}
                  </h1>
                  <p className="text-xl text-center">
                    {corral.Cantidad == 0 ? "" : corral.Cantidad}{" "}
                    {`${corral.Cantidad == 0 && corral.Estatus == 1 ? "Disponible" : "Ocupado"}`}
                  </p>
                </div>
              </div>
            )}
            {/*  */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardCorrales;
