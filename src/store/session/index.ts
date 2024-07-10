import { create } from "zustand";
import { persist } from "zustand/middleware";

// Custom storage object to use session storage instead of local storage
const sessionStorage = {
  getItem: (name: string) => {
    const item = window.sessionStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: string, value: any) => {
    window.sessionStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    window.sessionStorage.removeItem(name);
  },
};

const useSessionDataStore = create<{
  loaded: boolean;
  setLoaded: (newLoaded: boolean) => void;
}>()(
  persist(
    (set) => ({
      loaded: false,
      setLoaded: (newLoaded: any) => set({ loaded: newLoaded }),
    }),
    {
      name: "citationdb",
      getStorage: () => sessionStorage,
    },
  ),
);

export default useSessionDataStore;
