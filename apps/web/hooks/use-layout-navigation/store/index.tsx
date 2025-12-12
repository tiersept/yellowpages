import { create } from "zustand";

interface LayoutState {
  isOpen: boolean;
  shouldClose: boolean;
  isAnimating: boolean;
  animatingId: number | null;
  setIsOpen: (isOpen: boolean) => void;
  setShouldClose: (shouldClose: boolean) => void;
  setAnimatingId: (animatingId: number | null) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  isOpen: false,
  shouldClose: false,
  isAnimating: false,
  animatingId: null,
  setAnimatingId: (animatingId: number | null) => set({ animatingId }),
  setIsOpen: (isOpen) => set({ isOpen }),
  setShouldClose: (shouldClose) => set({ shouldClose }),
}));
