import Header from '@/components/header'
import SidebarPaciente from '@/components/sidebarpaciente'

export default function LoggedinLayout({ children }) {
  return (
    <main>
      <Header />
      <SidebarPaciente />
      {children}
    </main>
  )
}