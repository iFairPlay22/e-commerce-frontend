import { assign, fromPromise, setup,  } from 'xstate';
import { ProductId } from '../domain/Product';
import { addProductInBasket, buyBasket, clearBasket, getUser, removeProductFromBasket } from '../api/Api';
import { IterableBasket, basketToIterable } from '../domain/Basket';
import { UserId } from '../domain/User';

export const basketMachine =  setup({
    types: {
        context: {} as {
          userId: UserId,
          productTarget?: ProductId,
          basket?: IterableBasket
        },
        input: {} as {
          userId: string,
        },
        events: {} as 
          | { type: 'Add product', productToAdd: ProductId }
          | { type: 'Remove product', productToRemove: ProductId }
          | { type: 'Clear basket' }
          | { type: 'Buy basket' }
          | { type: 'Reload' }
    },
    actors: {
      'Backend: Fetch user data': fromPromise(({ input }: { input: { userId: string } }) => {
          return getUser(input.userId);
      }),
      'Backend: Add product to user basket': fromPromise(({ input }: { input: { userId: string, productId: string } }) => {
          return addProductInBasket(input.userId, input.productId);
      }),
      'Backend: Remove product from user basket': fromPromise(({ input }: { input: { userId: string, productId: string } }) => {
          return removeProductFromBasket(input.userId, input.productId);
      }),
      'Backend: Clear user basket': fromPromise(({ input }: { input: { userId: string } }) => {
          return clearBasket(input.userId);
      }),
      'Backend: Buy basket': fromPromise(({ input }: { input: { userId: string } }) => {
        return buyBasket(input.userId);
      })
    }
}).createMachine({
  id: 'basket-machine',
  context: ({ input }) => ({ 
    userId: input.userId,
  }),  
  initial: 'Fetching basket',
  states: {
    'Fetching basket': {
        tags: [ 'Is whole page loading' ],
        invoke: {
          src: 'Backend: Fetch user data',
          input: ({ context }) => ({ 
            userId: context.userId
          }),
          onDone: [
            {
              target: 'Idle',
              actions: assign(({ context, event }) => ({
                ...context,
                basket: basketToIterable(event.output.basket)
              }))
            }
          ],
        },
    },
    'Idle': {
      on: {
        'Add product': {
          guard: ({ context }) => !!context.basket,
          target: 'Adding product to basket',
          actions: assign(({ context, event }) => ({
            ...context,
            productTarget: event.productToAdd
          }))
        },
        'Remove product': {
          guard: ({ context }) => !!context.basket && context.basket.length > 0,
          target: 'Removing product from basket',
          actions: assign(({ context, event }) => ({
            ...context,
            productTarget: event.productToRemove
          }))
        },
        'Clear basket': {
          guard: ({ context }) => !!context.basket && context.basket.length > 0,
          target: 'Clearing basket'
        },
        'Buy basket': {
          guard: ({ context }) => !!context.basket && context.basket.length > 0,
          target: 'Buying basket'
        },
        'Reload': {
          target: 'Fetching basket'
        }
      }
    },
    'Adding product to basket': {
        tags: [],
        invoke: {
          src: 'Backend: Add product to user basket',
          input: ({ context }) => ({ 
            userId: context.userId,
            productId: context.productTarget!
          }),
          onDone: [
            {
              target: 'Fetching basket'
            }
          ],
        },
    },
    'Removing product from basket': {
        tags: [],
        invoke: {
          src: 'Backend: Remove product from user basket',
          input: ({ context }) => ({ 
            userId: context.userId,
            productId: context.productTarget!
          }),
          onDone: [
            {
              target: 'Fetching basket'
            }
          ],
        },
    },
    'Clearing basket': {
        tags: [],
        invoke: {
          src: 'Backend: Clear user basket',
          input: ({ context }) => ({ 
            userId: context.userId,
          }),
          onDone: [
            {
              target: 'Fetching basket'
            }
          ],
        },
    },
    'Buying basket': {
        tags: [],
        invoke: {
          src: 'Backend: Buy basket',
          input: ({ context }) => ({ 
            userId: context.userId,
          }),
          onDone: [
            {
              target: 'Fetching basket'
            }
          ],
        },
    },
  }
});