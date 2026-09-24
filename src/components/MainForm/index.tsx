/*import styles from './styles.module.css';*/
import { DefaultInput } from '../DefaultInput';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { PlayCircleIcon } from 'lucide-react';
import { useRef } from 'react';

export function MainForm() {
  //  const [taskName, setTaskName] = useState('');
  const taskNameInput = useRef<HTMLInputElement>(null);

  function handleCreateNewTask(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('deu');
  }

  return (
    <>
      <form onSubmit={handleCreateNewTask} className='form' action=''>
        <div className='formRow'>
          <DefaultInput
            id='meuInput'
            type=''
            labelText='Task'
            placeholder='Digite algo!!!'
            //            value={taskName}
            //            onChange={ex => setTaskName(ex.target.value)}
            ref={taskNameInput}
          />
        </div>

        <div className='formRow'>
          <p>próximo intervalo é: 24</p>
        </div>

        <div className='formRow'>
          <Cycles />
        </div>

        <div className='formRow'>
          <DefaultButton icon={<PlayCircleIcon />} />
        </div>
      </form>
    </>
  );
}
