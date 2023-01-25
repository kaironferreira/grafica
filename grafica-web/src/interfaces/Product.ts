export interface iProduct {
    id: number;
    name: string;
    description: string;
    brand: string;
    image?: any;
    status: string;
    price: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}