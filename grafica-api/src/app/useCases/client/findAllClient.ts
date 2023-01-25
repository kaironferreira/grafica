import { Request, Response } from "express";
import { prisma } from '../../database/prismaClient';


export async function findAllClient(request: Request, response: Response) {

    try {
        const client = await prisma.client.findMany();
        return response.status(200).json(client);

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: "Erro ao processar requisição" });
    }
}