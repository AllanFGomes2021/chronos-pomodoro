import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';

//type MenuProps = {
//  children: React.ReactNode;
//};

type availableThemes = 'dark' | 'light';

const nextThemeIcon = {
  dark: <SunIcon />,
  light: <MoonIcon />,
};

const nextTitle = {
  dark: 'light',
  light: 'dark',
};

export function Menu() {
  const [theme, setTheme] = useState<availableThemes>(() => {
    const storageTheme =
      (localStorage.getItem('theme') as availableThemes) || 'dark';

    return storageTheme;
  });

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();

    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });
  }

  //useEffect(() => {
  //  console.log('useEffect sem dependência', Date.now());
  //}); // executa toda vez que o componente renderiza na tela

  //useEffect(() => {
  //  console.log('useEffect com dependência vazia', Date.now());
  //}, []); // executa apenas quando o react monta o componente pela primeira vez

  //useEffect(() => {
  //  console.log('useEffect com dependência', Date.now());
  //}, [theme]); // executa apenas quando o valor de theme muda

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    return () => {};
  }, [theme]);

  return (
    <>
      <nav className={styles.menu}>
        <a
          className={styles.menuLink}
          href='#'
          aria-label='Ir para a Home'
          title='Ir para a Home'
        >
          <HouseIcon />
        </a>

        <a
          className={styles.menuLink}
          href='#'
          aria-label='Ver Histórico'
          title='Ver Histórico'
        >
          <HistoryIcon />
        </a>

        <a
          className={styles.menuLink}
          href='#'
          aria-label='Configurações'
          title='Configurações'
        >
          <SettingsIcon />
        </a>

        <a
          className={styles.menuLink}
          href='#'
          aria-label={'Muda o tema para ' + nextTitle[theme]}
          title={'Muda o tema para ' + nextTitle[theme]}
          onClick={handleThemeChange}
        >
          {nextThemeIcon[theme]}
        </a>
      </nav>
    </>
  );
}
