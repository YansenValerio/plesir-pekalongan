import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Lang = 'id' | 'en'

interface LangStore {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
}

export const useLangStore = create<LangStore>()(
  persist(
    (set) => ({
      lang: 'id',
      setLang: (lang) => set({ lang }),
      toggleLang: () => set((s) => ({ lang: s.lang === 'id' ? 'en' : 'id' })),
    }),
    { name: 'plesir-lang' }
  )
)
