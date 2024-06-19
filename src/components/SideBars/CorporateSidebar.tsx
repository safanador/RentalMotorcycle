import Link from "next/link";
import { usePathname } from "next/navigation";


 
const links = [
    {name:"Renta de vehículos", href:"/corporate"},
    {name:"Reserva de tours", href:"/corporate/tourbooking"},
    {name:"Inventarios", href:"/corporate/inventory"},
    {name:"Locaciones", href:"/corporate/locations"},
    {name:"Informes", href:"/corporate/reports"},


    
  ]; 

  interface UserSideBarProps {
    isSidebarOpen: boolean;
  }

const CorporateSideBar: React.FC<UserSideBarProps> = ({ isSidebarOpen}) => {
    const pathname = usePathname()

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
          </nav>
        </div>
    )
}
export default CorporateSideBar;