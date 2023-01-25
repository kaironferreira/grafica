import { Request, Response } from "express";
import { prisma } from '../../database/prismaClient';


export async function deleteOrder(request: Request, response: Response) {
    const { id } = request.params;

    try {
        await prisma.order.delete({
            where: {
                id: Number(id),
            }
        });

        return response.status(200).json({ messase: "Registro deletado com sucesso!" });

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: "Erro ao processar requisição" });
    }
}