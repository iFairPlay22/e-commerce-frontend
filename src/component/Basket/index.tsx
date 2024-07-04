import { IterableBasket } from "../../domain/Basket"
import { ProductId } from "../../domain/Product"

type BasketComponent = {
    basket: IterableBasket,
    canAddProductToBasket: (productId: ProductId) => boolean,
    addProductToBasket: (productId: ProductId) => void,
    canRemoveProductToBasket: (productId: ProductId) => boolean,
    removeProductToBasket: (productId: ProductId) => void,
    canClearBasket: () => boolean,
    clearBasket: () => void,
    canBuyBasket: () => boolean,
    buyBasket: () => void
}

export const BasketComponent = ({ 
    basket, 
    canAddProductToBasket, addProductToBasket, 
    canRemoveProductToBasket, removeProductToBasket, 
    canClearBasket, clearBasket, 
    canBuyBasket, buyBasket
}: BasketComponent) => (
    <div>
        {basket.length === 0 && (
            <p>Empty basket</p>
        )}
        {basket.length !== 0 && (
            <>
                {/* <p>Basket total price: { totalPrice }</p> */}
                <ul>
                    {basket.map(({ productId, quantity }) => (
                        <li key={productId}>
                            <div>
                                <p>Id: { productId }</p>
                                {/* <p>Product name: { product.name }</p> */}
                                <p>Quantity: { quantity }</p>
                                {/* <p>Product price: { product.price }</p> */}
                                {/* <p>Product total price: { quantity * product.price }</p> */}
                            </div>
                            {canAddProductToBasket(productId) && (
                                <button onClick={ () => addProductToBasket(productId) }>
                                    Add 1
                                </button>
                            )}
                            {canRemoveProductToBasket(productId) && (
                                <button onClick={ () => removeProductToBasket(productId) }>
                                    Remove 1
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
                {canBuyBasket() && (
                    <button onClick={ () => buyBasket() }>
                        Buy
                    </button>
                )}
                {canClearBasket() && (
                    <button onClick={ () => clearBasket() }>
                        Clear basket
                    </button>
                )}
            </>
        )}
    </div>
)