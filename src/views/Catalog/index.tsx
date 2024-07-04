import { createActor } from "xstate"
import { CatalogComponent } from "../../component/Catalog"
import { catalogMachine } from "../../machines/CatalogMachine"
import { useSelector } from "@xstate/react"
import { useEffect } from "react"

// TODO: use dynamic userId
const catalogActor = createActor(catalogMachine, { input: { userId: '668559ff530d7301332f325f' } })

export const CatalogView = () => {
    
    useEffect(() => { catalogActor.start() }, [])
    const { actor, context, isWholePageLoading } = useSelector(catalogActor, actor => ({
        actor: actor,
        context: actor.context,
        isWholePageLoading: actor.hasTag('Is whole page loading'),
    }))
    
    return (
        <>
            {isWholePageLoading && (
                <p>Loading...</p>
            )}
            {!isWholePageLoading && context.catalog && (
                <CatalogComponent 
                    catalog={context.catalog}

                    canAddProductToBasket={ productId => actor.can({ type: 'Add product to basket', productToAdd: productId })}
                    addProductToBasket={ productId => catalogActor.send({ type: 'Add product to basket', productToAdd: productId })}
                />
            )}
            {actor.can({ type: 'Reload' }) && (
                <button onClick={ () => catalogActor.send({ type: 'Reload' }) }>
                    Reload
                </button>
            )}
        </>
    )
}