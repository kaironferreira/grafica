import { Request, Response } from "express";
import { prisma } from '../../database/prismaClient';


export async function updateProduct(request: Request, response: Response) {
    const { id } = request.params;
    const {
        name,
        description,
        brand,
        // image,
        price,
        stock,
        status,
    } = request.body;

    try {

        const product = await prisma.product.update({
            where: { id: Number(id) },
            data: {
                name,
                description,
                brand,
                // image,
                price: parseFloat(price),
                stock: Number(stock),
                status,
            }
        });

        return response.status(201).json(product);

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: "Erro ao processar requisição" });
    }
}