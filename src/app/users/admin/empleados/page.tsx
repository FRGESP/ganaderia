import axios from "axios"
import { Empleados, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { getId } from "@/actions"
 
async function getData(): Promise<Empleados[]> {
  const id = await getId()
  const data = await axios.post(`${process.env.URL}/api/users/admin/empleados`, id)
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