// https://github.com/mui/material-ui/blob/78c06894885cc607309733d5ba3a769c67113993/examples/nextjs/pages/_document.js
import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript, } from "next/document";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import createCache, { EmotionCache } from "@emotion/cache";

export default class ExtractionDocument extends Document<{ emotionStyleTags: any }> {

  render() {
    return <Html lang="en">
      <Head>
        {this.props.emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  }


  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps & { emotionStyleTags: any }> {
    const cache = createCache({ key: "css", prepend: true });
    const { extractCriticalToChunks } = createEmotionServer(cache);

    const renderPage = ctx.renderPage;
    ctx.renderPage = () => {
      return renderPage({
        enhanceApp: App => function EnhanceApp(props) {
          // Type of `App` does not expect `emotionCache`.
          // Use destructing to bypass this limitation, 
          // as it is actually used.
          const extraProps = { emotionCache: cache };
          return <App {...props} {...extraProps} />;
        }
      });
    };

    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => {
      return <style 
        data-emotion={`${style.key} ${style.ids.join(" ")}`}
        key={style.key}
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    });

    return {
      ...initialProps,
      emotionStyleTags,
    }
  }
}