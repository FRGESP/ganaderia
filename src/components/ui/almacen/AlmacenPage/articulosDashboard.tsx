'use client'
import axios from "axios";
import { MoveRight, Search } from "lucide-react";
import { useState, useEffect } from "react";
import AddArticuloModal from "@/components/ui/almacen/AlmacenPage/addArticuloModal";
import Link from "next/link";

//Props de la página de ArticulosDashboard
interface ArticulosDashboardProps {
    Rol: number;
    CategoriaProp : number;
}

function ArticulosDashboard({Rol, CategoriaProp}: ArticulosDashboardProps) {

    const ruta =
    Rol == 1
      ? "/users/admin/almacen"
      : Rol == 2
      ? "/users/almacen/almacenpage"
      : "";

      const categoria = CategoriaProp == 1 ? "Almacen" : "Medicamento";

//Interface para los articulos
interface Articulos {
    Id: number;
    Articulo: string;
    Existencia: string;
    Inversion: number;
}

    //Guarda el input de la barra e busqueda
const [inputValue, setInputValue] = useState({
    search: "",
});

//Guarda la información de los articulos
const [articulos, setArticulos] = useState<Articulos[]>([]);

//Obtiene los articulos
const getArticulos = async () => {
    const response = await axios.put("/api/users/almacen/almacenPage", {Nombre: inputValue.search, Categoria: categoria});
    setArticulos(response.data[0]);
}

useEffect(() => {
    getArticulos();
}, []);

//Controla el cambio del input
const handleChange = (e: any) => {
    setInputValue({
        ...inputValue,
        [e.target.name]: e.target.value,
    });
};
  return (
    <div className="p-10">
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
          onClick={() => getArticulos()}
        >
          <Search size={44} />
        </button>
        <AddArticuloModal CategoriaModalProp={categoria}/>
      </div>
      <div>
            <table>
                <thead>
                    <tr>
                        <th>Artículo</th>
                        <th>Existencia</th>
                        {Rol == 1 ? <th>Inversión actual</th> : null}
                        <th>Lotes</th>
                    </tr>
                </thead>
                <tbody>
                    {articulos.map((articulo) => (
                        <tr key={articulo.Id}>
                            <td>{articulo.Articulo}</td>
                            <td>{articulo.Existencia ? (articulo.Existencia) : 'Sin existencias'}</td>
                            {Rol == 1 ? <td>{articulo.Existencia ? (`$${articulo.Inversion}`): 'Sin inversión'}</td> : null}
                            <td className="flex justify-center">
                  <Link className=" bg-acento hover:bg-green-700 rounded-sm" href={`${ruta}/${articulo.Id}`}>
                    <MoveRight className="text-white m-1" />
                  </Link>
                  
                </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ArticulosDashboard
