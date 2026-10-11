//import styles from './styles.module.css';
import { useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import type { TaskModel } from '../../models/TaskModel';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';

import { getNextCycleType } from '../../utils/getNextCycleType';

import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { Tips } from '../Tips';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { showMessage } from '../adapters/showMessage';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  function handleCreateNewTask(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();
    const nextCycleType = getNextCycleType(state.currentCycle + 1);

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

    const worker = TimerWorkerManager.getInstance();
    /* 
    const worker = new Worker(
      new URL('../../workers/timerWorker.ts', import.meta.url),
    );

    worker.postMessage('FAVOR'); // Sim, posso fazer um favor
    worker.postMessage('FALA_OI'); // OK: OI!
    worker.postMessage('BLALBLA'); // Não entendi!
    worker.postMessage('FECHAR'); // Tá bom, vou fechar

    worker.onmessage = function (event) {
      console.log('PRINCIPAL recebeu:', event.data);
    };

    console.log('0');
    console.log('1');
*/
    //worker.postMessage('FAVOR'); // Sim, posso fazer um favor
    //worker.postMessage('FALA_OI'); // OK: OI!
    //worker.postMessage('BLALBLA'); // Não entendi!
    //worker.postMessage('FECHAR'); // Tá bom, vou fechar
    //console.log('2');
    //worker.onmessage(event => {
    //  console.log('PRINCIPAL recebeu:', event.data);
    //});

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
