import Form from "@/components/cadastropaciente"

export default function Loginpage() {
  return (
    <main className="">
        {/* <Headerlogin /> */}
        <div className="flex flex-col py-[10px]">
            <div className="flex justify-items-center items-center flex-col py-[10px]">
                <img src="Nootrino-logo.png" width={400} height={400} alt="Logo"></img>
            </div>
            <div className="flex flex-col py-[10px] items-center align-center">
                <h1 className="text-[#32bb67] font-bold text-3xl">Cadastro Paciente</h1>
            </div>
            <div>
                <Form />
            </div>
        </div>
    </main>
  )
}