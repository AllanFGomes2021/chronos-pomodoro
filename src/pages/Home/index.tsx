//import styles from './styles.module.css';
import { MainTemplate } from '../../templatesGerais/MainTemplate';
import { Container } from '../../components/Container';
import { CountDown } from '../../components/CountDown';
import { MainForm } from '../../components/MainForm';
import type { TypeProps } from '../../models/TypeProps';

type HomeProps = {} & TypeProps;

export function Home(props: HomeProps) {
  return (
    <>
      <MainTemplate>
        <Container>
          <CountDown {...props} />
        </Container>

        <Container>
          <MainForm {...props} />
        </Container>
      </MainTemplate>
    </>
  );
}
