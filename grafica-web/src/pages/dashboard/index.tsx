import { Package, ShoppingCart, UserList } from "phosphor-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();


    return (

        <div className="flex flex-col gap-4">

            <header className="flex justify-between items-center bg-white rounded p-4 shadow-sm">
                <h1 className='text-2xl font-semibold text-slate-800'>Dashboard</h1>
            </header>

            <div className='p-4 bg-white rounded'>
                <div className="flex gap-4">
                    <div onClick={() => navigate('/clients')} className="bg-green-500 w-1/3 h-28 p-4 rounded-lg flex flex-col justify-center items-center text-white text-2xl hover:bg-green-500/90 cursor-pointer">
                        <strong className="text-3xl">3</strong>
                        <span className="flex gap-2 justify-center items-center mt-2"><UserList size={32} /> Clientes </span>
                    </div>

                    <div onClick={() => navigate('/clients')} className="bg-yellow-500 w-1/3 h-28 p-4 rounded-lg flex flex-col justify-center items-center text-white text-2xl hover:bg-yellow-500/90 cursor-pointer">
                        <strong className="text-3xl">5</strong>
                        <span className="flex gap-2 justify-center items-center mt-2"><Package size={32} /> Produtos </span>
                    </div>

                    <div onClick={() => navigate('/clients')} className="bg-blue-500 w-1/3 h-28 p-4 rounded-lg flex flex-col justify-center items-center text-white text-2xl hover:bg-blue-500/90 cursor-pointer">
                        <strong className="text-3xl">5</strong>
                        <span className="flex gap-2 justify-center items-center mt-2"><ShoppingCart size={32} />Pedidos </span>
                    </div>
                </div>
            </div>
        </div>

    );
}