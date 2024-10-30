import axios from "axios"
import { Empleados, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
 
async function getData(): Promise<Empleados[]> {
  const data = await axios.get(`${process.env.URL}/api/users/admin/empleados`)
  console.log(data.data)
  return data.data
}
 
export default async function DemoPage() {
  const data = await getData();
 
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}