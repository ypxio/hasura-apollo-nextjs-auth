import "antd/dist/antd.css";
import '@fontsource/plus-jakarta-sans/variable.css'
// import "@fontsource/dm-sans";
import "../styles/globals.css";
import { NextPage } from "next";
import type { AppContext, AppProps } from "next/app";
import NextNprogress from "nextjs-progressbar";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo-client";
import { AuthProvider } from "../contexts/AuthContext";
import App from "next/app";
import { getJwtToken } from "../lib/auth";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({
  Component,
  pageProps: { token, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const apolloClient = useApollo(pageProps.initialApolloState);

  // Taken from https://blog.guya.net/2015/06/12/sharing-sessionstorage-between-tabs-for-secure-multi-tab-authentication/
  // This is a secure way to share sessionStorage between tabs.
  if (typeof window !== "undefined") {
    if (!sessionStorage.length) {
      // Ask other tabs for session storage
      localStorage.setItem("getSessionStorage", String(Date.now()));
    }

    window.addEventListener("storage", (event) => {
      if (event.key == "getSessionStorage") {
        // Some tab asked for the sessionStorage -> send it
        localStorage.setItem("sessionStorage", JSON.stringify(sessionStorage));
        localStorage.removeItem("sessionStorage");
      } else if (event.key == "sessionStorage" && !sessionStorage.length) {
        // sessionStorage is empty -> fill it
        //@ts-ignore
        const data = JSON.parse(event.newValue);
        for (let key in data) {
          sessionStorage.setItem(key, data[key]);
        }
      }
    });
  }
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <NextNprogress
          color="#1890ff"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
          options={{
            showSpinner: true,
          }}
        />
        {getLayout(<Component {...pageProps} />)}
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
