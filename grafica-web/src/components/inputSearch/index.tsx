import { MagnifyingGlass } from 'phosphor-react'

interface inputSearchProps {

    setBuscaInput: React.Dispatch<React.SetStateAction<string>>
}

export default function InputSearch({ setBuscaInput }: inputSearchProps) {
    return (
        <div className="relative mb-4">

            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlass size={24} className="text-zinc-600" />
            </div>

            <input
                type={'search'}
                onChange={(event) => setBuscaInput(event.target.value)}
                placeholder='Buscar'
                className="w-full block p-2 pl-12 rounded border border-zinc-300 focus:outline-none"
            />

        </div>
    )
}