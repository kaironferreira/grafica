import { Request, Response } from "express";
import { prisma } from '../../database/prismaClient';


export async function findAllProduct(request: Request, response: Response) {

    try {
        const product = await prisma.product.findMany();
        return response.status(200).json(product);

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: "Erro ao processar requisição" });
    }
}