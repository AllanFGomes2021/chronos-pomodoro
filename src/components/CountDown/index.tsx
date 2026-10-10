import styles from './styles.module.css';
import type { TypeProps } from '../../models/TypeProps';
import type { TaskStateModel } from '../../models/TaskStateModel';

//import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

type CountDownProps = {} & TypeProps;

export function CountDown({ state }: CountDownProps) {
  // const { state } = useTaskContext();

  console.log(state);
  return (
    <>
      <div className={styles.countdown}>{state.formattedSecondsRemaining}</div>
    </>
  );
}
