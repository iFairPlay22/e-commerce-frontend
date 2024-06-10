import { assign, fromPromise, setup,  } from 'xstate';

type FetchQuery<T> = () => Promise<FetchResponse<T>>
type FetchResponse<T> = { statusCode: number; content: T; }

export default function fetchStateMachine<T>() {
  return setup({
    types: {
      context: {} as {
        fn: FetchQuery<T>,
        lastResponse?: FetchResponse<T>,
        triesNb: number
      },
      input: {} as {
        fn: FetchQuery<T>
      },
      events: {} as 
        | { type: 'Fetch' }
        | { type: 'Retry' }
        | { type: 'Restart' }
    },
    actors: {
      'Fetch': fromPromise(({ input }: { input: { fn: FetchQuery<T>} }) => input.fn())
    }
  }).createMachine({
    id: 'fetch',
    initial: 'Idle',
    context: ({ input }) => ({ 
      fn: input.fn, 
      triesNb: 0
    }),
    states: {
      'Idle': {
        on: {
          'Fetch': {
            target: 'Loading'
          }
        }
      },
      'Loading': {
        invoke: {
          src: 'Fetch',
          input: ({ context }) => ({ fn: context.fn }),
          onDone: [
            {
              target: 'Success',
              guard: ({ event }) => event.output.statusCode === 200,
              actions: assign(({ event }) => ({
                lastResponse: event.output,
              }))
            },
            {
              target: 'Failure'
            }
          ],
          onError: {
            target: 'Failure'
          }
        },
        exit: assign(({ context }) => ({
          triesNb: context.triesNb + 1
        }))
      },
      'Success': {
        on: {
          'Restart': {
            target: 'Idle'
          }
        },
        exit: assign({
          lastResponse: undefined,
          triesNb: 0
        })
      },
      'Failure': {
        on: {
          'Retry': { 
            target: 'Loading'
          }
        }
      }
    }
  })
}