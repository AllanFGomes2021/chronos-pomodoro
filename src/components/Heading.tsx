import styles from './Heading.module.css';
export function Heading() {
  const classes = `${styles.heading} ${styles.cyan}`;
  return (
    <>
      <h1 className={classes}>Ola mundo!</h1>
    </>
  );
}
