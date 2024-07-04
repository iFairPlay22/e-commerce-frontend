import { assign, fromPromise, setup,  } from 'xstate';
import { Command } from '../domain/Command';
import { UserId } from '../domain/User';
import { getUser } from '../api/Api';

export const pastCommandsMachine =  setup({
    types: {
        context: {} as {
          userId: UserId,
          commands?: Command[],
        },
        input: {} as {
          userId: string,
        },
        events: {} as
          | { type: 'Reload' }
    },
    actors: {
      'Backend: Fetch user data': fromPromise(({ input }: { input: { userId: UserId }}) => {
        return getUser(input.userId)
      })
    }
}).createMachine({
  id: 'past-commands-machine',
  context: ({ input }) => ({ 
    userId: input.userId,
  }),  
  initial: 'Fetching past commands',
  states: {
    'Fetching past commands': {
        tags: [ 'Loading whole page' ],
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
                commands: event.output.commands
              }))
            }
          ],
        }
    },
    'Idle': {
      on: {
        'Reload': {
          target: 'Fetching past commands'
        }
      }
    }
  }
});