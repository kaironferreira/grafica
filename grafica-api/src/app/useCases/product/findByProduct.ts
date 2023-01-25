import { Request, Response } from "express";
import { prisma } from '../../database/prismaClient';


export async function findByProduct(request: Request, response: Response) {
    const { id } = request.params;

    try {
        const product = await prisma.product.findUnique({ where: { id: Number(id) } });

        return response.status(200).json(product);

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: "Erro ao processar requisição" });
    }
}