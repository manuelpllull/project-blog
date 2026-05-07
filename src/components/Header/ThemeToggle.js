'use client';
import React from 'react';
import { Sun, Moon } from 'react-feather';

import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './Header.module.css';

function ThemeToggle({ initialTheme }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function toggleTheme() {
    const nextTheme =
      theme === 'light' ? 'dark' : 'light';

    document.documentElement.dataset.colorTheme =
      nextTheme;
    document.cookie = `color-theme=${nextTheme}; path=/; max-age=31536000; samesite=lax`;
    setTheme(nextTheme);
  }

  return (
    <button
      className={styles.action}
      onClick={toggleTheme}
      aria-label="Toggle dark / light mode"
    >
      {theme === 'light' ? (
        <Sun size="1.5rem" />
      ) : (
        <Moon size="1.5rem" />
      )}
      <VisuallyHidden>
        Toggle dark / light mode
      </VisuallyHidden>
    </button>
  );
}

export default ThemeToggle;
