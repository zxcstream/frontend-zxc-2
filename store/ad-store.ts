// store/useClickStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ClickState {
  clickCount: number;
  popUnderCount: number;
  nextThreshold: number;
  maxPopUnders: number;
  incrementClick: () => void;
  generateRandomThreshold: () => number;
  resetStore: () => void;
}

const thresholds: [number, number][] = [
  [3, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [8, 8],
];

export const useClickStore = create(
  persist<ClickState>(
    (set, get) => ({
      clickCount: 0,
      popUnderCount: 0,
      maxPopUnders: thresholds.length - 1,
      nextThreshold: thresholds[0][0],

      generateRandomThreshold: () => {
        const { popUnderCount } = get();
        const range =
          thresholds[popUnderCount] || thresholds[thresholds.length - 1];
        const [min, max] = range;
        const randomThreshold =
          Math.floor(Math.random() * (max - min + 1)) + min;
        set({ nextThreshold: randomThreshold });
        return randomThreshold;
      },

      incrementClick: () => {
        const {
          clickCount,
          nextThreshold,
          popUnderCount,
          maxPopUnders,
          generateRandomThreshold,
        } = get();
        const newClickCount = clickCount + 1;
        set({ clickCount: newClickCount });

        if (popUnderCount < maxPopUnders && newClickCount >= nextThreshold) {
          window.open(
            "https://robotbagpipe.com/v9b7j3eh?key=2e7312075b482451fb874186986774b4",
            "_blank"
          );
          set({ popUnderCount: popUnderCount + 1, clickCount: 0 });
          generateRandomThreshold();
        }
      },

      resetStore: () => {
        set({
          clickCount: 0,
          popUnderCount: 0,
          nextThreshold: thresholds[0][0],
        });
      },
    }),
    {
      name: "click-store-session",
      storage: {
        getItem: (name) => {
          const value = sessionStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);
