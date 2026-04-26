import React from 'react';
import {
  Work_Sans,
  Spline_Sans_Mono,
} from 'next/font/google';
import clsx from 'clsx';

import { LIGHT_TOKENS, DARK_TOKENS } from '@/constants';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './styles.css';

const mainFont = Work_Sans({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family',
});
const monoFont = Spline_Sans_Mono({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family-mono',
});

function cssTokensToRule(selector, tokens) {
  return `${selector} {\n` +
    Object.entries(tokens)
      .map(([k, v]) => `  ${k}: ${v};`)
      .join('\n') +
    '\n}';
}

function RootLayout({ children }) {
  // TODO: Dynamic theme depending on user preference
  const theme = 'light';

  const tokens = theme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;
  const rule = cssTokensToRule(`html[data-color-theme='${theme}']`, tokens);

  return (
    <html
      lang="en"
      className={clsx(mainFont.variable, monoFont.variable)}
      data-color-theme={theme}
    >
      <head>
        <meta charSet="utf-8" />
        <style dangerouslySetInnerHTML={{ __html: rule }} />
      </head>
      <body>
        <Header theme={theme} />
        <main suppressHydrationWarning>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;
