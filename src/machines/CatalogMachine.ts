import { assign, fromPromise, setup,  } from 'xstate';
import { Product, ProductId } from '../domain/Product';
import { addProductInBasket, getProducts, removeProductFromBasket } from '../api/Api';
import { UserId } from '../domain/User';

export const catalogMachine =  setup({
    types: {
        context: {} as {
          userId: UserId,
          productTarget?: ProductId,
          catalog?: Product[],
        },
        input: {} as {
          userId: string,
        },
        events: {} as 
          | { type: 'Add product to basket', productToAdd: ProductId }
          | { type: 'Reload' }
    },
    actors: {
      'Backend: Fetch catalog': fromPromise(() => {
        return getProducts()
      }),
      'Backend: Add product to user basket': fromPromise(({ input }: { input: { userId: UserId, productToAdd: ProductId } }) => {
        return addProductInBasket(input.userId, input.productToAdd)
      }),
      'Backend: Remove product from user basket': fromPromise(({ input }: { input: { userId: UserId, productToRemove: ProductId } }) => {
        return removeProductFromBasket(input.userId, input.productToRemove)
      })
    }
}).createMachine({
  id: 'catalog-machine',
  context: ({ input }) => ({ 
    userId: input.userId,
  }),  
  initial: 'Fetching catalog',
  states: {
    'Fetching catalog': {
      tags: [ 'Is whole page loading' ],
      invoke: {
        src: 'Backend: Fetch catalog',
        onDone: [
          {
            target: 'Idle',
            actions: assign(({ context, event }) => ({
              ...context,
              catalog: event.output
            }))
          }
        ],
      }
    },
    'Idle': {
      on: {
        'Add product to basket': {
          target: 'Adding product to basket',
          actions: assign(({ context, event }) => ({
            ...context,
            productTarget: event.productToAdd
          }))
        },
        'Reload': {
          target: 'Fetching catalog'
        }
      }
    },
    'Adding product to basket': {
      tags: [],
      invoke: {
        src: 'Backend: Add product to user basket',
        input: ({ context }) => ({ 
          userId: context.userId,
          productToAdd: context.productTarget!
        }),
        onDone: [
          {
            target: 'Idle',
          }
        ],
      }
    }
  }
});