import { DeleteCookie } from "@/app/services/deleteCookies";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";


 
const links = [
    {name:"Renta de vehículos", href:"/user"},
    {name:"Reserva de tours", href:"/user/tours"},
    {name:"Perfil", href:"/user/profile"},
    
  ]; 

  interface UserSideBarProps {
    isSidebarOpen: boolean;
  }

const UserSideBar: React.FC<UserSideBarProps> = ({ isSidebarOpen}) => {
    const router = useRouter();
    const pathname = usePathname()
    const handleLogout = ()=>{
        DeleteCookie()
        router.push("/login")
      }

    return(
        
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform md:relative md:translate-x-0`}>
          <div className="p-2 flex items-center justify-center border-b border-gray-700">
            <h1 className="text-xl font-medium">Dashboard</h1>
          </div>
          <nav className="flex-1 p-6">
              {links.map((link, idx)=>(
                 <div key={idx}>
                    {pathname === link.href ? (
                        <Link className="flex items-center p-2 bg-gray-700 rounded transition" href={link.href}>
                            {link.name}
                        </Link>
                    ):(
                        <Link href={link.href} className="flex items-center p-2 hover:bg-gray-700 rounded transition">
                            {link.name}
                        </Link>
                    )}
                 </div>   
                ))}
                <Link href="#" onClick={handleLogout} className="flex items-center p-2 hover:bg-gray-700 rounded transition">Log Out</Link>
          </nav>
        </div>
    )
}
export default UserSideBar;