import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div>
            <Head>
                <title>Gray to Color Image Conversion</title>
                <meta name="description" content="Light Media Social app" />
                <link
                    rel="icon"
                    href="/drag.png"
                    sizes="any"
                    type="image/svg+xml"
                />
            </Head>
            <main>
                <Component {...pageProps} />
            </main>
        </div>
    );
}
export default MyApp;
