import Header from "@/components/user/Header"
import Footer from "@/components/user/Footer"
import { Outlet } from "react-router"

export default function Layout() {
  return (
   <>
   <Header />
   <Outlet />
   <Footer />
   </>
  )
}
