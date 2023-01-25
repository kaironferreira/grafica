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
            productId: Number;
            quantity: Number;
            price: Number;
            amount: Number;
        }
    ]
}

export async function createOrder(request: Request, response: Response) {

    const { clientId,
        discount,
        description,
        paymentType,
        paymentDate,
        deliveryDate,
        orderXProduct,
    }: iOrder = request.body;

    try {

        const order = await prisma.order.create({
            data: {
                clientId: Number(clientId),
                description,
                paymentType,
                paymentDate,
                deliveryDate,
                discount: Number(discount),
                orderXProduct: {
                    create: orderXProduct.map(product => ({
                        productId: Number(product.productId),
                        quantity: Number(product.quantity),
                        price: Number(product.price),
                        amount: Number(product.amount),
                    }))
                },
            },
            include: {
                orderXProduct: {
                    include: {
                        product: true,
                    },
                },
                client: true,
            }
        });

        return response.status(201).json({ order });


    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: "Erro ao processar requisição" });

    }

}