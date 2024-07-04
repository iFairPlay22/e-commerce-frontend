import { ProductId } from "./Product";

export type Quantity = number

export type Basket = Record<ProductId, Quantity>

export type IterableBasket = { productId: ProductId, quantity: Quantity }[]

export function basketToIterable(basket: Basket): IterableBasket  {
    return Object.entries(basket).map(([ productId, quantity ]) => ({ productId, quantity }));
} 