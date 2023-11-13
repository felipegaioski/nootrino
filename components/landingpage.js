

export default function Landingpage() {
    return(
        <div className="h-screen w-screen justify-center items-center bg-[#32bb67]">  
            <div className="flex justify-items-center items-center flex-col ">
                    <img src="Nootrino-logo-branco.png" width={600} height={600}></img>
                <h1 className="text-[#FFFF] text-3xl font-bold">Bem-vindo à Nootrino</h1>
                <br></br>
                <h2 className="text-[#FFFF] text-sm">Faça login ou cadastre-se para acessar o sistema</h2>
                <div className="landing">
                    <button>Cadastre-se</button>
                </div>
                <a href="/home">home</a>
            </div>
    </div>
    )
}