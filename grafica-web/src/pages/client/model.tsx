import { Eye, Pen, Plus, Trash, X, Check, ShoppingCart } from 'phosphor-react'
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { iClient } from '../../interfaces/Client';
import { useApi } from '../../lib/axios';

interface modalProps {
    onClose: () => void;
    flag: string;
    idClient?: string;
}


interface UF {
    id: string;
    sigla: string;
    nome: string;
}

interface CITY {
    id: string;
    nome: string;
}


export default function ModalClient({ onClose, flag, idClient }: modalProps) {
    const [client, setClient] = useState<iClient>();
    const [status, setStatus] = useState('');
    const [uf, setUf] = useState<UF[]>([])
    const [city, setCity] = useState<CITY[]>([])
    const [ufSelected, setUfSelected] = useState('');
    const [citySelected, setCitySelected] = useState('');


    async function loadClient() {
        await useApi.get(`clients/${idClient}`).then((response) => {
            setClient(response.data);
            setStatus(response.data.status)
            setUfSelected(response.data.uf)
            setCitySelected(response.data.city)
        });
    }


    async function loadUF() {
        await useApi.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`).then((response) => {
            setUf(response.data)
        });
    }


    async function loadCity() {
        await useApi.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSelected}/municipios`).then((response) => {
            setCity(response.data)
        });
    }

    useEffect(() => {

        if (flag === '1' || flag === '2') {
            loadClient();
        }

        loadUF();

    }, []);


    useEffect(() => {
        loadCity();
    }, [ufSelected])


    async function createClient(event: FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        if (!data) {
            return;
        }

        try {
            await useApi.post('clients', {
                cpf_cpnj: data.cpf_cnpj,
                name: data.name,
                cep: data.cep,
                address: data.address,
                number: data.number,
                complement: data.complement,
                district: data.district,
                uf: data.uf,
                city: data.city,
                phone: data.phone,
                email: data.email,
                status: data.status,
            });

            onClose();

        } catch (error) {

        }
    }


    function handleStatusSelected(event: ChangeEvent<HTMLSelectElement>) {
        const status = event.target.value;
        setStatus(status);
    }


    function handleUfSelected(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        setUfSelected(uf);
    }


    function handleCitySelected(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;
        setCitySelected(city);
    }


    async function updateClient(event: FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);


        try {
            await useApi.put(`clients/${idClient}`, {
                cpf_cpnj: data.cpf_cnpj,
                name: data.name,
                cep: data.cep,
                address: data.address,
                number: data.number,
                complement: data.complement,
                district: data.district,
                uf: data.uf,
                city: data.city,
                phone: data.phone,
                email: data.email,
                status: data.status,
            })
            onClose();

        } catch (error) {

        }
    }


    return (
        <div className="bg-black/60 inset-0 fixed">
            <div className='fixed bg-gray-50 p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded w-3/4 shadow-black/50'>
                <div className='flex justify-between items-center'>
                    <span className='font-bold text-base'>Novo item</span>
                    <button onClick={() => onClose()}> <X size={24} className='text-red-600' /></button>
                </div>
                <div className='border mt-4 rounded-full'></div>

                <form onSubmit={flag === '0' ? createClient : flag === '2' ? updateClient : undefined} className='mt-4'>

                    <div className='flex flex-col gap-4'>
                        <div className='flex gap-4'>

                            <div className='w-1/4'>
                                <label htmlFor="cpf_cnpj" className='mb-2 block font-semibold'>CPF/CNPJ</label>
                                <input type={'text'} name='cpf_cnpj' defaultValue={client?.cpf_cpnj} required className='w-full border border-zinc-400 rounded bg-white p-2 outline-none focus:border-zinc-600 focus:shadow-md font-medium text-base ' />
                            </div>

                            <div className='w-3/4'>
                                <label htmlFor="name" className='mb-2 block font-semibold'>Nome</label>
                                <input type={'text'} name='name' defaultValue={client?.name} required className='w-full border border-zinc-400 rounded bg-white p-2 outline-none focus:border-zinc-600 focus:shadow-md font-medium text-base ' />
                            </div>


                        </div>
                        <div className='flex gap-4'>
                            <div className='w-1/4'>
                                <label htmlFor="cep" className='mb-2 block font-semibold'>CEP</label>
                                <input type={'text'} name='cep' defaultValue={client?.cep} className='w-full border border-zinc-400 rounded bg-white p-2 outline-none focus:border-zinc-600 focus:shadow-md font-medium text-base ' />
                            </div>

                            <div className='w-1/2'>
                                <label htmlFor="address" className='mb-2 block font-semibold'>Endereço</label>
                                <input type={'text'} name='address' defaultValue={client?.address} className='w-full border border-zinc-400 rounded bg-white p-2 outline-none focus:border-zinc-600 focus:shadow-md font-medium text-base ' />
                            </div>

                            <div className='w-1/4'>
                                <label htmlFor="number" className='mb-2 block font-semibold'>Nº</label>
                                <input type={'text'} name='number' defaultValue={client?.number} className='w-full border border-zinc-400 rounded bg-white p-2 outline-none focus:border-zinc-600 focus:shadow-md font-medium text-base ' />
                            </div>

                        </div>


                        <div className='flex gap-4'>
                            <div className='w-2/5'>
                                <label htmlFor="complement" className='mb-2 block font-semibold'>Complemento</label>
                                <input type={'text'} name='complement' defaultValue={client?.complement} className='w-full border border-zinc-400 rounded bg-white p-2 outline-none focus:border-zinc-600 focus:shadow-md font-medium text-base ' />
                            </div>

                            <div className='w-1/5'>
                                <label htmlFor="district" className='mb-2 block font-semibold'>Bairro</label>
                                <input type={'text'} name='district' defaultValue={client?.district} className='w-full border border-zinc-400 rounded bg-white p-2 outline-none focus:border-zinc-600 focus:shadow-md font-medium text-base ' />
                            </div>

                            <div className='w-1/5'>
                                <label htmlFor="uf" className='mb-2 block font-semibold'>UF</label>
                                <select name='uf' value={ufSelected} onChange={handleUfSelected} className='w-full border border-zinc-400 rounded bg-white p-2 outline-none focus:border-zinc-600 focus:shadow-md font-medium text-base '>
                                    {uf.map(uf => {
                                        return <option key={uf.id} value={uf.sigla}>{uf.sigla}</option>
                                    })}
                                </select>
                            </div>

                            <div className='w-1/5'>
                                <label htmlFor="city" className='mb-2 block font-semibold'>Cidade</label>
                                <select name='city' value={citySelected} onChange={handleCitySelected} className='w-full border border-zinc-400 rounded bg-white p-2 outline-none focus:border-zinc-600 focus:shadow-md font-medium text-base '>
                                    {city.map(city => {
                                        return <option key={city.id} value={city.nome}>{city.nome}</option>
                                    })}
                                </select>
                            </div>



                        </div>

                        <div className='flex gap-4'>
                            <div className='w-1/4'>
                                <label htmlFor="phone" className='mb-2 block font-semibold'>Telefone</label>
                                <input type={'text'} name='phone' defaultValue={client?.phone} className='w-full border border-zinc-400 rounded bg-white p-2 outline-none focus:border-zinc-600 focus:shadow-md font-medium text-base ' />
                            </div>

                            <div className='w-1/2'>
                                <label htmlFor="email" className='mb-2 block font-semibold'>Email</label>
                                <input type={'text'} name='email' defaultValue={client?.email} className='w-full border border-zinc-400 rounded bg-white p-2 outline-none focus:border-zinc-600 focus:shadow-md font-medium text-base ' />
                            </div>

                            <div className='w-1/4'>
                                <label htmlFor="status" className='mb-2 block font-semibold'>Status</label>
                                <select name='status' value={status} onChange={handleStatusSelected} disabled={flag == '1' ? true : false} className='w-full border border-zinc-400 rounded bg-white p-2 outline-none focus:border-zinc-600 focus:shadow-md font-medium text-base '>
                                    <option value={"A"}>Ativo</option>
                                    <option value={"I"}>Inátivo</option>
                                </select>
                            </div>
                        </div>


                    </div>


                    <div className='flex gap-2 mt-8'>
                        {flag !== '1' && <button type={'submit'} className='flex gap-2 items-center  bg-green-600 hover:bg-green-600/95 transition-all px-4 py-2 rounded text-white font-semibold '>
                            <Check size={24} /> Salvar</button>}
                        <button onClick={() => onClose()} className=' flex gap-2 items-center  bg-red-500 hover:bg-red-600 transition-all px-4 py-2 rounded text-white font-semibold '>
                            <X size={24} />
                            Cancelar</button>
                    </div>


                </form>
            </div>

        </div>
    );

}