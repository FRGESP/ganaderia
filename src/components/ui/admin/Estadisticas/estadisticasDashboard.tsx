'use client'

import axios from "axios"
import React, { useEffect, useState } from "react"

function EstadisticasDashboard() {

    //Interfas de las estadisticas
    interface Estadisticas {
        Inversion: number,
        Ventas: number,
    }

    //Interface para las ventas
    interface Ventas {
        REEMOVENTA: string,
        Psg: string,
        Nombre: string,
        RazonSocial: string,
        Localidad: string,
        Municipio: string,
        Estado: string,
        Corral: string,
        REEMO: string,
        Precio: string
    }

    //Guarda la informacion de las estadisticas
    const [estadisticas, setEstadisticas] = useState<Estadisticas>()

    //Guarda la informacion de las ventas
    const [ventas, setVentas] = useState<Ventas[]>()

    const getVentas = async () => {
        const response = await axios.get('/api/users/admin/estadisticas')
        setEstadisticas(response.data[0][0]);
        setVentas(response.data[1]);
    }

    useEffect(() => {
        getVentas()
    }, [])

  return (
    <div className="w-full h-[90vh] p-10">
      <div className="flex justify-center items-center gap-5">
        <p className="text-3xl"><strong>Inversión actual:</strong> ${estadisticas?.Inversion}</p>
        <p className="text-3xl"><strong>Ventas actuales:</strong> ${estadisticas?.Ventas}</p>
      </div>
      <div className="mt-8">
        <table>
            <thead>
                <tr>
                    <th>REEMOVENTA</th>
                    <th>PSG</th>
                    <th>Nombre</th>
                    <th>Razon Social</th>
                    <th>Localidad</th>
                    <th>Municipio</th>
                    <th>Estado</th>
                    <th>Corral</th>
                    <th>REEMO del corral</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody>
                {ventas?.map((venta, index) => (
                    <tr key={index}>
                        <td>{venta.REEMOVENTA}</td>
                        <td>{venta.Psg}</td>
                        <td>{venta.Nombre}</td>
                        <td>{venta.RazonSocial}</td>
                        <td>{venta.Localidad}</td>
                        <td>{venta.Municipio}</td>
                        <td>{venta.Estado}</td>
                        <td>{venta.Corral}</td>
                        <td>{venta.REEMO}</td>
                        <td>${venta.Precio}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default EstadisticasDashboard
