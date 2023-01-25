import { Request, Response } from "express";
import { prisma } from '../../database/prismaClient';

export async function findAllOrder(request: Request, response: Response) {
    try {
        const orders = await prisma.order.findMany({
            include: {
                client: true,
                orderXProduct: {
                    include: {
                        product: true,
                    },
                },

            },
        });

        return response.status(200).json(orders);


    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: "Erro ao processar requisição" });
    }

}