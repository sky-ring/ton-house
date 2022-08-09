import type { AnyAction } from '@reduxjs/toolkit';
import type { Dispatch } from 'react';
import { useEffect } from 'react';
import io from 'socket.io-client';

import { useAppDispatch } from '@/redux/hooks';

export type Listener = {
  event: string;
  action: (dispatch: Dispatch<AnyAction>, ...args: any[]) => void;
};

export const useSubscribeSocket = (
  namespace: string,
  listeners: Listener[]
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}/${namespace}`);

    // socket.on('connect', () => console.log('connected'));

    listeners.forEach(({ event, action }) => {
      socket.on(event, (...args: any[]) => {
        action(dispatch, ...args);
      });
    });

    // cleanup socket connection
    return () => {
      socket.disconnect();
    };
  }, []);
};
