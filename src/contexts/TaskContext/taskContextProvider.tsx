import { useEffect, useReducer, useRef } from 'react';
import { TaskContext } from './TaskContext';
import { initialTaskState } from './initialTaskState';
import { taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionTypes } from './taskActions';
import { loadBeep } from '../../utils/loadBeep';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  //const [state, setState] = useState(initialTaskState);
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  //const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

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

  const worker = TimerWorkerManager.getInstance();

  worker.onmessage(e => {
    const countDownSeconds = e.data;
    console.log(countDownSeconds);

    if (countDownSeconds <= 0) {
      //if (playBeepRef.current) {
      // playBeepRef.current();
      // playBeepRef.current = null;
      //}

      dispatch({
        type: TaskActionTypes.COMPLETE_TASK,
      });
      worker.terminate();
    }
  });

  useEffect(() => {
    if (!state.activeTask) {
      // if (state.activeTask && playBeepRef.current === null) {
      //    playBeepRef.current = loadBeep();
      // } else {
      //    playBeepRef.current = null;
      // }}, [state.activeTask]);

      worker.terminate();
    }

    worker.postMessage(state);
  }, [worker, state]);

  return (
    <>
      {/*<TaskContext.Provider value={{ state, setState }}>*/}
      <TaskContext.Provider value={{ state, dispatch }}>
        {children}
      </TaskContext.Provider>
    </>
  );
}
