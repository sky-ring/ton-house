import type { AnyAction } from '@reduxjs/toolkit';
import type { Dispatch } from 'react';
import { useEffect } from 'react';
import io from 'socket.io-client';

import { useAppDispatch } from '@/redux/hooks';

export type Listener = {
  event: string;
  action: (dispatch: Dispatch<AnyAction>, ...args: any[]) => void;
};

export const useSubscribeSocket = (listeners: Listener[]) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);

    listeners.forEach(({ event, action }) => {
      socket.on(event, (...args: any[]) => {
        action(dispatch, ...args);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};
