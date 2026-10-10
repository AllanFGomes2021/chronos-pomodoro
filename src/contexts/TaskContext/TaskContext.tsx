import { createContext } from 'react';
import type { TaskStateModel } from '../../models/TaskStateModel';
import type { TaskActionModel } from './taskActions';

const initialState: TaskStateModel = {
  tasks: [],
  secondsRemaining: 0,
  formattedSecondsRemaining: '00:00',
  activeTask: null,
  currentCycle: 0,
  config: {
    workTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
  },
};

type TaskContextProps = {
  state: TaskStateModel;
  //setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
  dispatch: React.Dispatch<TaskActionModel>;
};

const initialContextValue = {
  state: initialState,
  //setState: () => {},
  dispatch: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);
