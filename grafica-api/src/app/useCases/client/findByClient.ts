import { Request, Response } from "express";
import { prisma } from '../../database/prismaClient';


export async function findByClient(request: Request, response: Response) {
    const { id } = request.params;

    try {
        const client = await prisma.client.findUnique({ where: { id: Number(id) } });

        return response.status(200).json(client);

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: "Erro ao processar requisição" });
    }
}