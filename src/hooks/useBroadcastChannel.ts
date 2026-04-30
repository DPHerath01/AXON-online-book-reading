import { useEffect, useRef, useCallback } from 'react';

export type BroadcastMessage<T> = {
  type: string;
  payload: T;
};

export function useBroadcastChannel<T>(channelName: string, onMessage?: (msg: BroadcastMessage<T>) => void) {
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      channelRef.current = new BroadcastChannel(channelName);

      const handleMessage = (event: MessageEvent) => {
        if (onMessage) {
          onMessage(event.data);
        }
      };

      channelRef.current.addEventListener('message', handleMessage);

      return () => {
        if (channelRef.current) {
          channelRef.current.removeEventListener('message', handleMessage);
          channelRef.current.close();
        }
      };
    }
  }, [channelName, onMessage]);

  const postMessage = useCallback((message: BroadcastMessage<T>) => {
    if (channelRef.current) {
      channelRef.current.postMessage(message);
    }
  }, []);

  return { postMessage };
}
