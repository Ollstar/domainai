import { Html, Head, Main, NextScript } from 'next/document'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from '/styles/theme.js';




export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <body>
        <ThemeProvider theme={theme}>
          <Main />
        </ThemeProvider>
        <NextScript />
      </body>
    </Html>
  )
}
