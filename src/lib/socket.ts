// src/socket.js
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.BASE_URL; // replace with your server URL

const socket = io(SOCKET_URL, {
  autoConnect: false, // Optional: connect manually if needed
//   withCredentials: true, // Optional, depending on your setup
});

export default socket;
