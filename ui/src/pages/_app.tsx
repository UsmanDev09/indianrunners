import { ContextProvider } from "@/Context/ContextProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import socket from '../socket';
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    console.log(socket.connected)
    function onConnect() {
      // alert('connected to sockets')
      setIsConnected(true);
    }

    socket.on('connect', onConnect);
    socket.on('notification', (data) => {
      // alert(`Received notification: ${JSON.stringify(data)}`);

      // Update the state with the received data
    });

    return () => {
      socket.off('notification');
    };
  });
  
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}
function setIsConnected(arg0: boolean) {
  throw new Error("Function not implemented.");
}

