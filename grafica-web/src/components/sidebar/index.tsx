import { Package, ChartLineUp, ArrowCircleLeft, ShoppingCart, SignOut, User, UserList } from 'phosphor-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebard() {
    const [open, setOpen] = useState(true);
    const { pathname } = useLocation();

    const menus = [
        { title: "Dashoard", path: '/dashboard', icon: <ChartLineUp /> },
        { title: "Produtos", path: '/products', icon: <Package /> },
        { title: "Clientes", path: '/clients', icon: <UserList /> },
        { title: "Pedidos", path: '/orders', icon: <ShoppingCart /> },
        { title: "Perfil", path: '/profiles', spacing: true, icon: <User /> },
        { title: "Sair", path: '/logout', icon: <SignOut /> }
    ]

    return (
        <div className={`bg-slate-800 p-5 pt-8 ${open ? "w-52" : "w-20"} duration-300 relative `}>
            <ArrowCircleLeft
                onClick={() => setOpen(!open)}
                className={`bg-white text-slate-800 text-3xl rounded-full absolute -right-3 top-9 border-2 border-slate-800 cursor-pointer ${!open && "rotate-180"} `}
            />

            <div className='inline-flex items-center'>
                <Package
                    className={`text-yellow-500 text-4xl cursor-pointer block float-left mr-4 duration-500 ${open && "rotate-[360deg]"}`} />
                <h1
                    className={`text-white origin-center font-medium text-2xl  ${!open && "scale-0"} duration-300`}>Grafica </h1>
            </div>


            <div className='flex flex-col gap-4 pt-6'>
                {menus.map((menu, index) => (
                    <Link key={index} to={menu.path} className={`flex items-center gap-4 text-gray-300 p-2 cursor-pointer ${pathname === menu.path ? "bg-white/10" : ""} hover:bg-white/10 rounded-md ${menu.spacing ? "mt-12" : ""}`}>
                        <span className='text-2xl block float-left'>{menu.icon}</span>
                        <span className={`text-base font-medium flex-1 duration-300 ${!open && "hidden"}`}>{menu.title}</span>
                    </Link>
                ))}
            </div>


        </div>

    )
}