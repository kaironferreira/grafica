import dayjs from 'dayjs';
import { Eye, Pen, Plus, Trash } from 'phosphor-react'
import { useState, useEffect } from 'react';
import InputSearch from '../../components/inputSearch';
import { iProduct } from '../../interfaces/Product';
import { useApi } from '../../lib/axios';
import ModalProduct from './model';

export default function Product() {
    const [openModal, setOpenModal] = useState(false);
    const [products, setProducts] = useState<iProduct[]>([]);
    const [idProduct, setIdProduct] = useState('');
    const [flag, setFlag] = useState('');
    const [search, setSearch] = useState('');
    const formatPrice = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' })

    async function loadProduct() {
        await useApi.get('/products').then((response) => {
            setProducts(response.data);
        });
    }

    async function deleteProduct(id: Number) {
        await useApi.delete(`/products/${id}`);
    }


    useEffect(() => {
        loadProduct();

    }, [products]);


    const productSearch = products.filter((product) => product.name.toLocaleUpperCase().includes(search.toLocaleUpperCase()));


    return (
        <div className='flex flex-col gap-4'>
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
                    <table className='w-full'>
                        <thead>
                            <tr className='font-bold text-base border border-zinc-300 bg-neutral-200'>
                                <td className='p-2'>#</td>
                                <td className='p-2'>ID</td>
                                <td className='p-2'>Nome</td>
                                <td className='p-2'>Descrição</td>
                                <td className='p-2'>Marcar</td>
                                <td className='p-2'>Preço</td>
                                <td className='p-2'>Estoque</td>
                                <td className='p-2'>Modificação</td>
                                <td className='p-2'>Ações</td>
                            </tr>
                        </thead>

                        <tbody>
                            {productSearch.map((product, index) => {
                                const formatDate = dayjs(product.updatedAt).format('DD/MM/YYYY')

                                return (< tr key={index} className='hover:bg-zinc-200 border border-zinc-300' >
                                    <td className='p-2'><span className={`w-4 h-4 flex rounded-full ${product.status === "A" ? "bg-green-600" : "bg-red-600"}`}></span></td>
                                    <td className='p-2'>{product.id}</td>
                                    <td className='p-2'>{product.name}</td>
                                    <td className='p-2'>{product.description}</td>
                                    <td className='p-2'>{product.brand}</td>
                                    <td className='p-2'>{formatPrice.format(product.price)}</td>
                                    <td className='p-2'>{product.stock}</td>
                                    <td className='p-2'>{formatDate.toString()}</td>
                                    <td className='p-2 flex items-center justify-center gap-2'>
                                        <button onClick={() => { setOpenModal(true), setFlag('1'), setIdProduct(product.id.toString()) }} className='text-indigo-800'><Eye /></button>
                                        <button onClick={() => { setOpenModal(true), setFlag('2'), setIdProduct(product.id.toString()) }} className='text-yellow-500'><Pen /></button>
                                        <button onClick={() => { if (window.confirm('Deseja remover este item?')) { deleteProduct(product.id) } }} className='text-red-500'><Trash /></button>
                                    </td>
                                </tr>)
                            })}
                        </tbody>

                    </table>
                </div>
            </div>

            {openModal ? <ModalProduct flag={flag} idProduct={idProduct} onClose={() => setOpenModal(false)} /> : null}

        </div >

    );
}