import dayjs from 'dayjs';
import { Eye, Pen, Plus, Trash, X, Check } from 'phosphor-react'
import { useState, useEffect } from 'react';
import InputSearch from '../../components/inputSearch';
import { iOrder } from '../../interfaces/Order';
import { useApi } from '../../lib/axios';
import ModalOrder from './model';

export default function Order() {
    const [openModal, setOpenModal] = useState(false);
    const [orders, setOrders] = useState<iOrder[]>([]);

    const [idOrder, setIdOrder] = useState('');
    const [flag, setFlag] = useState('');
    const [search, setSearch] = useState('');
    const formatPrice = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' })

    async function loadOrder() {
        await useApi.get('/orders').then((response) => {
            setOrders(response.data);
        });
    }

    async function deleteOrder(id: Number) {
        await useApi.delete(`/orders/${id}`);
    }


    useEffect(() => {
        loadOrder();

    }, [orders]);


    const orderSerch = orders.filter((order) => order.id.toString().includes(search));


    return (
        <div className='flex flex-col gap-4'>
            <header className="flex justify-between items-center bg-white rounded p-4 shadow-sm">
                <h1 className='text-2xl font-semibold text-slate-800'>Pedidos</h1>
                <button onClick={() => { setOpenModal(true), setFlag('0') }} className="flex items-center bg-indigo-800 text-white font-medium rounded py-2 px-4 hover:bg-indigo-700 duration-150">
                    Cadastrar
                    <span className='text-2xl'><Plus /></span>
                </button>
            </header>

            <div className='p-4 bg-white rounded'>
                <InputSearch setBuscaInput={setSearch} />
                <div className='overflow-auto'>
                    <table className='w-full'>
                        <thead>
                            <tr className='font-bold text-base border border-zinc-300 bg-neutral-200'>
                                <td className='p-2'>#</td>
                                <td className='p-2'>ID</td>
                                <td className='p-2'>Cliente</td>
                                <td className='p-2'>Itens</td>
                                <td className='p-2'>Vlr. Total</td>
                                <td className='p-2'>Vlr. Desconto</td>
                                <td className='p-2'>Tipo Pgto.</td>
                                <td className='p-2'>Data Pgto.</td>
                                <td className='p-2'>Data Entrega</td>
                                <td className='p-2'>Emissão</td>
                                <td className='p-2'>Ações</td>
                            </tr>
                        </thead>
                        <tbody>
                            {orderSerch.map((order, index) => {
                                const createdAt = dayjs(order.createdAt).format('DD/MM/YYYY')
                                const deliveryDate = dayjs(order.createdAt).format('DD/MM/YYYY')
                                const paymentDate = dayjs(order.createdAt).format('DD/MM/YYYY')

                                const amount = order.orderXProduct.reduce((sum, product) => {
                                    return sum + product.amount;
                                }, 0)

                                const quantity = order.orderXProduct.reduce((sum, product) => {
                                    return sum + product.quantity;
                                }, 0)


                                return (
                                    <tr key={index} className='hover:bg-zinc-200 border border-zinc-300'>
                                        <td className='p-2'><span className={`w-4 h-4 flex rounded-full ${order.status == "0" ? "bg-green-600" : "bg-red-600"}`}></span></td>
                                        <td className='p-2 '>{order.id}</td>
                                        <td className='p-2'>{order.client.name}</td>
                                        <td className='p-2'>{quantity}</td>
                                        <td className='p-2'>{formatPrice.format(amount)}</td>
                                        <td className='p-2'>{formatPrice.format(order.discount!)}</td>
                                        <td className='p-2'>{order.paymentType == '0' ? 'À vista' : order.paymentType == '1' ? 'Dinheiro' : order.paymentType == '2' ? 'Cartão' : order.paymentType == '3' ? 'PIX' : ''}</td>
                                        <td className='p-2'>{paymentDate}</td>
                                        <td className='p-2'>{deliveryDate}</td>
                                        <td className='p-2'>{createdAt}</td>
                                        <td className='p-2 flex items-center justify-center gap-2'>
                                            {/* <button onClick={() => { setOpenModal(true), setFlag('1'), setIdOrder(order.id.toString()) }} className='text-indigo-800'><Eye /></button>
                                            <button onClick={() => { setOpenModal(true), setFlag('2'), setIdOrder(order.id.toString()) }} className='text-yellow-500'><Pen /></button> */}
                                            <button onClick={() => { if (window.confirm('Deseja remover este item?')) { deleteOrder(order.id) } }} className='text-red-500'><Trash /></button>
                                        </td>
                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {openModal ? <ModalOrder onClose={() => setOpenModal(false)} flag={flag} idOrder={idOrder} /> : null}
        </div>

    );
}