import { getsession,roles } from "@/actions";
import FormLogin from "@/components/ui/Login/form-login";

async function Home() {
  const session = await getsession();
  if(session.islogged){
    await roles();
  }

  return (
    // <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-300 via-white to-gray-300">
    //   <div className="w-40 h-auto mb-4">
    //     <img src="/assets/Login/Logo.png" alt="" />
    //   </div>
    //   <div className="w-96 "><FormLogin /></div>
    //   <h2 className="mt-4">heyy</h2>
    // </div>
    

    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-gray-300 via-white to-gray-300">
      <div className="w-40 h-auto mb-4">
        <img src="/assets/Login/Logo.png" alt="" />
      </div>
      <div className="max-w-lg w-full">
        <FormLogin />
      </div>
      <div className="mt-20 grid gap-7 grid-cols-5">
      <div className="w-52 h-auto">
      <img src="/assets/Login/Login-Image1.png" alt="" />
      </div>
      <div className="w-44 h-auto">
      <img src="/assets/Login/Login-Image2.png" alt="" />
      </div>
      <div className="w-40 h-auto">
      <img src="/assets/Login/Login-Image3.png" alt="" />
      </div>
      <div className="w-40 h-auto">
      <img src="/assets/Login/Login-Image4.png" alt="" />
      </div>
      <div className="w-40 h-auto">
      <img src="/assets/Login/Login-Image5.png" alt="" />
      </div>
      </div>
    </div>
  );
}

export default Home;
