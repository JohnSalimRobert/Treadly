// src/context/SocketContext.tsx or .js
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuthStore } from "../stores/useAuthStore";
import type { ReactNode } from "react";
import type { Socket } from "socket.io-client";


export type SocketContextType = {
    socket: Socket | null;
  };

  const SocketContext = createContext<SocketContextType | undefined>(undefined);
  export const useSocketContext = () => useContext(SocketContext);

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL; // replace with your server URL

export const SocketContextProvider = ({ children }: { children: ReactNode }) => {
 const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);

  const token = useAuthStore.getState().token;
  const isAuthenticated = useAuthStore.getState().isAuthenticated;

  useEffect(() => {
    if (isAuthenticated && token && !socket) {
      const newSocket = io(SOCKET_URL, {
        auth: {
          token: token, // or whatever your API uses to identify users
        },
        withCredentials: true,
      });


      console.log("Socket created:", newSocket.id, SOCKET_URL);

      newSocket.on("connect", () => {
        console.log("✅ Socket connected:", newSocket.id);
      });

      newSocket.on("disconnect", () => {
        console.log("⚠️ Socket disconnected");
      });

      setSocket(newSocket);
      return () => {
        if (newSocket) {
          newSocket.close();
          setSocket(null);
        }
      }
    } else {
        if(socket){
            socket.close();
            setSocket(null)
        }
    }

  }, [isAuthenticated, token]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
