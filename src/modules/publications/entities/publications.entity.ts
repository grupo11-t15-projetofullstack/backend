import { randomUUID } from "crypto"

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
    createdAt:Date
    description:string
    coverImg:string
}   
