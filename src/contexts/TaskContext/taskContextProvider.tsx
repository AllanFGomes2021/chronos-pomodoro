import { useEffect, useReducer } from 'react';
import { TaskContext } from './TaskContext';
import { initialTaskState } from './initialTaskState';
import { taskReducer } from './taskReducer';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  //const [state, setState] = useState(initialTaskState);
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  /*
  const [myState, dispatch] = useReducer(
    (state, action: ActionType) => {
      console.log(state, action);

      switch (action.type) {
        case 'INCREMENT': {
          if (!action.payload) return state;

          return {
            ...state,
            secondsRemaining: state.secondsRemaining + action.payload,
          };
        }
        case 'DECREMENT': {
          if (!action.payload) return state;

          return {
            ...state,
            secondsRemaining: state.secondsRemaining - action.payload,
          };
        }
        case 'RESET': {
          return {
            secondsRemaining: 0,
          };
        }
      }

      return state; // estado atual (não altera)
    },
    {
      secondsRemaining: 0,
    },
  );
*/

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <>
      {/*<TaskContext.Provider value={{ state, setState }}>*/}
      <TaskContext.Provider value={{ state, dispatch }}>
        {children}
      </TaskContext.Provider>
    </>
  );
}
