// https://github.com/mui/material-ui/blob/78c06894885cc607309733d5ba3a769c67113993/examples/nextjs/pages/_app.js
import type { AppProps } from 'next/app';
import { CacheProvider } from "@emotion/react";
import createCache, { EmotionCache } from "@emotion/cache";

const clientCache = createCache({ key: "css", prepend: true });

function MyApp(props: AppProps & { emotionCache: EmotionCache }) {
  const { Component, emotionCache = clientCache, pageProps } = props;
  return <CacheProvider value={emotionCache}>
    <Component {...pageProps} />
  </CacheProvider>
}

export default MyApp
