import styles from './styles.module.css';

type HeadingProps = {
  children: React.ReactNode;
};

export function Heading(props: HeadingProps) {
  const { children } = props;
  return (
    <>
      <div className={`${styles.heading}`}>{children}</div>
    </>
  );
}
