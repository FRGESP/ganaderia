import Link from "next/link";

function DietasDashboard() {
  return (
    <div>
      <div className="w-full h-[90vh] p-12">
        <div className="border-2 border-black h-full w-full rounded-lg px-14 py-8 overflow-y-auto bg-slate-50">
          <div className="flex justify-center">
            <p className="text-3xl font-bold">Dietas</p>
          </div>
          <div className="grid grid-cols-3 gap-3 justify-center items-center h-[calc(full-2rem)] mt-5">
            <Link className="border-2 border-black h-72 w-full rounded-lg hover:border-acento" href={'/users/almacen/dietas/1'}>
              <div className="flex items-center">
                <div className=" h-[calc(18rem-5px)] w-auto border-r-2 rounded-md border-black bg-blue-400">
                  <img
                    src="/assets/Almacen/Abasto.png"
                    alt="AbastoImage"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                    <p className="text-3xl font-bold text-center">Abasto</p>
                </div>
              </div>
            </Link>
            <Link className="border-2 border-black h-72 w-full rounded-lg hover:border-acento" href={'/users/almacen/dietas/2'}>
            <div className="flex items-center">
                <div className=" h-[calc(18rem-5px)] w-auto border-r-2 rounded-md border-black bg-purple-700">
                  <img
                    src="/assets/Almacen/Inicio.png"
                    alt="InicioImage"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                    <p className="text-3xl font-bold text-center">Inicio</p>
                </div>
              </div>
            </Link>
            <Link className="border-2 border-black h-72 w-full rounded-lg hover:border-acento" href={'/users/almacen/dietas/3'}>
            <div className="flex items-center">
                <div className=" h-[calc(18rem-5px)] w-auto border-r-2 rounded-md border-black bg-orange-400">
                  <img
                    src="/assets/Almacen/Desaarrollo.png"
                    alt="DesarrolloImage"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                    <p className="text-3xl font-bold text-center">Desarrollo</p>
                </div>
              </div>
            </Link>
            <Link className="border-2 border-black h-72 w-full rounded-lg hover:border-acento" href={'/users/almacen/dietas/4'}>
            <div className="flex items-center">
                <div className=" h-[calc(18rem-5px)] w-auto border-r-2 rounded-md border-black bg-yellow-400">
                  <img
                    src="/assets/Almacen/Engorda.png"
                    alt="EngordaImage"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                    <p className="text-3xl font-bold text-center">Engorda</p>
                </div>
              </div>
            </Link>
            <Link className="border-2 border-black h-72 w-full rounded-lg hover:border-acento" href={'/users/almacen/dietas/5'}>
            <div className="flex items-center">
                <div className=" h-[calc(18rem-5px)] w-auto border-r-2 rounded-md border-black bg-green-600">
                  <img
                    src="/assets/Almacen/Finalizacion.png"
                    alt="FinalizaciónImage"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                    <p className="text-3xl font-bold text-center">Finalización</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DietasDashboard;
