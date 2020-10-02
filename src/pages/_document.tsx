import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

export default class MyDocument extends Document<{}> {
  public render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" key="charset"/>
          <meta name="og:title" content="Walcron Coorperation Apps" key="fb_title"/>
          <meta name="og:type" content="profile" key="fb_type"/>
          <meta name="og:site_name" content="https://app.walcron.com/" key="fb_charset"/>
          <meta property="og:image:type" content="image/png" key="fb_image_t"/>
          <meta property="og:image:width" content="400" key="fb_image_w"/>
          <meta property="og:image:height" content="400" key="fb_image_h"/>
          <meta name="og:image" content="https://www.walcron.com/og_image.png" key="fb_image_i"/>
          <meta name="og:description" content="All Walcron's service apps related to Trusted Web Application and PWA resides here." key="fb_image_desc"/>
          <meta name="fb:admins" content="walcoorperation@gmail.com" key="fb_image_m"/>
          <meta name="description" content="All Walcron's service apps related to Trusted Web Application and PWA resides here." key="description"/>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/pwa/apple-icon.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/pwa/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/pwa/apple-icon-180x180.png" />
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
