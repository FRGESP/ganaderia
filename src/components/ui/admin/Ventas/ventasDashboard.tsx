"use client";

import SettingsModal from "@/components/ui/admin/Ventas/settingsModal";
import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

function VentasDashboard() {

    const { toast } = useToast();

  //Interface de los animales
  interface Animales {
    Arete: string;
    Sexo: string;
    Meses: number;
    Clasificacion: string;
    Corral: string;
    Peso: string;
    PrecioCompra: number;
  }

  //Interfae de la información del corral seleccionado
  interface CorralInfo {
    Inversion: number;
    Precio: number;
    Ganancia: number;
    REEMO: string;
    PrecioNumber: number;
  }

  //Interface para el corral seleccionado
  interface Corral {
    Id: string;
    Corral: string;
  }

  //Opciones de los corrales para venta
  const [CorralesOptions, setCorralesOptions] = useState<any[]>([]);

  //Guarda el valor de los inputs
  const [inputValue, setInputValue] = useState({
    Corral: "",
    precioFinal: 0,
    psg: '',
    nombre: '',
    razonSocial: '',
    municipio: '',
    localidad: '',
    estado: '',
  });

  //Guarda el valor del corral seleccionado
  const [corralSelected, setCorralSelected] = useState<Corral>();

  //Si está seleccionado un corral
  const [isSelected, setisSelected] = useState(false);

  //Guarda la informacón de los animales del corral seleccionado
  const [AnimalesCorral, setAnimalesCorral] = useState<Animales[]>([]);

  //Guarda la información del corral seleccionado
  const [CorralInfo, setCorralInfo] = useState<CorralInfo>();

  const corralesOptions = async () => {
    const response = await axios.get("/api/users/admin/ventas/corrales");
    console.log(response.data[0]);
    if(response.data[0][0] != null){
        const ItOptions = response.data[0].map((item: any) => {
            return {
              value: item.Id,
              label: item.Corral,
              name: "Corral",
            };
          });
          setCorralesOptions(ItOptions);
    }
  };

  //Controla el cambio del input
    const handleChange = (e: any) => {
        setInputValue({
        ...inputValue,
        [e.target.name]: e.target.value,
        });
    };

  //Controla el cambio del select
  const handleSelectChange = (selectedOption: any) => {
    setInputValue({
      ...inputValue,
      [selectedOption.name]: selectedOption.value,
    });
    const corral = { Id: selectedOption.value, Corral: selectedOption.label };
    setCorralSelected(corral);
  };

  // Obtiene la información del corral seleccionado
  const getCorralVenta = async () => {
    const response = await axios.post("/api/users/admin/ventas/corrales", {
      Corral: corralSelected?.Id,
    });
    setAnimalesCorral(response.data[1]);
    setCorralInfo(response.data[0][0]);
    inputValue.precioFinal = response.data[0][0].PrecioNumber;
  };

  //Controla la venta del corral
  const handleVenta = async () => {
    if(inputValue.precioFinal == 0 || inputValue.psg == '' || inputValue.nombre == '' || inputValue.razonSocial == '' || inputValue.municipio == '' || inputValue.localidad == '' || inputValue.estado == ''){
        toast({
            title: "Campos vacíos",
            description: "Todos los campos son obligatorios",
            variant: "destructive",
        });
        return;
    }
    const response = await axios.post('/api/users/admin/ventas', {Corral: corralSelected?.Id, Reemo: CorralInfo?.REEMO, Precio: inputValue.precioFinal, Psg: inputValue.psg, Nombre: inputValue.nombre, Razon: inputValue.razonSocial, Municipio: inputValue.municipio, Localidad: inputValue.localidad, Estado: inputValue.estado});
    if(response.status == 200){
        toast({
            title: "Venta realizada",
            description: "La venta ha sido realizada correctamente",
            variant: "success",
        });
        window.location.reload();
    } else{
        toast({
            title: "Error",
            description: "No se pudo realizar la venta",
            variant: "destructive",
        });
    }
    console.log(inputValue);
  }

  useEffect(() => {
    if (corralSelected?.Id != "") {
      getCorralVenta();
    }
  }, [corralSelected]);

  useEffect(() => {
    corralesOptions();
  }, []);

  return (
    <div className="h-[90vh] p-10 relative flex justify-center items-center">
      <SettingsModal />
      <div className="border-2 border-black w-[60%] min-h-[60%] h-auto max-h-[95%] overflow-y-auto rounded-md p-5">
        <p className="text-2xl font-bold text-center mb-2">
          {corralSelected
            ? `Corral ${corralSelected?.Corral}`
            : "Seleccione el corral a vender"}
        </p>
        {!isSelected && (
          <Select
            options={CorralesOptions}
            className="w-full border border-black rounded-md"
            onChange={handleSelectChange}
            instanceId="unique-select-id"
          />
        )}
        {corralSelected && (
          <div className="mt-5">
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Inversión</th>
                    <th>Precio Sugerido</th>
                    <th>Ganancia</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>${CorralInfo?.Inversion}</td>
                    <td>${CorralInfo?.Precio}</td>
                    <td>${CorralInfo?.Ganancia}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {!isSelected && (<div>
              <p className="text-2xl font-bold text-center my-5">Animales</p>
              <div className="max-h-[30%] overflow-y-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Arete</th>
                      <th>Sexo</th>
                      <th>Meses</th>
                      <th>Clasificación</th>
                      <th>Corral</th>
                      <th>Peso</th>
                      <th>Precio de Compra</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AnimalesCorral.map((animal) => (
                      <tr key={animal.Arete}>
                        <td>{animal.Arete}</td>
                        <td>{animal.Sexo}</td>
                        <td>{animal.Meses}</td>
                        <td>{animal.Clasificacion}</td>
                        <td>{animal.Corral}</td>
                        <td>{animal.Peso}</td>
                        <td>${animal.PrecioCompra}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="px-[20%] py-2 font-semibold text-white bg-acento rounded hover:bg-acentohover mt-5 w-full" onClick={() => setisSelected(true)}>
                Aceptar
              </button>
            </div>)}
          </div>
        )}
        {isSelected && (
            <div className="mt-5 gap-5 flex flex-col">
                <div>
                     <label
                          htmlFor=""
                          className="font-bold text-lg flex-grow text-left"
                        >
                          Precio Final:
                        </label>
                        <input
                          type="number"
                          className="border border-black rounded-md w-full py-2 px-2"
                          placeholder="Ingrese el precio final de venta"
                          autoFocus
                          name="precioFinal"
                          defaultValue={CorralInfo?.PrecioNumber}
                          onChange={handleChange}
                        />
                 </div>
                 <div>
                     <label
                          htmlFor=""
                          className="font-bold text-lg flex-grow text-left"
                        >
                          PSG:
                        </label>
                        <input
                          type="number"
                          className="border border-black rounded-md w-full py-2 px-2"
                          placeholder="Ingrese el PSG del ganadero"
                          autoFocus
                          name="psg"
                          onChange={handleChange}
                        />
                 </div>
                 <div>
                     <label
                          htmlFor=""
                          className="font-bold text-lg flex-grow text-left"
                        >
                          Nombre:
                        </label>
                        <input
                          type="text"
                          className="border border-black rounded-md w-full py-2 px-2"
                          placeholder="Ingrese el nombre del ganadero"
                          autoFocus
                          name="nombre"
                          onChange={handleChange}
                        />
                 </div>
                 <div>
                     <label
                          htmlFor=""
                          className="font-bold text-lg flex-grow text-left"
                        >
                          Razón Social:
                        </label>
                        <input
                          type="text"
                          className="border border-black rounded-md w-full py-2 px-2"
                          placeholder="Ingrese la razón social"
                          autoFocus
                          name="razonSocial"
                          onChange={handleChange}
                        />
                 </div>
                 <div>
                     <label
                          htmlFor=""
                          className="font-bold text-lg flex-grow text-left"
                        >
                          Municipio:
                        </label>
                        <input
                          type="text"
                          className="border border-black rounded-md w-full py-2 px-2"
                          placeholder="Ingrese el municipio"
                          autoFocus
                          name="municipio"
                          onChange={handleChange}
                        />
                 </div>
                 <div>
                     <label
                          htmlFor=""
                          className="font-bold text-lg flex-grow text-left"
                        >
                          Localidad:
                        </label>
                        <input
                          type="text"
                          className="border border-black rounded-md w-full py-2 px-2"
                          placeholder="Ingrese la localidad"
                          autoFocus
                          name="localidad"
                          onChange={handleChange}
                        />
                 </div>
                 <div>
                     <label
                          htmlFor=""
                          className="font-bold text-lg flex-grow text-left"
                        >
                          Estado:
                        </label>
                        <input
                          type="text"
                          className="border border-black rounded-md w-full py-2 px-2"
                          placeholder="Ingrese el estado"
                          name="estado"
                          onChange={handleChange}
                        />
                 </div>
                 <div className="flex gap-5 justify-center">
                  <button
                  onClick={() => window.location.reload()}
                    className="px-[20%] py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600 mt-5"
                  >
                    Cancelar
                  </button>
                  <button
                  onClick={() => handleVenta()}
                    className="px-[20%] py-2 font-semibold text-white bg-acento rounded hover:bg-acentohover mt-5"
                  >
                    Vender
                  </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}

export default VentasDashboard;
