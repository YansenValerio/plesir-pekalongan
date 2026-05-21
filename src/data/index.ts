import type { Destinasi, Event, Berita, FAQ, TICInfo, Wilayah, UserGalleryItem } from '@/types'

import _destinasiData from '../../data/destinasi.json'
import _eventData from '../../data/event.json'
import _beritaData from '../../data/berita.json'
import _faqData from '../../data/faq.json'
import _ticInfoData from '../../data/tic-info.json'
import _wilayahData from '../../data/wilayah.json'
import _userGalleryData from '../../data/user-gallery.json'

export const destinasiData = _destinasiData as Destinasi[]
export const eventData = _eventData as Event[]
export const beritaData = _beritaData as Berita[]
export const faqData = _faqData as FAQ[]
export const ticInfoData = _ticInfoData as TICInfo
export const wilayahData = _wilayahData as Wilayah[]
export const userGalleryData = _userGalleryData as UserGalleryItem[]

// Helper: cari destinasi by id
export function getDestinasiById(id: string): Destinasi | undefined {
  return destinasiData.find(d => d.id === id)
}

// Helper: cari event by slug
export function getEventBySlug(slug: string): Event | undefined {
  return eventData.find(e => e.slug === slug)
}

// Helper: cari berita by slug
export function getBeritaBySlug(slug: string): Berita | undefined {
  return beritaData.find(b => b.slug === slug)
}

// Helper: filter destinasi by kategori
export function getDestinasiByKategori(kategori: Destinasi['kategori']): Destinasi[] {
  return destinasiData.filter(d => d.kategori === kategori)
}

// Helper: filter event by status
export function getEventByStatus(status: Event['status']): Event[] {
  return eventData.filter(e => e.status === status)
}
