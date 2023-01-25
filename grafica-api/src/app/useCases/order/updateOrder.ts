import { Request, Response } from "express";
import { prisma } from '../../database/prismaClient';

interface iOrder {
    clientId: Number;
    discount?: Number;
    description?: string;
    paymentType?: string;
    paymentDate?: string;
    deliveryDate?: string;
    status: string;
    orderXProduct: [
        {
            id: Number;
            productId: Number;
            quantity: Number;
            price: Number;
            amount: Number;
        }
    ]
}


export async function updateOrder(request: Request, response: Response) {
    const { id } = request.params;
    const {
        discount,
        description,
        paymentType,
        paymentDate,
        deliveryDate,
        orderXProduct,
    }: iOrder = request.body;

    try {

        const productUpdate = orderXProduct;
        const productSaved = await prisma.orderXProduct.findMany({ where: { orderId: Number(id) } });

        const result = await prisma.$transaction(async (prismaClient) => {
            productSaved.map((product) => {
                productUpdate.map(async (p) => {
                    if (product.id == p.id) {
                        await prismaClient.orderXProduct.update({
                            where: {
                                id: Number(p.id)
                            },
                            data: {
                                productId: Number(p.productId),
                                quantity: Number(p.quantity)
                            }
                        })
                    }
                });
            });

            var productDelete = productSaved.filter(function (product) {
                return !productUpdate.some(function (p) {
                    return product.id == p.id;
                });
            });



            productDelete.map(async (p) => {
                await prismaClient.orderXProduct.delete({ where: { id: Number(p.id) } })
            });


            var productNotExists = productUpdate.filter(function (product) {
                return product.id == null;
            });


            productNotExists.map(async (p) => {
                await prismaClient.orderXProduct.create({
                    data: {
                        orderId: Number(id),
                        productId: Number(p.productId),
                        quantity: Number(p.quantity),
                        price: Number(p.price),
                        amount: Number(p.amount),
                    }
                });
            });

            const order = await prismaClient.order.update({
                where: {
                    id: Number(id)
                },
                data: {
                    discount: Number(discount),
                    description,
                    paymentType,
                    paymentDate,
                    deliveryDate,
                },
                include: {
                    client: true,
                    orderXProduct: true,
                }
            });

            return order;

        });


        return response.status(200).json(result);



    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: "Erro ao processar requisição" });

    }

}