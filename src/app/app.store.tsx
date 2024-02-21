import { create } from 'zustand';

interface AppState {
  appearance: {
    bgColor: string;
    day: boolean;
    isSet: boolean;
    rain: boolean;
  };
}

interface AppActions {
  setAppearance: (appearance: AppState['appearance']) => void;
  setDay: (day: boolean) => void;
  setBgColor: (color: string) => void;
  setRain: (rain: boolean) => void;
}

type AppStore = AppState & AppActions;

export const useAppStore = create<AppStore>((set) => ({
  appearance: {
    bgColor: '#87CEEB',
    day: true,
    isSet: false,
    rain: false,
  },

  setAppearance: (appearance: AppState['appearance']) =>
    set((state) => ({
      ...state,
      appearance: {
        ...state.appearance,
        ...appearance,
      },
    })),

  setBgColor: (color: string) =>
    set((state) => ({
      ...state,
      appearance: {
        ...state.appearance,
        bgColor: color,
      },
    })),

  setDay: (day: boolean) =>
    set((state) => ({
      ...state,
      appearance: {
        ...state.appearance,
        day,
      },
    })),

  setRain: (rain: boolean) =>
    set((state) => ({
      ...state,
      appearance: {
        ...state.appearance,
        rain,
      },
    })),
}));
