import { Request, Response } from "express";
import { prisma } from '../../database/prismaClient';

export async function findByOrder(request: Request, response: Response) {
    const { id } = request.params;

    try {

        const orders = await prisma.order.findMany({
            where: {
                id: Number(id)
            },
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