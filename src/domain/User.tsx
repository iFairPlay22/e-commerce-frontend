import { Basket } from "./Basket";
import { Command } from "./Command";

export type UserId = string

export class User {
    id: UserId;
    name: string;
    basket: Basket;
    commands: Command[];

    public constructor(id: UserId, name: string, basket: Basket, commands: Command[]) {
        this.id = id;
        this.name = name;
        this.basket = basket;
        this.commands = commands;
    }
}
