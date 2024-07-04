import { createActor } from 'xstate';
import { pastCommandsMachine } from '../../machines/CommandsMachine';
import { useSelector } from '@xstate/react';
import { CommandsComponent } from '../../component/Commands';
import { useEffect } from 'react';

// TODO: use dynamic userId
const pastCommandsActor = createActor(pastCommandsMachine, { input: { userId: '668559ff530d7301332f325f' } }) 

export const CommandsView = () => {
    
    useEffect(() => { pastCommandsActor.start() }, [])
    const { actor, context, isLoading } = useSelector(pastCommandsActor, actor => ({
        actor: actor,
        context: actor.context,
        isLoading: actor.hasTag('Is whole page loading'),
    }))
    
    return (
        <>
            {isLoading && (
                <p>Loading...</p>
            )}
            {!isLoading && context.commands && (
                <CommandsComponent  pastCommands={context.commands}  />
            )}
            {actor.can({ type: 'Reload' }) && (
                <button onClick={ () => pastCommandsActor.send({ type: 'Reload' }) }>
                    Reload
                </button>
            )}
        </>
    )
}