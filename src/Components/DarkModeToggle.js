import React, { useState, useEffect } from 'react';
import sunIcon from '../assets/images/sun.svg';
import moonIcon from '../assets/images/moon.svg';

import useLocalStorage from 'use-local-storage';

function DarkModeToggle() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage(
    'theme',
    defaultDark ? 'dark' : 'light'
  );
  const [isDarkMode, setIsDarkMode] = useState(defaultDark);

  const setDarkMode = () => {
    document.querySelector('body').setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    setIsDarkMode(true);
  };

  const setLightMode = () => {
    document.querySelector('body').setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    setIsDarkMode(false);
  };

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    if (theme === 'dark') setDarkMode();
    else setLightMode();
  }, [theme]);

  return (
    <button onClick={switchTheme} className="dark-mode-toggle">
      <img
        src={isDarkMode ? moonIcon : sunIcon}
        alt={isDarkMode ? 'Moon icon' : 'Sun icon'}
        className="dark-mode-icon"
      />
    </button>
  );
}

export default DarkModeToggle;
