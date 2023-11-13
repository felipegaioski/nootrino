import Landingpage from "@/components/landingpage";
import Headerlogin from "@/components/headerlogin"

export default function Home() {
  return (
    <main className="">
      <Headerlogin />
      <Landingpage/>
    </main>
  )
}


/*export default function Landingpage() {
  return (
    <main className='ml-[80px] pt-[60px] flex gap-[20px] px-[20px]'>
      <a href="/home">home</a>
    </main>
  )
}
*/