import { prisma } from "../src/app/database/prismaClient"


async function main() {

    await prisma.client.deleteMany();
    await prisma.product.deleteMany();
    await prisma.order.deleteMany();


    const client1 = await prisma.client.create({
        data: {
            name: "Rayssa e Alana Construções Ltda",
            cpf_cnpj: "72428402000100",
            cep: "65058026",
            address: "Rua 12",
            number: "693",
            complement: "",
            city: "São Luís",
            district: "Cidade Operária",
            uf: "MA",
            phone: "9828433992",
            email: "vendas@rayssaealanaconstrucoesltda.com.br",
        }
    })


    const client2 = await prisma.client.create({
        data: {
            name: "Ian e Diego Adega Ltda",
            cpf_cnpj: "00093357000161",
            cep: "65605670",
            address: "Rua do Mangueirão",
            number: "369",
            complement: "",
            city: "Caxias",
            district: "Vila Alecrim",
            uf: "MA",
            phone: "9927843182",
            email: "representantes@ianediegoadegaltda.com.br",
        }
    })

    const client3 = await prisma.client.create({
        data: {
            name: "Murilo e Renato Informática Ltda",
            cpf_cnpj: "79431716000101",
            cep: "77813120",
            address: "Travessa 5",
            number: "226",
            complement: "",
            city: "Araguaína",
            district: "Jardim Santa Helena",
            uf: "TO",
            phone: "63987163205",
            email: "fabricacao@muriloerenatoinformaticaltda.com.br",
        }
    })




    const product1 = await prisma.product.create({
        data: {
            name: "Lápis Preto",
            description: "",
            brand: "Faber Castell",
            price: 1.50,
            stock: 100,
        }
    })

    const product2 = await prisma.product.create({
        data: {
            name: "Caneta Esferográfica Azul",
            description: "Ponta Média de 1.0mm",
            brand: "BIC",
            price: 2.50,
            stock: 50,
        }
    })

    await prisma.product.create({
        data: {
            name: "Caderno Espiral Capa Dura",
            description: "200x275mm, 80 Folhas, Negro",
            brand: "Tilibra",
            price: 9.90,
            stock: 30,
        }
    })

    await prisma.product.create({
        data: {
            name: "Adesivo Corte Especial",
            description: "9x5cm",
            brand: "",
            price: 95.50,
            stock: 999,
        }
    })

    const product3 = await prisma.product.create({
        data: {
            name: "Panfletos Flyers Personalizados",
            description: "14x10cm",
            brand: "",
            price: 12.50,
            stock: 999,
        }
    })


    const order1 = await prisma.order.create({
        data: {
            clientId: client1.id,
            orderXProduct: {
                create: [{
                    productId: product1.id,
                    price: Number(product1.price),
                    quantity: 5,
                    amount: (Number(product1.price) * 5)
                },

                {
                    productId: product2.id,
                    price: Number(product2.price),
                    quantity: 1,
                    amount: (Number(product2.price) * 1)
                },

                ]
            }
        },
        include: {
            orderXProduct: {
                include: {
                    product: true,
                },
            },
            client: true,
        }
    })


    const order2 = await prisma.order.create({
        data: {
            clientId: client1.id,
            orderXProduct: {
                create: [{
                    productId: product3.id,
                    price: Number(product3.price),
                    quantity: 5,
                    amount: (Number(product3.price) * 5)
                }
                ]
            }
        },
        include: {
            orderXProduct: {
                include: {
                    product: true,
                },
            },
            client: true,
        }
    })


    const order3 = await prisma.order.create({
        data: {
            clientId: client2.id,
            orderXProduct: {
                create: [{
                    productId: product3.id,
                    price: Number(product3.price),
                    quantity: 5,
                    amount: (Number(product3.price) * 5)
                }
                ]
            }
        },
        include: {
            orderXProduct: {
                include: {
                    product: true,
                },
            },
            client: true,
        }
    })


    console.log({ client1, client2, client3, product1, product2, product3, order1, order2, order3 })

}

main().then(async (sucess) => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
})

