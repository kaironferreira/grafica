import { iProduct } from "./Product";
import { iClient } from './Client';


export interface iOrder {
    id: number;
    clientId: number;
    discount?: number;
    description?: string;
    paymentType?: string;
    paymentDate?: Date;
    deliveryDate?: Date;
    status?: string;
    createdAt: Date;
    updatedAt: Date;
    client: iClient;
    orderXProduct: iOrderXProduct[];
}



export interface iOrderXProduct {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    amount: number;

}
