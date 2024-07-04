import { Product, ProductId } from "../domain/Product";
import { User, UserId } from '../domain/User';

const API_URL = "http://localhost:8080" // TODO: use an ENV variable

export function getUser(userId: UserId): Promise<User> {
    console.log(`GET /api/user/${userId}`)
    return fetch(
        `${API_URL}/api/user/${userId}`, 
        { method: "GET", redirect: "follow" }
    )
        .then((response) => response.text())
        .then((json) => JSON.parse(json))
        .catch((error) => {
            console.error(error)
            throw error;
        });
}

export function addProductInBasket(userId: UserId, productId: ProductId): Promise<Response> {
    console.log(`POST /api/user/${userId}/basket/${productId}`)
    return fetch(
        `${API_URL}/api/user/${userId}/basket/${productId}`, 
        { method: "POST", redirect: "follow" }
    )
        .catch((error) => {
            console.error(error)
            throw error;
        });
}

export function removeProductFromBasket(userId: UserId, productId: ProductId): Promise<Response> {
    console.log(`DELETE /api/user/${userId}/basket/${productId}`)
    return fetch(
        `${API_URL}/api/user/${userId}/basket/${productId}`, 
        { method: "DELETE", redirect: "follow" }
    )
        .catch((error) => {
            console.error(error)
            throw error;
        });
}

export function clearBasket(userId: UserId): Promise<Response> {
    console.log(`DELETE /api/user/${userId}/basket`)

    return fetch(
        `${API_URL}/api/user/${userId}/basket`, 
        { method: "DELETE", redirect: "follow" }
    )
        .catch((error) => {
            console.error(error)
            throw error;
        });
}

export function buyBasket(userId: UserId): Promise<Response> {
    console.log(`POST /api/user/${userId}/basket/buy`)
    return fetch(
        `${API_URL}/api/user/${userId}/basket/buy`, 
        {  method: "POST", redirect: "follow" }
    )
        .catch((error) => {
            console.error(error)
            throw error;
        });
}

export function getProducts(): Promise<Product[]> {
    console.log(`POST /api/products`)
    return fetch(
        `${API_URL}/api/products`, 
        { method: "GET", redirect: "follow" }
    )
        .then((response) => response.text())
        .then((json) => JSON.parse(json))
        .catch((error) => {
            console.error(error)
            throw error;
        });
}