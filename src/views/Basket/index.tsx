import { useEffect } from "react"
import { createActor } from "xstate"
import { basketMachine } from "../../machines/BasketMachine"
import { useSelector } from "@xstate/react"
import { BasketComponent } from "../../component/Basket"

// TODO: use dynamic userId
const basketActor = createActor(basketMachine, { input: { userId: '668559ff530d7301332f325f' } })

export const BasketView = () => {
    
    useEffect(() => { basketActor.start() }, [])

    const { actor, context, isLoading } = useSelector(basketActor, actor => ({
        actor: actor,
        context: actor.context,
        isLoading: actor.hasTag('Is whole page loading'),
    }))
    
    return (
        <>
            {isLoading && (
                <p>Loading...</p>
            )}
            {!isLoading && context.basket && (
                <BasketComponent
                    basket={context.basket}

                    canAddProductToBasket={ productId => actor.can({ type: 'Add product', productToAdd: productId })}
                    addProductToBasket={ productId => basketActor.send({ type: 'Add product', productToAdd: productId })}

                    canRemoveProductToBasket={ productId => actor.can({ type: 'Remove product', productToRemove: productId})}
                    removeProductToBasket={ productId => basketActor.send({ type: 'Remove product', productToRemove: productId })}

                    canClearBasket={() => actor.can({ type: 'Clear basket' })}
                    clearBasket={() => basketActor.send({ type: 'Clear basket' })}

                    canBuyBasket={() => actor.can({ type: 'Buy basket' })}
                    buyBasket={() => basketActor.send({ type: 'Buy basket' })}
                />
            )}
            {actor.can({ type: 'Reload' }) && (
                <button onClick={ () => basketActor.send({ type: 'Reload' }) }>
                    Reload
                </button>
            )}
        </>
    )
}