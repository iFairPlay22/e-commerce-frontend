import { Product, ProductId } from "../../domain/Product"

type CatalogComponentProps = {
    catalog: Product[],
    canAddProductToBasket: (product: ProductId) => boolean,
    addProductToBasket: (product: ProductId) => void
}

export const CatalogComponent = ({ catalog, canAddProductToBasket, addProductToBasket }: CatalogComponentProps) => 
    <div>
        <p>Catalog</p>
        <ul>
            {catalog.map(product => (
                <li key={product.id}>
                    <div>
                        <p>Id: { product.id }</p>
                        <p>Name: { product.name }</p>
                        <p>Description: { product.description }</p>
                        <p>Quantity: { product.availableQuantity }</p>
                    </div>
                    {canAddProductToBasket(product.id) && (
                        <button onClick={ () => addProductToBasket(product.id) }>
                            Add to basket
                        </button>
                    )}
                </li>
            ))}
        </ul>
    </div>