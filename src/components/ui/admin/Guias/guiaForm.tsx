"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Check, Pen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface GuiaFormProps {
  idGuia: String;
}

function GuiaForm({ idGuia }: GuiaFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  interface GuiasInfo {
    REEMO: string;
    Fecha: string;
    Nombre: string;
    Motivo: string;
    ESTADO: string;
  }

  interface AnimalesInfo {
    Arete: string;
    Sexo: string;
    Meses: string;
    Clasificacion: string;
    Estado: string;
    Corral: string;
    Peso: number;
    PrecioCompra: number;
  }

  //Guarda la informacion de la guia
  const [guiaInfo, setGuia] = useState<GuiasInfo>();

  //Guarda la informacion de los animales de la guia
  const [animalesInfo, setAnimales] = useState<AnimalesInfo[]>([]);

  //Guarda la informacion de los inputs de los animales
  const [inputValues, setInputValue] = useState<{ [key: string]: any }>({});

  //Guarda la informacion de los inputs de la guia
  const [inputGuia, setInputGuia] = useState<{ [key: string]: any }>({
    Psg: "",
    Nombre: "",
    RazonSocial: "",
    Localidad: "",
    Municipio: "",
    Estado: "",
  });

  //Gaurda las images de los documentos
  const [file, setFile] = useState<File | null>(null);

  //Controla el estado de edicion de cada uno de los inputs del precio
  const [editPrice, setEditPrice] = useState<{ [key: string]: boolean }>({});

  //Controla los cambios en los inputs
  const handleChange = (e: any) => {
    setInputValue({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  //Controla los cambios en los inputs de la guia
  const handleChangeGuia = (e: any) => {
    setInputGuia({
      ...inputGuia,
      [e.target.name]: e.target.value,
    });
  };

  //Obtiene la informacion de la guia
  const getGuiaInfo = async () => {
    const response = await axios.get(`/api/users/admin/guias/${idGuia}`);
    setGuia(response.data[0][0]);
    setAnimales(response.data[1]);
    response.data[1].map((animal: AnimalesInfo) => {
      if (animal.PrecioCompra !== null) {
        setEditPrice((prevEditPrice) => ({
          ...prevEditPrice,
          [animal.Arete]: true,
        }));
        setInputValue((prevInputValues) => ({
          ...prevInputValues,
          [animal.Arete]: animal.PrecioCompra,
        }));
      }
    });
  };

  //Se ejecuta cada vez que se guarda el precio de un animal
  const handleSavePrice = async (arete: string) => {
    if (inputValues[arete] === "" || inputValues[arete] === undefined) {
      toast({
        title: "Campo del precio vacio",
        description: `Inserte el campo del precio del animal ${arete}`,
        variant: "destructive",
      });
      return;
    }
    const response = await axios.put("/api/users/admin/guias", {
      Arete: arete,
      Precio: inputValues[arete],
    });
    if (response.status === 200) {
      const input = document.getElementById(arete) as HTMLInputElement;
      input.focus();
      setEditPrice({
        ...editPrice,
        [arete]: true,
      });
      toast({
        title: `Precio del animal ${arete} guardado`,
        description: "Se guardó el precio del animal correctamente",
        variant: "success",
      });
    } else {
      toast({
        title: "Error al guardar el precio",
        description: "Ocurrio un error al guardar el precio del animal",
        variant: "destructive",
      });
    }
  };

  //Se ejecuta cada vez que el usuario quiere editar el precio de un animal
  const handleEditPrice = (arete: string) => {
    const input = document.getElementById(arete) as HTMLInputElement;
    input.disabled = false;
    input.focus();
    setEditPrice({
      ...editPrice,
      [arete]: false,
    });
  };

  const handleSubimit = async () => {
    console.log(inputGuia);
    console.log(animalesInfo.length);
    console.log(Object.keys(editPrice).length);
    if (Object.keys(editPrice).length !== animalesInfo.length) {
      toast({
        title: "Precios faltantes",
        description: "Faltan precios por guardar",
        variant: "destructive",
      });
      return;
    }
    if (
      inputGuia.Psg === "" ||
      inputGuia.Nombre === "" ||
      inputGuia.RazonSocial === "" ||
      inputGuia.Localidad === "" ||
      inputGuia.Municipio === "" ||
      inputGuia.Estado === ""
    ) {
      toast({
        title: "Campos vacios",
        description: "Llene todos los campos de la guia",
        variant: "destructive",
      });
      return;
    }
    const formData = new FormData();
    if(file){
      formData.append('file', file as Blob);
    } else{
      toast({
        title: "Fierros faltantes",
        description: "Falta la imagen de los fierros",
        variant: "destructive",
      });
      return;
    }
    formData.append('Psg', inputGuia.Psg);
    formData.append('Nombre', inputGuia.Nombre);
    formData.append('RazonSocial', inputGuia.RazonSocial);
    formData.append('Localidad', inputGuia.Localidad);
    formData.append('Municipio', inputGuia.Municipio);
    formData.append('Estado', inputGuia.Estado);

    
    
    const response = await axios.post(`/api/users/admin/guias/${idGuia}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
   if(response.status === 200){
    toast({
      title: "Guia guardada",
      description: "Se guardó la guia correctamente",
      variant: "success",
    })
    router.push('/users/admin/guias');
   }
  };

  useEffect(() => {
    getGuiaInfo();
  }, []);

  return (
    <div className="h-[90vh] w-full p-5 flex flex-col items-center">
      <div className="flex h-10 w-full justify-center gap-14">
        <h1 className="font-bold text-3xl">REEMO {idGuia}</h1>
        <h1 className="font-bold text-3xl">
          Fecha de registro: {guiaInfo?.Fecha}
        </h1>
        <h1 className="font-bold text-3xl">Motivo: {guiaInfo?.Motivo}</h1>
        <h1 className="font-bold text-3xl">Estado: {guiaInfo?.ESTADO}</h1>
      </div>
      <div className="w-[90%] border-2 border-black rounded-md shadow-md h-[90%] mt-8 p-7 ">
        <div className=" w-full h-full flex flex-col gap-2 overflow-y-auto">
          <div className="flex h-10 w-full  justify-center">
            <h1 className="font-bold text-2xl mb-5">Datos de la Guia</h1>
          </div>
          <label htmlFor="" className="text-xl font-bold">
            PSG:
          </label>
          <input
            type="number"
            className="w-full border border-black px-2 py-2 rounded-md"
            onChange={handleChangeGuia}
            name="Psg"
          />
          <label htmlFor="" className="text-xl font-bold">
            Nombre:
          </label>
          <input
            type="text"
            className="w-full border border-black px-2 py-2 rounded-md"
            onChange={handleChangeGuia}
            name="Nombre"
          />
          <label htmlFor="" className="text-xl font-bold">
            Razón Social:
          </label>
          <input
            type="text"
            className="w-full border border-black px-2 py-2 rounded-md"
            onChange={handleChangeGuia}
            name="RazonSocial"
          />
          <label htmlFor="" className="text-xl font-bold">
            Localidad:
          </label>
          <input
            type="text"
            className="w-full border border-black px-2 py-2 rounded-md"
            onChange={handleChangeGuia}
            name="Localidad"
          />
          <label htmlFor="" className="text-xl font-bold">
            Municipio:
          </label>
          <input
            type="text"
            className="w-full border border-black px-2 py-2 rounded-md"
            onChange={handleChangeGuia}
            name="Municipio"
          />
          <label htmlFor="" className="text-xl font-bold">
            Estado:
          </label>
          <input
            type="text"
            className="w-full border border-black px-2 py-2 rounded-md"
            onChange={handleChangeGuia}
            name="Estado"
          />
          <div className="flex h-10 w-full  justify-center">
            <h1 className="font-bold text-2xl mt-5">Datos de los animales</h1>
          </div>
          <div className="w-full h-auto border border-black mt-5">
            <table>
              <thead>
                <tr className="sticky top-0">
                  <th>Arete</th>
                  <th>Sexo</th>
                  <th>Meses</th>
                  <th>Clasificación</th>
                  <th>Peso</th>
                  <th>Corral</th>
                  <th>Estado</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {animalesInfo.map((animal) => (
                  <tr key={animal.Arete} className="hover:bg-gray-100">
                    <td>{animal.Arete}</td>
                    <td>{animal.Sexo}</td>
                    <td>{animal.Meses}</td>
                    <td>{animal.Clasificacion}</td>
                    <td>{animal.Peso}</td>
                    <td>{animal.Corral}</td>
                    <td>{animal.Estado}</td>
                    <td className="max-w-[20vh]">
                      <div className="flex items-center">
                        <p className="mr-1">$</p>
                        <input
                          type="number"
                          className={`border border-black flex-grow py-1 px-2 rounded-md`}
                          name={animal.Arete}
                          id={animal.Arete}
                          onChange={handleChange}
                          defaultValue={animal.PrecioCompra}
                          disabled={editPrice[animal.Arete]}
                        />
                        {!editPrice[animal.Arete] && (
                          <button
                            className=" ml-3 p-1 rounded-sm bg-acento hover:bg-acentohover"
                            onClick={() => handleSavePrice(animal.Arete)}
                          >
                            <Check className="text-white " />
                          </button>
                        )}
                        {editPrice[animal.Arete] && (
                          <button
                            className=" ml-3 p-1 rounded-sm bg-yellow-500 hover:bg-yellow-600"
                            onClick={() => handleEditPrice(animal.Arete)}
                          >
                            <Pen className="text-white " />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex h-10 w-full  justify-center">
            <h1 className="font-bold text-2xl mt-5">Fierros</h1>
          </div>
          <input
            type="file"
            className="w-full border border-black px-2 py-2 rounded-md mt-5"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
          />
          {file && (
            <div className="flex h-auto w-full  justify-center">
            <img src={URL.createObjectURL(file)} alt="Imagen de los fierros" className="max-w-[30%] h-auto border border-black p-2 object-contain"/>
            </div>
          )}
          <button
            onClick={handleSubimit}
            className="bg-acento hover:bg-acentohover w-full p-7 text-xl rounded-full py-8"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default GuiaForm;
