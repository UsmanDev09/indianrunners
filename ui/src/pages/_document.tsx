import { Html, Head, Main, NextScript } from "next/document";
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="dark:bg-dark-green">
        <Main />
        <NextScript />
        <button id="rzp-button1">Pay</button>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive"></Script>
      </body>
    </Html>
  );
}
