import { Request, Response } from "express";
import { prisma } from '../../database/prismaClient';


export async function updateClient(request: Request, response: Response) {
    const { id } = request.params;

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
        const clientExists = await prisma.client.findUnique({ where: { id: Number(id) } });

        if (!clientExists) return response.status(200).json({ message: "Registro não encontrado!" });

        if ((email != clientExists.email) || (cpf_cnpj != clientExists.cpf_cnpj)) {

            const emailExists = await prisma.client.findUnique({ where: { email } });
            if (emailExists) return response.status(200).json({ message: "O e-mail informado já esta em uso!" });

            const cpfExists = await prisma.client.findUnique({ where: { cpf_cnpj } });
            if (cpfExists) return response.status(200).json({ message: "O CPF/CPNJ informado já esta em uso!" });
        }



        const client = await prisma.client.update({
            where: { id: Number(id) },
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


        return response.status(200).json(client);

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: "Erro ao processar requisição" });
    }
}