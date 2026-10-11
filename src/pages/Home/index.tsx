//import styles from './styles.module.css';
import { MainTemplate } from '../../templatesGerais/MainTemplate';
import { Container } from '../../components/Container';
import { CountDown } from '../../components/CountDown';
import { MainForm } from '../../components/MainForm';

export function Home() {
  return (
    <>
      <MainTemplate>
        <Container>
          <CountDown />
        </Container>

        <Container>
          <MainForm />
        </Container>
      </MainTemplate>
    </>
  );
}
