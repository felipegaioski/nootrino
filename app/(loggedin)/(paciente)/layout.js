import Header from '@/components/header'
import Sidebar from '@/components/sidebar'

export default function LoggedinLayout({ children }) {
  return (
    <main>
      <Header />
      <Sidebar />
      {children}
    </main>
  )
}