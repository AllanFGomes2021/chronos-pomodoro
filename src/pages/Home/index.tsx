//import styles from './styles.module.css';

import { useEffect } from 'react';
import { MainTemplate } from '../../templatesGerais/MainTemplate';
import { Container } from '../../components/Container';
import { CountDown } from '../../components/CountDown';
import { MainForm } from '../../components/MainForm';

export function Home() {
  useEffect(() => {
    document.title = 'Chronos Pomodoro';
  }, []);

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
