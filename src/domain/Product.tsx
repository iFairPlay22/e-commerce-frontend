export type ProductId = string

export class Product {
    id: ProductId;
    name: string;
    description: string;
    availableQuantity: number;
    price: number;

    public constructor(id: ProductId, name: string, description: string, availableQuantity: number, price: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.availableQuantity = availableQuantity;
        this.price = price;
    }
}