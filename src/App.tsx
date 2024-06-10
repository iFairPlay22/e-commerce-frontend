import { useSelector } from '@xstate/react';
import { createActor } from 'xstate';
import fetchStateMachine from './machines/FetchStateMachine';

const fetchActor = createActor(
  fetchStateMachine<string>(), {
    input: {
      fn: () => 
        Promise.resolve(
          (Math.random() < 0.3) ?
          { statusCode: 200, content: 'Hello world!' } :
          { statusCode: 500, content: 'Unknown error!' }
        )   
    }
  }
).start()

export const App = () => {

  const state = useSelector(fetchActor, _ => _.value)
  const context = useSelector(fetchActor, _ => _.context)

  switch (state) {
    case 'Idle':
      return (
        <button onClick={() => fetchActor.send({ type: 'Fetch' })}>
          Fetch
        </button>
      );
    case 'Loading':
      return (
        <p>Loading</p>
      );
    case 'Failure':
      return (
        <>
          <p>
            Operation failed {context.triesNb} times
          </p>
          <button onClick={() => fetchActor.send({ type: 'Retry' })}>
            Retry
          </button>
        </>
      )
    case 'Success':
      return (
        <>
          <p>
            Operation succeeded after {context.triesNb} attempt{context.triesNb !== 0 ?? 's'}!
          </p>
          <p>
            Result: {context.lastResponse?.content}
          </p>
          <button onClick={() => fetchActor.send({ type: 'Restart' })}>
            Restart
          </button>
        </>
      )
    default:
      return (
        <p>Unknown state</p>
      )
  }
}