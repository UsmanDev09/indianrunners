import { ContextProvider } from "@/Context/ContextProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import NextNProgress from 'nextjs-progressbar';

import Toast from '../components/Toast';
import Layout from "@/components/Layout";
import socket from '../socket';

export default function App({ Component, pageProps }: AppProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [notification, setNotification] = useState<object>();
  const [notifications, setNotifications] = useState<object[]>([]);


  useEffect(() => {

    function onConnect() {
      console.count('connected to sockets')
      setIsConnected(true);
    }

    fetch('http://localhost:5000/api/notification').then((response) => response.json()).then((data) => setNotifications(data.data)).catch((e)=>{console.log(e)})
    socket.on('connect', onConnect);
    socket.on('notification', (data) => {
      setNotification(data);
    });

    return () => {
      socket.off('connect')
      socket.off('notification');
    };
  }, []);
  
  return (
    <ContextProvider>
      <NextNProgress />
      <Layout notifications={notifications && notifications.length > 5 ? notifications.splice(0, 5) : notifications}>
        {notification && (
          <Toast notification={notification}/>
        )}
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}
