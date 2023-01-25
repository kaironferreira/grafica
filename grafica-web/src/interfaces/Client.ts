export interface iClient {
    id: number;
    name: string;
    cpf_cnpj: string;
    cep: string;
    address: string;
    number: string;
    complement: string;
    city: string;
    district: string;
    uf: string;
    phone: string;
    email: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}