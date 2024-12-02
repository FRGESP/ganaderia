"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Check, Pencil, Plus, Trash } from "lucide-react";
import axios from "axios";
import AddLoteModal from "@/components/ui/almacen/AlmacenPage/addLoteModal";
import { useRouter } from "next/navigation";

//Props de la página de LotesDashboard
interface LotesDashboardProps {
  Rol: number;
  IdArticulo: number;
}

function LotesDashboard({ Rol, IdArticulo }: LotesDashboardProps) {
  const ruta =
    Rol == 1
      ? "/users/admin/almacen"
      : Rol == 2
      ? "/users/almacen/almacenpage"
      : "";

  const { toast } = useToast();
  const router = useRouter();

  //Interface para los lotes
  interface Lotes {
    IdLote: number;
    Articulo: string;
    CantidadActual: number;
    CantidadInicial: number;
    CantidadNumber: number;
    Empleado: string;
    Fecha: string;
    Precio: number;
  }

  //Interface para guardar la información del articulo
  interface Articulos {
    Id: number;
    Articulo: string;
    Cantidad: number;
    Inversion: string;
    Existencia: string;
  }

  //Guarda la información de los lotes
  const [lotes, setLotes] = useState<Lotes[]>([]);

  //Guarda la información de los articulos
  const [articulo, setArticulo] = useState<Articulos>();

  //Controla si se está editando el nombre
  const [isEditingName, setIsEditingName] = useState(false);

  //Guarda la información del input
  const [inputValue, setInputValue] = useState({
    nombre: "",
  });

  //Controla el estado de edicion de cada uno de los inputs del precio
  const [EditLote, setEditLote] = useState<{ [key: number]: boolean }>({});

  //Guarda informacion de las cantidades originales
  const [originalLoteCantidad, setOriginalLoteCantidad] = useState<{
    [key: number]: number;
  }>({});

  //Guarda la informacion de los inputs de la cantidad actual
  const [inputLoteCantidad, setInputLoteCantidad] = useState<{
    [key: number]: number;
  }>({});

  //Controla el cambio del input
  const handleChange = (e: any) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  //Controla el cambio del input
  const handleChangeCantidad = (e: any) => {
    setInputLoteCantidad({
      ...inputLoteCantidad,
      [e.target.name]: Number(e.target.value),
    });
  };

  //Cuando se edita el nombre
  const handleEditNombre = async () => {
    if (inputValue.nombre == "") {
      toast({
        title: "Campos vacío",
        description: "El campo no puede estar vacío",
        variant: "destructive",
      });
      return;
    }
    const response = await axios.post(
      `/api/users/almacen/almacenPage/lotes/${IdArticulo}`,
      { Nombre: inputValue.nombre, Metodo: "Name" }
    );
    if (response.status == 200) {
      toast({
        title: "Nombre editado",
        description: "El nombre ha sido editado correctamente",
        variant: "success",
      });
      setIsEditingName(false);
      getLotes();
    }
  };

  //Borrando articulo
  const handleDeleteArticulo = async () => {
    if (confirm("¿Estás seguro de que deseas eliminar este artículo?")) {
      const response = await axios.delete(
        `/api/users/almacen/almacenPage/${IdArticulo}`
      );
      if (response.status == 200) {
        toast({
          title: "Articulo eliminado",
          description: "El articulo ha sido eliminado correctamente",
          variant: "success",
        });
        router.back();
      } else {
        toast({
          title: "Error",
          description: "No se pudo eliminar el articulo",
          variant: "destructive",
        });
      }
    }
  };

  //Cuando se edita la cantidad
  const handleEditCantidad = async (IdLote: number) => {
    if (inputLoteCantidad[IdLote] < 0) {
      toast({
        title: "Valor negativo",
        description: "La cantidad no puede ser negativa",
        variant: "destructive",
      });
      return;
    }
    if (inputLoteCantidad[IdLote] > originalLoteCantidad[IdLote]) {
      toast({
        title: "Valor mayor que la cantidad actual",
        description: "Ingrese un nuevo lote para aumentar el inventario",
        variant: "destructive",
      });
      return;
    }
    const response = await axios.put(
      `/api/users/almacen/almacenPage/lotes/${IdLote}`,
      { Cantidad: inputLoteCantidad[IdLote] }
    );
    if (response.status == 200) {
      toast({
        title: "Cantidad editada",
        description: "La cantidad ha sido editada correctamente",
        variant: "success",
      });
      selectEditCantidad(IdLote);
      getLotes();
    }
  };

  //Borra el lote
  const handleDeleteLote = async (IdLote: number) => {
    const response = await axios.delete(
      `/api/users/almacen/almacenPage/lotes/${IdLote}`
    );
    if (response.status == 200) {
      toast({
        title: "Lote eliminado",
        description: "El lote ha sido eliminado correctamente",
        variant: "success",
      });
      getLotes();
    } else {
      toast({
        title: "Error",
        description: "No se pudo eliminar el lote",
        variant: "destructive",
      });
    }
  };

  //Pone en edicion el input de la cantidad
  const selectEditCantidad = (IdLote: number) => {
    setEditLote((prevEditLote) => ({
      ...prevEditLote,
      [IdLote]: !EditLote[IdLote],
    }));
  };

  //Obtiene los lotes
  const getLotes = async () => {
    const response = await axios.get(
      `/api/users/almacen/almacenPage/lotes/${IdArticulo}`
    );
    setLotes(response.data[0]);
    setArticulo(response.data[1][0]);
    inputValue.nombre = response.data[1][0].Articulo;

    response.data[0].map((lote: Lotes) => {
      setEditLote((prevEditLote) => ({
        ...prevEditLote,
        [lote.IdLote]: false,
      }));

      setInputLoteCantidad((prevInputValues) => ({
        ...prevInputValues,
        [lote.IdLote]: Number(lote.CantidadNumber),
      }));

      setOriginalLoteCantidad((prevCantidad) => ({
        ...prevCantidad,
        [lote.IdLote]: Number(lote.CantidadNumber),
      }));
    });
  };

  useEffect(() => {
    getLotes();
  }, []);

  return (
    <div className="p-10">
      <div className=" h-12 flex justify-center items-center mb-10">
        {!isEditingName ? (
          <p className="text-3xl font-bold">{articulo?.Articulo}</p>
        ) : (
          <input
            type="text"
            className="border border-black w-15 px-2 py-1 rounded-md"
            name="nombre"
            onChange={handleChange}
            defaultValue={articulo?.Articulo}
            autoFocus
          />
        )}
        <button
          className={
            !isEditingName
              ? "bg-yellow-600 hover:bg-yellow-700 rounded-md ml-1"
              : "bg-acento hover:bg-acentohover rounded-md ml-1"
          }
          onClick={() => {
            !isEditingName ? setIsEditingName(true) : handleEditNombre();
          }}
        >
          {!isEditingName ? (
            <Pencil className="text-white h-7 w-7 m-1" />
          ) : (
            <Check className="text-white h-7 w-7 m-1" />
          )}
        </button>

        <p className="text-3xl ml-4">
          <strong>Lotes:</strong> {articulo?.Cantidad}
        </p>
        <p className="text-3xl ml-4">
          <strong>Existencia:</strong>{" "}
          {articulo?.Existencia ? articulo?.Existencia : "0"}
        </p>
        {Rol == 1 && (
          <p className="text-3xl ml-4">
            <strong>Inversión:</strong>{" "}
            {articulo?.Cantidad == 0
              ? "No hay lotes"
              : `$${articulo?.Inversion}`}
          </p>
        )}
        {lotes.length == 0 ? (
          <button
            className="bg-red-600 hover:bg-red-700 rounded-md ml-3"
            onClick={handleDeleteArticulo}
          >
            <Trash className="text-white h-7 w-7 m-1" />
          </button>
        ) : (
          ""
        )}
        <AddLoteModal ArticuloId={IdArticulo} />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>IdLote</th>
              <th>Artículo</th>
              {Rol == 1 && <th>Empleado que registró</th>}
              <th>Fecha de registro</th>
              <th>Cantidad Actual</th>
              <th>Cantidad Inicial</th>
              {Rol == 1 && <th>Precio compra</th>}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lotes.map((lote) => (
              <tr key={lote.IdLote}>
                <td>{lote.IdLote}</td>
                <td>{lote.Articulo}</td>
                {Rol == 1 && <td>{lote.Empleado}</td>}
                <td>{lote.Fecha}</td>
                <td>
                  {!EditLote[lote.IdLote] ? (
                    lote.CantidadActual
                  ) : (
                    <input
                      className="border border-black py-1 px-1"
                      defaultValue={lote.CantidadNumber}
                      autoFocus
                      type="number"
                      name={lote.IdLote.toString()}
                      onChange={handleChangeCantidad}
                    />
                  )}
                </td>
                <td>{lote.CantidadInicial}</td>
                {Rol == 1 && <td>${lote.Precio}</td>}
                <td>
                  <div className="flex justify-center">
                    <button
                      className={
                        !EditLote[lote.IdLote]
                          ? "hover:bg-[#ececec] border border-[#ececec] rounded-md ml-1"
                          : "bg-acento hover:bg-acentohover rounded-md ml-1"
                      }
                      onClick={() => {
                        !EditLote[lote.IdLote]
                          ? selectEditCantidad(lote.IdLote)
                          : handleEditCantidad(lote.IdLote);
                      }}
                    >
                      {!EditLote[lote.IdLote] ? (
                        <Pencil className="text-yellow-600 h-7 w-7 m-1" />
                      ) : (
                        <Check className="text-white h-7 w-7 m-1" />
                      )}
                    </button>
                    {Rol == 1 && (
                      <button
                        className="hover:bg-[#ececec] border border-[#ececec] rounded-md ml-3"
                        onClick={() => handleDeleteLote(lote.IdLote)}
                      >
                        <Trash className="text-red-600 h-7 w-7 m-1" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LotesDashboard;
