//import styles from './styles.module.css';
import { useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import type { TaskModel } from '../../models/TaskModel';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';

import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';

import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  function handleCreateNewTask(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(state.currentCycle);

    if (!taskName) {
      alert('Digite o nome da tarefa');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
  }

  function handleInterruptTask(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();

    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
  }
  return (
    <>
      <form onSubmit={handleCreateNewTask} className='form' action=''>
        <div className='formRow'>
          <DefaultInput
            labelText='task'
            id='meuInput'
            type='text'
            placeholder='Digite algo'
            ref={taskNameInput}
            disabled={!!state.activeTask}
          />
        </div>

        <div className='formRow'>
          <p>Próximo intervalo é de {state.config.workTime}min</p>
        </div>

        {state.currentCycle > 0 && (
          <div className='formRow'>
            <Cycles />
          </div>
        )}

        <div className='formRow'>
          {!state.activeTask && (
            <DefaultButton
              key='bot_submit'
              type='submit'
              icon={<PlayCircleIcon />}
              color='green'
              aria-label='Iniciar Nova Tarefa'
              title='Iniciar Nova Tarefa'
            />
          )}

          {!!state.activeTask && (
            <DefaultButton
              key='bot_normal'
              type='button'
              icon={<StopCircleIcon />}
              color='red'
              aria-label='Interromper Tarefa Ativa'
              title='Interromper Tarefa Ativa'
              onClick={handleInterruptTask}
            />
          )}
        </div>
      </form>
    </>
  );
}
