
import { useState, FormEvent, useEffect, ChangeEvent } from 'react';
import { useApi } from '../../lib/axios';
import { iClient } from '../../interfaces/Client';
import { Eye, Pen, Plus, Trash, X, Check, ShoppingCart } from 'phosphor-react'
import { iProduct } from '../../interfaces/Product';

interface modalProps {
    onClose: () => void;
    flag: string;
    idOrder?: string;
}

interface OrdemItems {
    productId: string;
    name: string;
    price: string;
    quantity: string;
    amount: string;
}


export default function ModalOrder({ onClose }: modalProps) {
    const [clients, setClients] = useState<iClient[]>([]);
    const [products, setProducts] = useState<iProduct[]>([]);

    const [idClientSelected, setIdClientSelected] = useState('');
    const [idProductSelected, setIdProductSelected] = useState('');
    const [typePaymentSelected, settypePaymentSelected] = useState('');

    const [client, setClient] = useState<iClient>();
    const [product, setProduct] = useState<iProduct>()

    const [nameProduct, setNameProduct] = useState('')
    const [priceProduct, setPriceProduct] = useState('')
    const [quantityProduct, setquantityProduct] = useState('')
    const [amountProduct, setAmountProduct] = useState('')

    const [ordemItems, setOrdemItems] = useState<OrdemItems[]>([])

    const amountProducts = ordemItems.reduce((sum, product) => {
        return sum + Number(product.amount);
    }, 0)


    const formatPrice = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' })


    async function loadClientAndProduct() {
        await useApi.get('/clients').then((response) => {
            setClients(response.data);
        });

        await useApi.get('/products').then((response) => {
            setProducts(response.data);
        });
    }

    async function loadByClient() {
        await useApi.get(`clients/${idClientSelected}`).then((response) => {
            setClient(response.data);
        });
    }


    useEffect(() => {
        loadByClient();
    }, [idClientSelected])



    useEffect(() => {
        loadClientAndProduct();
    }, [])




    async function handleCreateOrder(event: FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        try {
            await useApi.post('orders', {
                clientId: data.clientId,
                description: '',
                discount: '',
                paymentType: data.paymentType,
                paymentDate: data.paymentDate,
                deliveryDate: data.deliveryDate,
                orderXProduct: ordemItems,
            });

            onClose();

        } catch (error) {

        }


    }


    function handleClientSelected(event: ChangeEvent<HTMLSelectElement>) {
        const idClient = event.target.value;
        setIdClientSelected(idClient)
    }

    function handleTypePAymentSelected(event: ChangeEvent<HTMLSelectElement>) {
        const typePayment = event.target.value;
        settypePaymentSelected(typePayment)
    }

    function handleIdProductSelected(event: ChangeEvent<HTMLSelectElement>) {
        const idProduct = event.target.value;

        setIdProductSelected(idProduct)

        products.map((p) => {
            if (p.id === Number(idProduct)) {
                setPriceProduct(p.price.toString())
                setNameProduct(p.name)
            }
        })
    }


    function handleQuantityProduct(event: ChangeEvent<HTMLInputElement>) {
        const quantity = event.target.value;
        setquantityProduct(quantity)
        setAmountProduct((Number(priceProduct) * Number(quantity)).toString())
    }


    function addProductList() {

        const newProduct = {
            productId: idProductSelected,
            name: nameProduct,
            price: priceProduct,
            amount: amountProduct,
            quantity: quantityProduct,
        }

        const newProducts = [...ordemItems, newProduct]
        setOrdemItems(newProducts)
        setIdProductSelected('')
        setAmountProduct('')
        setquantityProduct('')
        setPriceProduct('')
        setNameProduct('')
    }


    function deleteProductList(productID: string) {
        const products = ordemItems.filter(p => p.productId !== productID)
        setOrdemItems(products)

    }

    return (
        <div className="bg-black/60 inset-0 fixed">
            <div className='fixed bg-gray-50 p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded w-4/5 max-h-screen shadow-black/50 overflow-auto'>
                <div className='flex justify-between items-center'>
                    <span className='font-bold text-base'>Pedido de Venda</span>
                    <button onClick={() => onClose()}> <X size={24} className='text-red-600' /></button>
                </div>

                <form onSubmit={handleCreateOrder} className='mt-4'>

                    <div className='flex flex-col gap-4 mt-2'>
                        <fieldset className='border-2 p-4 flex flex-col gap-4'>
                            <legend className='font-bold'>Dados Gerais</legend>
                            <div className='flex gap-4'>
                                <div className='w-3/5'>
                                    <label htmlFor="description" className='mb-2 block font-semibold'>Cliente</label>
                                    <select name='clientId' value={idClientSelected} onChange={handleClientSelected} required className='w-full border border-zinc-400 rounded bg-white p-2 outline-none focus:border-zinc-600 focus:shadow-md font-medium text-base '>
                                        <option hidden>Selecione o Cliente</option>
                                        {clients.map((client, index) => {
                                            return (
                                                <option key={index} value={client.id}>{client.id + " - " + client.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>

                                <div className='w-2/5'>
                                    <label htmlFor="cpf_cnpj" className='mb-2 block font-semibold'>CPF/CNPJ</label>
                                    <input type={'text'} name='cpf_cpnj' defaultValue={client?.cpf_cnpj} className='w-full border border-zinc-400 rounded bg-white p-2 outline-none focus:border-zinc-600 focus:shadow-md font-medium text-base ' />
                                </div>
                            </div>

                            <div className='flex gap-4'>
                                <div className='w-1/2'>
                                    <label htmlFor="paymentType" className='mb-2 block font-semibold'> Tipo Pgto. </label>
                                    <select name='paymentType' value={typePaymentSelected} onChange={handleTypePAymentSelected} className='w-full border border-zinc-400 rounded bg-white p-2 outline-none focus:border-zinc-600 focus:shadow-md font-medium text-base '>
                                        <option value={"0"}>Dinheiro</option>
                                        <option value={"1"}>Cartão</option>
                                        <option value={"2"}>Avista</option>
                                        <option value={"3"}>PIX</option>
                                    </select>
                                </div>

                                <div className='w-1/2'>
                                    <label htmlFor="paymentDate" className='mb-2 block font-semibold'>Data Pgto.</label>
                                    <input type={'date'} name='paymentDate' className='w-full border border-zinc-400 rounded bg-white p-2 outline-none focus:border-zinc-600 focus:shadow-md font-medium text-base ' />
                                </div>

                                <div className='w-1/2'>
                                    <label htmlFor="deliveryDate" className='mb-2 block font-semibold'>Data Entrega</label>
                                    <input type={'date'} name='deliveryDate' className='w-full border border-zinc-400 rounded bg-white p-2 outline-none focus:border-zinc-600 focus:shadow-md font-medium text-base ' />
                                </div>
                            </div>

                        </fieldset>

                        <fieldset className='border-2 p-4'>
                            <legend className='font-bold'>Itens do Pedido </legend>

                            <div className='flex gap-2 items-center'>
                                <select value={idProductSelected} onChange={handleIdProductSelected} className='w-2/5 border border-zinc-400 rounded bg-white outline-none p-2'>
                                    <option hidden>Selecine um Produto</option>
                                    {products.map((product, index) => {
                                        return (
                                            <option key={index} value={product.id}>{product.name}</option>
                                        )
                                    })}
                                </select>

                                <input value={priceProduct} readOnly className='w-1/5 border border-zinc-400 rounded bg-white outline-none p-2' />
                                <input value={quantityProduct} onChange={handleQuantityProduct} className='w-1/5 border border-zinc-400 rounded bg-white outline-none p-2' />
                                <input value={amountProduct} readOnly className='w-1/5 border border-zinc-400 rounded bg-white outline-none p-2' />
                                <button type={'button'} onClick={addProductList} className='text-white bg-blue-700 w-10 h-10 rounded cursor-pointer hover:bg-blue-700/80 flex justify-center items-center'>
                                    <ShoppingCart size={24} /></button>
                            </div>


                            <div className='max-h-36 w-full overflow-auto mt-4'>
                                <table className='w-full border border-zinc-300 bg-zinc-100'>
                                    <thead>
                                        <tr className='text-sm font-semibold border-b border-zinc-300 bg-zinc-200'>
                                            <td className='p-2'>ID</td>
                                            <td className='p-2'>Descrição</td>
                                            <td className='p-2'>Valor</td>
                                            <td className='p-2'>Qtd</td>
                                            <td className='p-2'>Total</td>
                                            <td className='p-2'></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ordemItems.map((product, index) => {
                                            return (
                                                <tr key={index} className='hover:bg-zinc-200  text-sm'>
                                                    <td className='p-2'>{product.productId}</td>
                                                    <td className='p-2'>{product.name}</td>
                                                    <td className='p-2'>{formatPrice.format(Number(product.price))}</td>
                                                    <td className='p-2'>{product.quantity}</td>
                                                    <td className='p-2'>{formatPrice.format(Number(product.amount))}</td>
                                                    <td className='p-2 flex justify-center gap-2'>
                                                        <button onClick={() => deleteProductList(product.productId)} ><Trash size={18} className='text-red-600' /></button>

                                                    </td>
                                                </tr>
                                            )

                                        })}
                                    </tbody>
                                </table>


                            </div>

                        </fieldset>
                    </div>


                    <fieldset className='border-2 p-4'>
                        <legend className='font-bold'>Totalizadores</legend>
                        <div className='flex w-full justify-between'>
                            <div className='flex gap-24'>
                                <div className='flex gap-2'>
                                    <span> Qtd. Itens:</span>
                                    <strong>{ordemItems.length}</strong>
                                </div>

                                <div className='flex gap-2'>
                                    <span> Desconto:</span>
                                    <strong>R$ 0,00</strong>
                                </div>
                            </div>

                            <div className='flex gap-2'>
                                <span> Vlr. Total:</span>
                                <strong>R$ {amountProducts}</strong>
                            </div>
                        </div>
                    </fieldset>


                    <div className='flex gap-2  justify-end'>
                        <button onClick={() => onClose()} className=' flex gap-2 items-center  bg-red-500 hover:bg-red-600 transition-all p-2 rounded text-white font-semibold '>
                            <X size={24} />
                            Cancelar</button>

                        <button type={'submit'} className='flex gap-2 items-center  bg-green-600 hover:bg-green-600/95 transition-all p-2 rounded text-white font-semibold '>
                            <Check size={24} /> Salvar</button>

                    </div>


                </form>
            </div>

        </div >
    );

}