import { SidebarTrigger } from "./sidebar";
import { getsession } from "@/actions";

async function AppNavbar() {
  const session = await getsession();
  return (
    <div className="w-full border-b border-[#ADB5BD] py-5 bg-[#f5f3f4] flex items-center">
      <SidebarTrigger className="ml-4" />
      <div className="ml-auto mr-10 flex items-center ">
        <p className="text-xl mr-3 font-bold">{`${session.name} ${session.lastname}`}</p>
        <img src="/assets/Almacen/Usuario.png" alt="" className="w-10"/>
      </div>
    </div>
  );
}

export default AppNavbar;
