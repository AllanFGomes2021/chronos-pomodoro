//import styles from './styles.module.css';
import { useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import type { TaskModel } from '../../models/TaskModel';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';

import { getNextCycleType } from '../../utils/getNextCycleType';
import { getNextCycle } from '../../utils/getNextCycle';

import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { Tips } from '../Tips';
import { showMessage } from '../adapters/showMessage';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

  // ciclos
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      showMessage.warn('Digite o nome da tarefa');
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

    showMessage.success('Tarefa iniciada');
  }

  function handleInterruptTask(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();

    showMessage.dismiss();
    showMessage.error('Tarefa interrompida!');

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
            defaultValue={lastTaskName}
          />
        </div>

        <div className='formRow'>
          <Tips />
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
