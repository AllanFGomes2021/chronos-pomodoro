import { useTaskContext } from '../../Contexts/TaskContext';
import styles from './styles.module.css';

export function CountDown() {
  const { state } = useTaskContext();

  return (
    <>
      <div className={`${styles.countdown}`}>
        {state.formattedSecondsRemaining}
      </div>
    </>
  );
}
