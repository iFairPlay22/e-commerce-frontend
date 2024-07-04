import { Basket } from "./Basket";
export type CommandId = string

export class Command {
    id: CommandId;
    ts: string;
    basket: Basket;
    totalPrice: number;

    public constructor(id: CommandId, ts: string, basket: Basket, totalPrice: number) {
        this.id = id;
        this.ts = ts;
        this.basket = basket;
        this.totalPrice = totalPrice;
    }
}