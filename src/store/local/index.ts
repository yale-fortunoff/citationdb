import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLocalDataStore = create<{
  authors: any[];
  authorIDsPinned: string[];
  footnotes: any[];
  publications: any[];
  publicationIDsPinned: string[];
  resources: any[];
  resourceIDsPinned: string[];
  setAuthors(authors: any[]): void;
  setAuthorIDsPinned(authorIDs: string[]): void;
  setFootnotes(footnotes: any[]): void;
  setPublications(publications: any[]): void;
  setPublicationIDsPinned(publicationIDs: string[]): void;
  setResources(resources: any[]): void;
  setResourceIDsPinned(resourceIDs: string[]): void;
}>()(
  persist(
    (set) => ({
      authors: [],
      authorIDsPinned: [],
      footnotes: [],
      publications: [],
      publicationIDsPinned: [],
      resources: [],
      resourceIDsPinned: [],
      setAuthors: (newAuthors: any[]) =>
        set((state: any) => ({ ...state, authors: newAuthors })),
      setAuthorIDsPinned: (newAuthorIDsPinned: string[]) =>
        set((state: any) => ({
          ...state,
          authorIDsPinned: newAuthorIDsPinned,
        })),
      setFootnotes: (newFootnotes: any[]) =>
        set((state: any) => ({ ...state, footnotes: newFootnotes })),
      setPublications: (newPublications: any[]) =>
        set((state: any) => ({ ...state, publications: newPublications })),
      setPublicationIDsPinned: (newPublicationIDsPinned: string[]) =>
        set((state: any) => ({
          ...state,
          publicationIDsPinned: newPublicationIDsPinned,
        })),
      setResources: (newResources: any[]) =>
        set((state: any) => ({ ...state, resources: newResources })),
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
