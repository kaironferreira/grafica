import Sidebard from "../sidebar";
import { Outlet } from 'react-router-dom'
export default function Layout() {
    return (
        <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
            <Sidebard />
            <div className="flex-1 p-6 min-h-0 overflow-auto">{<Outlet />}</div>
        </div>
    );
}