import type { TaskStateModel } from './TaskStateModel';

export type TypeProps = {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};
