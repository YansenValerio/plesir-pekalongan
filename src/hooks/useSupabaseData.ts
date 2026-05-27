import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Destinasi, Berita, Event, FAQ, Review, UserGalleryItem } from '@/types'

interface AsyncState<T> {
  data: T
  loading: boolean
  error: string | null
}

export function useDestinasiList(): AsyncState<Destinasi[]> {
  const [state, setState] = useState<AsyncState<Destinasi[]>>({ data: [], loading: true, error: null })

  useEffect(() => {
    supabase.from('destinasi').select('*').order('nama')
      .then(({ data, error }) => {
        setState({ data: (data as Destinasi[]) ?? [], loading: false, error: error?.message ?? null })
      })
  }, [])

  return state
}

export function useDestinasiById(id: string | undefined): AsyncState<Destinasi | null> {
  const [state, setState] = useState<AsyncState<Destinasi | null>>({ data: null, loading: true, error: null })

  useEffect(() => {
    if (!id) { setState({ data: null, loading: false, error: null }); return }
    supabase.from('destinasi').select('*').eq('id', id).single()
      .then(({ data, error }) => {
        setState({ data: data as Destinasi | null, loading: false, error: error?.message ?? null })
      })
  }, [id])

  return state
}

export function useBeritaList(): AsyncState<Berita[]> {
  const [state, setState] = useState<AsyncState<Berita[]>>({ data: [], loading: true, error: null })

  useEffect(() => {
    supabase.from('berita').select('*').order('tanggal_publish', { ascending: false })
      .then(({ data, error }) => {
        setState({ data: (data as Berita[]) ?? [], loading: false, error: error?.message ?? null })
      })
  }, [])

  return state
}

export function useBeritaBySlug(slug: string | undefined): AsyncState<Berita | null> {
  const [state, setState] = useState<AsyncState<Berita | null>>({ data: null, loading: true, error: null })

  useEffect(() => {
    if (!slug) { setState({ data: null, loading: false, error: null }); return }
    supabase.from('berita').select('*').eq('slug', slug).single()
      .then(({ data, error }) => {
        setState({ data: data as Berita | null, loading: false, error: error?.message ?? null })
      })
  }, [slug])

  return state
}

export function useEventList(): AsyncState<Event[]> {
  const [state, setState] = useState<AsyncState<Event[]>>({ data: [], loading: true, error: null })

  useEffect(() => {
    supabase.from('event').select('*').order('tanggal_mulai', { ascending: false })
      .then(({ data, error }) => {
        setState({ data: (data as Event[]) ?? [], loading: false, error: error?.message ?? null })
      })
  }, [])

  return state
}

export function useEventBySlug(slug: string | undefined): AsyncState<Event | null> {
  const [state, setState] = useState<AsyncState<Event | null>>({ data: null, loading: true, error: null })

  useEffect(() => {
    if (!slug) { setState({ data: null, loading: false, error: null }); return }
    supabase.from('event').select('*').eq('slug', slug).single()
      .then(({ data, error }) => {
        setState({ data: data as Event | null, loading: false, error: error?.message ?? null })
      })
  }, [slug])

  return state
}

export function useReviewList(destinasiId: string | undefined): AsyncState<Review[]> {
  const [state, setState] = useState<AsyncState<Review[]>>({ data: [], loading: true, error: null })

  useEffect(() => {
    if (!destinasiId) { setState({ data: [], loading: false, error: null }); return }
    supabase.from('review').select('*')
      .eq('destinasi_id', destinasiId)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        setState({ data: (data as Review[]) ?? [], loading: false, error: error?.message ?? null })
      })
  }, [destinasiId])

  return state
}

export function useUserGalleryList(): AsyncState<UserGalleryItem[]> {
  const [state, setState] = useState<AsyncState<UserGalleryItem[]>>({ data: [], loading: true, error: null })

  useEffect(() => {
    supabase.from('user_gallery').select('*').order('posted_at', { ascending: false })
      .then(({ data, error }) => {
        setState({ data: (data as UserGalleryItem[]) ?? [], loading: false, error: error?.message ?? null })
      })
  }, [])

  return state
}

export function useFaqList(): AsyncState<FAQ[]> {
  const [state, setState] = useState<AsyncState<FAQ[]>>({ data: [], loading: true, error: null })

  useEffect(() => {
    supabase.from('faq').select('*').order('urutan')
      .then(({ data, error }) => {
        setState({ data: (data as FAQ[]) ?? [], loading: false, error: error?.message ?? null })
      })
  }, [])

  return state
}

export function useDestinasiByIds(ids: string[]): AsyncState<Destinasi[]> {
  const [state, setState] = useState<AsyncState<Destinasi[]>>({ data: [], loading: true, error: null })
  const key = ids.join(',')

  useEffect(() => {
    if (ids.length === 0) { setState({ data: [], loading: false, error: null }); return }
    supabase.from('destinasi').select('*').in('id', ids)
      .then(({ data, error }) => {
        setState({ data: (data as Destinasi[]) ?? [], loading: false, error: error?.message ?? null })
      })
  }, [key])

  return state
}

export function useEventByIds(ids: string[]): AsyncState<Event[]> {
  const [state, setState] = useState<AsyncState<Event[]>>({ data: [], loading: true, error: null })
  const key = ids.join(',')

  useEffect(() => {
    if (ids.length === 0) { setState({ data: [], loading: false, error: null }); return }
    supabase.from('event').select('*').in('id', ids)
      .then(({ data, error }) => {
        setState({ data: (data as Event[]) ?? [], loading: false, error: error?.message ?? null })
      })
  }, [key])

  return state
}

export function useSpotlightData(): AsyncState<Destinasi[]> {
  const [state, setState] = useState<AsyncState<Destinasi[]>>({ data: [], loading: true, error: null })

  useEffect(() => {
    supabase
      .from('destinasi')
      .select('id, nama, nama_en, deskripsi_singkat, deskripsi_en, foto_cover, kategori')
      .order('rating', { ascending: false })
      .limit(6)
      .then(({ data, error }) => {
        setState({ data: (data as Destinasi[]) ?? [], loading: false, error: error?.message ?? null })
      })
  }, [])

  return state
}
