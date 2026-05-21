import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoriteStore {
  destinasiIds: string[]
  eventIds: string[]
  toggleDestinasi: (id: string) => void
  toggleEvent: (id: string) => void
  isDestinasiSaved: (id: string) => boolean
  isEventSaved: (id: string) => boolean
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      destinasiIds: [],
      eventIds: [],

      toggleDestinasi: (id) =>
        set((s) => ({
          destinasiIds: s.destinasiIds.includes(id)
            ? s.destinasiIds.filter((i) => i !== id)
            : [...s.destinasiIds, id],
        })),

      toggleEvent: (id) =>
        set((s) => ({
          eventIds: s.eventIds.includes(id)
            ? s.eventIds.filter((i) => i !== id)
            : [...s.eventIds, id],
        })),

      isDestinasiSaved: (id) => get().destinasiIds.includes(id),
      isEventSaved: (id) => get().eventIds.includes(id),
    }),
    { name: 'plesir-favorites' }
  )
)
