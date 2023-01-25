import { Request, Response } from "express";
import { prisma } from '../../database/prismaClient';


export async function createClient(request: Request, response: Response) {
    const {
        name,
        cpf_cnpj,
        cep,
        address,
        number,
        complement,
        city,
        district,
        uf,
        phone,
        email,
        status,
    } = request.body;
    try {

        const emailExists = await prisma.client.findUnique({ where: { email } });
        const cpfExists = await prisma.client.findUnique({ where: { cpf_cnpj } });

        if (emailExists) return response.status(400).json({ message: "O e-mail informado já esta em uso!" });
        if (cpfExists) return response.status(400).json({ message: "O CPF/CPNJ informado já esta em uso!" });


        const client = await prisma.client.create({
            data: {
                name,
                cpf_cnpj,
                cep,
                address,
                number,
                complement,
                city,
                district,
                uf,
                phone,
                email,
                status,
            }
        });

        return response.status(201).json(client);

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: "Erro ao processar requisição" });
    }
}