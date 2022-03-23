import type { FC } from "react";
import Head from "next/head";
import { Global, ThemeProvider, FunctionInterpolation, useTheme } from "@emotion/react";
import "@fontsource/dm-sans";

const globalStyles: FunctionInterpolation<{}> = () => {
  return {
    "*, *::before, *::after": { boxSizing: "inherit" }, //
    html: { colorScheme: "dark" },
    body: { 
      margin: 0,
      boxSizing: "border-box",
      fontFamily: `"DM Sans", sans-serif`,
      backgroundColor: "#111",
      color: "#fffd",
    },
    "#__next": {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",

    }
  }
}

const defaultTheme = {

}

export const Theme: FC = (props) => {
  return <ThemeProvider theme={defaultTheme}>
    <Head>
      <meta name="theme-color" content={"#111"} />
    </Head>
    <Global styles={globalStyles} />
    {props.children}
  </ThemeProvider>
} 