import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DarkModeStore {
  dark: boolean
  toggle: () => void
}

export const useDarkModeStore = create<DarkModeStore>()(
  persist(
    (set) => ({
      dark: false,
      toggle: () => set((s) => ({ dark: !s.dark })),
    }),
    { name: 'plesir-dark-mode' }
  )
)
