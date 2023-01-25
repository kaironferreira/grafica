import { useEffect, useState } from 'react';
import InputSearch from '../../components/inputSearch';
import { iClient } from '../../interfaces/Client';
import { useApi } from '../../lib/axios';
import ModalClient from './model';
import { Eye, Pen, Plus, Trash, X, Check, ShoppingCart } from 'phosphor-react'


export default function Client() {
    const [openModal, setOpenModal] = useState(false);
    const [client, setClient] = useState<iClient[]>([]);
    const [idClient, setIdClient] = useState('');
    const [flag, setFlag] = useState('');
    const [search, setSearch] = useState('');


    async function loadClient() {
        await useApi.get('/clients').then((response) => {
            setClient(response.data);
        });
    }

    async function deleteClient(id: Number) {
        await useApi.delete(`/clients/${id}`);
    }


    useEffect(() => {
        loadClient();

    }, [client]);


    const clientSearch = client.filter((client) => client.name.toLocaleUpperCase().includes(search.toLocaleUpperCase()));


    return (
        <div className='flex flex-col gap-4 '>
            <header className="flex justify-between items-center bg-white rounded p-4 shadow-sm">
                <h1 className='text-2xl font-semibold text-slate-800'>Produtos</h1>
                <button onClick={() => { setOpenModal(true), setFlag('0') }} className="flex items-center bg-indigo-800 text-white font-medium rounded py-2 px-4 hover:bg-indigo-700 duration-150">
                    Cadastrar
                    <span className='text-2xl'><Plus /></span>
                </button>
            </header>

            <div className='p-4 bg-white rounded'>
                <InputSearch setBuscaInput={setSearch} />
                <div className=''>
                    <table className='w-full '>
                        <thead>
                            <tr className='font-bold text-base border border-zinc-300 bg-neutral-200'>
                                <td className='p-2'>#</td>
                                <td className='p-2'>ID</td>
                                <td className='p-2'>Nome</td>
                                <td className='p-2'>CPF/CNPJ</td>
                                <td className='p-2'>CEP</td>
                                <td className='p-2'>Endereço</td>
                                <td className='p-2'>Cidade</td>
                                <td className='p-2'>Telefone</td>
                                <td className='p-2'>E-mail</td>
                                <td className='p-2'>Ações</td>
                            </tr>
                        </thead>
                        <tbody>
                            {clientSearch.map((client, index) => {
                                return (
                                    <tr key={index} className='hover:bg-zinc-200 border border-zinc-300'>
                                        <td className='p-2'><span className={`w-4 h-4 flex rounded-full ${client.status === "A" ? "bg-green-600" : "bg-red-600"}`}></span></td>
                                        <td className='p-2'>{client.id}</td>
                                        <td className='p-2'>{client.name}</td>
                                        <td className='p-2'>{client.cpf_cnpj}</td>
                                        <td className='p-2'>{client.cep}</td>
                                        <td className='p-2'>{client.address + ", Nº " + client.number + ", " + client.district}</td>
                                        <td className='p-2'>{client.city}</td>
                                        <td className='p-2'>{client.phone}</td>
                                        <td className='p-2'>{client.email}</td>
                                        <td className='p-2 flex items-center justify-center gap-2'>
                                            <button onClick={() => { setOpenModal(true), setFlag('1'), setIdClient(client.id.toString()) }} className='text-indigo-800'><Eye /></button>
                                            <button onClick={() => { setOpenModal(true), setFlag('2'), setIdClient(client.id.toString()) }} className='text-yellow-500'><Pen /></button>
                                            <button onClick={() => { if (window.confirm('Deseja remover este item?')) { deleteClient(client.id) } }} className='text-red-500'><Trash /></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {openModal ? <ModalClient flag={flag} idClient={idClient} onClose={() => setOpenModal(false)} /> : null}
        </div>

    );
}