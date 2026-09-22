import styles from './styles.module.css';
import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import { useState, useEffect } from 'react';

type availableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<availableThemes>(() => {
    const storageTheme =
      (localStorage.getItem('theme') as availableThemes) || 'dark';
    return storageTheme;
    // const storageTheme = (localStorage.getItem('theme') as availableThemes);
    // return storageTheme === 'light' ? 'light' : 'dark';
  });

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

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
  }, [theme]);

  return (
    <>
      <nav className={`${styles.menu}`}>
        <a
          className={styles.menuLink}
          href='#'
          aria-label='ir para a Home'
          title='ir para a Home'
        >
          <HouseIcon />
        </a>

        <a
          className={styles.menuLink}
          href='#'
          aria-label='ver histórico'
          title='ver histórico'
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
          aria-label='mudar tema'
          title='mudar tema'
          onClick={handleThemeChange}
        >
          {nextThemeIcon[theme]}
        </a>
      </nav>
    </>
  );
}
