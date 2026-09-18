import styles from './Heading.module.css';
export function Heading(props) {
  const classes = `${styles.heading} ${styles.cyan}`;
  return (
    <>
      <h1 className={classes}>{props.children}</h1>
    </>
  );
}
