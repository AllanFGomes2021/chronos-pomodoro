import type { TaskModel } from './TaskModel';

export type TaskStateModel = {
  tasks: TaskModel[]; // historico, mainform
  secondsRemaining: number; // home, historico, mainform, countdown, button
  formattedSecondsRemaining: string; // titulo, countdown
  activeTask: TaskModel | null; // historico, mainform, countdown, button
  currentCycle: number; // 1 a 8 home
  config: {
    workTime: number; //mainform
    shortBreakTime: number; //mainform
    longBreakTime: number; //mainform
  };
};
