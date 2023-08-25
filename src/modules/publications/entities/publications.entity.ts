import { randomUUID } from "crypto"
import { Comments, Images, User } from '@prisma/client';

export class Publication {
    readonly id: number
    model:string
    make:string
    year:number
    color:string
    fuel:string
    distance:number
    isGoodSale: Boolean
    price:number
    userId:number
    readonly createdAt: Date | string;
    description:string
    coverImg:string
    // images: Images[];
}   
