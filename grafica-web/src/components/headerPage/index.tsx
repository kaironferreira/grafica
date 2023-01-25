import { ReactNode } from 'react';

interface iHeader {
    title: string;
    titleButton: string;
    onClick: () => void;
    icon: ReactNode;
}

export default function HeaderPage({ title, titleButton, onClick, icon }: iHeader) {
    return (
        <header className="flex justify-between items-center">
            <h1 className='text-2xl font-semibold text-slate-800'>{title}</h1>
            <button onClick={onClick} className="flex items-center bg-indigo-800 text-white font-medium rounded p-2 hover:bg-indigo-700 duration-150">
                {titleButton}
                <span className='text-2xl'>{icon}</span>
            </button>
        </header>
    )

}