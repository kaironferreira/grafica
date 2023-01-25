import { Request, Response } from "express";
import { prisma } from '../../database/prismaClient';


export async function createProduct(request: Request, response: Response) {
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

        const product = await prisma.product.create({
            data: {
                name,
                description,
                brand,
                // image,
                price: Number(price),
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