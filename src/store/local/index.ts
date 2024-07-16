import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLocalDataStore = create<{
  authorIDsPinned: string[];
  publicationIDsPinned: string[];
  resourceIDsPinned: string[];
  setAuthorIDsPinned(authorIDs: string[]): void;
  setPublicationIDsPinned(publicationIDs: string[]): void;
  setResourceIDsPinned(resourceIDs: string[]): void;
}>()(
  persist(
    (set) => ({
      authorIDsPinned: [],
      publicationIDsPinned: [],
      resourceIDsPinned: [],
      setAuthorIDsPinned: (newAuthorIDsPinned: string[]) =>
        set((state: any) => ({
          ...state,
          authorIDsPinned: newAuthorIDsPinned,
        })),
      setPublicationIDsPinned: (newPublicationIDsPinned: string[]) =>
        set((state: any) => ({
          ...state,
          publicationIDsPinned: newPublicationIDsPinned,
        })),
      setResourceIDsPinned: (newResourceIDsPinned: string[]) =>
        set((state: any) => ({
          ...state,
          resourceIDsPinned: newResourceIDsPinned,
        })),
    }),
    { name: "citationdb" },
  ),
);

export default useLocalDataStore;
