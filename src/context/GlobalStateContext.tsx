"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useBroadcastChannel } from "@/hooks/useBroadcastChannel";

export type ThemeMode = "newspaper-brown" | "vintage-lace" | "rare-jade" | "solarized-dark" | "parchment-gold" | "dark";

interface GlobalState {
  theme: ThemeMode;
  bookmarks: Record<string, number[]>; // bookId -> pageNumbers
  setTheme: (theme: ThemeMode) => void;
  addBookmark: (bookId: string, pageNumber: number) => void;
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

type SyncPayload = 
  | { action: "SET_THEME"; theme: ThemeMode }
  | { action: "ADD_BOOKMARK"; bookId: string; pageNumber: number };

export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("parchment-gold");
  const [bookmarks, setBookmarksState] = useState<Record<string, number[]>>({});

  const { postMessage } = useBroadcastChannel<SyncPayload>("axon_reader_sync", (msg) => {
    if (msg.type === "SYNC") {
      const payload = msg.payload;
      if (payload.action === "SET_THEME") {
        setThemeState(payload.theme);
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute("data-theme", payload.theme);
        }
      } else if (payload.action === "ADD_BOOKMARK") {
        setBookmarksState((prev) => {
          const bookMarks = prev[payload.bookId] || [];
          if (!bookMarks.includes(payload.pageNumber)) {
            return { ...prev, [payload.bookId]: [...bookMarks, payload.pageNumber] };
          }
          return prev;
        });
      }
    }
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", newTheme);
    }
    postMessage({ type: "SYNC", payload: { action: "SET_THEME", theme: newTheme } });
  };

  const addBookmark = (bookId: string, pageNumber: number) => {
    setBookmarksState((prev) => {
      const bookMarks = prev[bookId] || [];
      if (!bookMarks.includes(pageNumber)) {
        return { ...prev, [bookId]: [...bookMarks, pageNumber] };
      }
      return prev;
    });
    postMessage({ type: "SYNC", payload: { action: "ADD_BOOKMARK", bookId, pageNumber } });
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <GlobalStateContext.Provider value={{ theme, bookmarks, setTheme, addBookmark }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
}
