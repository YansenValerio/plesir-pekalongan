import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { WizardData, Itinerary, Companion, StayType, BudgetTier } from '@/types'

interface TripStore {
  step: number
  data: WizardData
  itinerary: Itinerary | null
  isLoading: boolean
  error: string | null

  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  setCompanion: (companion: Companion) => void
  toggleInterest: (interest: string) => void
  toggleFood: (food: string) => void
  setStay: (stay: StayType) => void
  setDateRange: (start: number, end: number) => void
  setBudget: (amount: number, tier: BudgetTier | null) => void
  setItinerary: (itinerary: Itinerary) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

const initialData: WizardData = {
  companion: null,
  interests: [],
  food: [],
  stay: null,
  startDate: null,
  endDate: null,
  budget: 2000000,
  budgetTier: null,
}

export const useTripStore = create<TripStore>()(
  persist(
    (set) => ({
      step: 0,
      data: initialData,
      itinerary: null,
      isLoading: false,
      error: null,

      setStep: (step) => set({ step }),
      nextStep: () => set((s) => ({ step: s.step + 1 })),
      prevStep: () => set((s) => ({ step: Math.max(0, s.step - 1) })),

      setCompanion: (companion) =>
        set((s) => ({ data: { ...s.data, companion } })),

      toggleInterest: (interest) =>
        set((s) => {
          const interests = s.data.interests.includes(interest)
            ? s.data.interests.filter((i) => i !== interest)
            : [...s.data.interests, interest]
          return { data: { ...s.data, interests } }
        }),

      toggleFood: (food) =>
        set((s) => {
          const foods = s.data.food.includes(food)
            ? s.data.food.filter((f) => f !== food)
            : [...s.data.food, food]
          return { data: { ...s.data, food: foods } }
        }),

      setStay: (stay) =>
        set((s) => ({ data: { ...s.data, stay } })),

      setDateRange: (startDate, endDate) =>
        set((s) => ({ data: { ...s.data, startDate, endDate } })),

      setBudget: (budget, budgetTier) =>
        set((s) => ({ data: { ...s.data, budget, budgetTier } })),

      setItinerary: (itinerary) => set({ itinerary }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      reset: () =>
        set({ step: 0, data: initialData, itinerary: null, isLoading: false, error: null }),
    }),
    {
      name: 'plesir-trip',
      partialize: (s) => ({ data: s.data, itinerary: s.itinerary }),
    },
  ),
)
