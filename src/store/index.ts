import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLocalDataStore = create<{
  loaded: boolean;
  authors: any[];
  footnotes: any[];
  publications: any[];
  resources: any[];
  setLoaded(loaded: boolean): void;
  setAuthors(authors: any[]): void;
  setFootnotes(footnotes: any[]): void;
  setPublications(publications: any[]): void;
  setResources(resources: any[]): void;
}>()(
  persist(
    (set) => ({
      loaded: false,
      authors: [],
      footnotes: [],
      publications: [],
      resources: [],
      setLoaded: (newLoaded: boolean) =>
        set((state: any) => ({ ...state, loaded: newLoaded })),
      setAuthors: (newAuthors: any[]) =>
        set((state: any) => ({ ...state, authors: newAuthors })),
      setFootnotes: (newFootnotes: any[]) =>
        set((state: any) => ({ ...state, footnotes: newFootnotes })),
      setPublications: (newPublications: any[]) =>
        set((state: any) => ({ ...state, publications: newPublications })),
      setResources: (newResources: any[]) =>
        set((state: any) => ({ ...state, resources: newResources })),
    }),
    { name: "citationdb" },
  ),
);

export default useLocalDataStore;
