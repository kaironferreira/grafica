import { Eye, Pen, Plus, Trash, X, Check } from 'phosphor-react'
import { iProduct } from '../../interfaces/Product';
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useApi } from '../../lib/axios';

interface modalProps {
    onClose: () => void;
    flag: string;
    idProduct?: string;
}


export default function ModalProduct({ onClose, flag, idProduct }: modalProps) {
    const [product, setProduct] = useState<iProduct>();
    const [status, setStatus] = useState('');

    async function loadProduct() {
        await useApi.get(`products/${idProduct}`).then((response) => {
            setProduct(response.data);
            setStatus(response.data.status)

        });
    }

    useEffect(() => {

        if (flag === '1' || flag === '2') {
            loadProduct();
        }

    }, []);


    async function createProduct(event: FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        if (!data) {
            return;
        }

        try {
            await useApi.post('products', {
                name: data.name,
                description: data.description,
                brand: data.brand,
                status: data.status,
                price: Number(data.price),
                stock: Number(data.stock),
            });
            onClose();
        } catch (error) {

        }
    }


    function handleStatusSelected(event: ChangeEvent<HTMLSelectElement>) {
        const status = event.target.value;
        setStatus(status);
    }


    async function updateProduct(event: FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);


        try {
            await useApi.put(`products/${idProduct}`, {
                name: data.name,
                description: data.description,
                brand: data.brand,
                status: data.status,
                price: Number(data.price),
                stock: Number(data.stock),
            });
            onClose();
        } catch (error) {

        }
    }



    return (
        <div className="bg-black/60 inset-0 fixed">

            <div className='fixed bg-neutral-100 p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded w-3/6 shadow-black/50'>
                <div className='flex justify-between items-center'>
                    <span className='font-bold text-base'>Novo item</span>
                    <button onClick={() => onClose()}> <X size={24} className='text-red-600' /></button>
                </div>
                <div className='border mt-4 rounded-full'></div>

                <form onSubmit={flag === '0' ? createProduct : flag === '2' ? updateProduct : undefined} className='mt-4'>

                    <div className='flex flex-col gap-4'>
                        <div className='w-ful'>
                            <label htmlFor="name" className='mb-2 block font-semibold'>Nome</label>
                            <input type={'text'} name='name' required defaultValue={product?.name} disabled={flag == '1' ? true : false} className='w-full border border-zinc-400 rounded bg-white p-2 outline-none focus:border-zinc-600 focus:shadow-md font-medium text-base ' />
                        </div>


                        <div className='w-ful'>
                            <label htmlFor="description" className='mb-2 block font-semibold'>Descrição</label>
                            <input type={'text'} name='description' defaultValue={product?.description} disabled={flag == '1' ? true : false} className='w-full border border-zinc-400 rounded bg-white p-2 outline-none focus:border-zinc-600 focus:shadow-md font-medium text-base ' />
                        </div>

                        <div className='flex gap-4'>
                            <div className='w-1/2'>
                                <label htmlFor="price" className='mb-2 block font-semibold'>Preço</label>
                                <div className="relative mb-4">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <strong>R$</strong>
                                    </div>
                                    <input type={'number'} name='price' defaultValue={product?.price} disabled={flag == '1' ? true : false} className='pl-10 w-full border border-zinc-400 rounded bg-white p-2 outline-none focus:border-zinc-600 focus:shadow-md font-medium text-base ' />
                                </div>

                            </div>

                            <div className='w-1/2'>
                                <label htmlFor="stock" className='mb-2 block font-semibold'>Estoque</label>
                                <input type={'number'} name='stock' defaultValue={product?.stock} disabled={flag == '1' ? true : false} className='w-full border border-zinc-400 rounded bg-white p-2 outline-none focus:border-zinc-600 focus:shadow-md font-medium text-base ' />
                            </div>
                        </div>


                        <div className='flex gap-4'>
                            <div className='w-1/2'>
                                <label htmlFor="brand" className='mb-2 block font-semibold'>Marca</label>
                                <input type={'text'} name='brand' defaultValue={product?.brand} disabled={flag == '1' ? true : false} className='w-full border border-zinc-400 rounded bg-white p-2 outline-none focus:border-zinc-600 focus:shadow-md font-medium text-base ' />
                            </div>


                            <div className='w-1/2'>

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