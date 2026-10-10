import type { TaskModel } from './TaskModel';

export type TaskStateModel = {
  tasks: TaskModel[]; // Histórico, MainForm
  secondsRemaining: number; // Home, Histórico, MainForm, CountDown, Button
  formattedSecondsRemaining: string; // CountDown, Titulo
  activeTask: TaskModel | null; // Histórico, MainForm, CountDown, Button
  currentCycle: number; // 1 a 8 //Home
  config: {
    workTime: number; // MainForm
    shortBreakTime: number; // MainForm
    longBreakTime: number; // MainForm
  };
};
