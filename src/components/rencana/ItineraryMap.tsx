import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import type { Itinerary } from '@/types'

// Fix Leaflet default icon URLs broken by Vite bundling
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl

const DAY_COLORS = ['#F2A93B', '#088395', '#C73E3A', '#0A4D68', '#6b3fa0', '#2d8659']

function makeNumberedIcon(number: number, dayIndex: number) {
  const color = DAY_COLORS[dayIndex % DAY_COLORS.length]
  return L.divIcon({
    html: `<div style="background:${color};color:#fff;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.35)">${number}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
    className: '',
  })
}

interface Props {
  itinerary: Itinerary
}

export default function ItineraryMap({ itinerary }: Props) {
  // Collect all activities with coordinates
  const markers: { lat: number; lng: number; label: string; waktu: string; dayIndex: number; actIndex: number }[] = []
  itinerary.hari.forEach((day, dayIndex) => {
    day.aktivitas.forEach((act, actIndex) => {
      if (act.koordinat) {
        markers.push({
          lat: act.koordinat.lat,
          lng: act.koordinat.lng,
          label: act.tempat,
          waktu: act.waktu,
          dayIndex,
          actIndex,
        })
      }
    })
  })

  // Pekalongan city center
  const center: [number, number] = [-6.8898, 109.6750]

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: '100%', width: '100%', borderRadius: 16 }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((m, i) => (
        <Marker
          key={i}
          position={[m.lat, m.lng]}
          icon={makeNumberedIcon(m.actIndex + 1, m.dayIndex)}
        >
          <Popup>
            <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 13, lineHeight: 1.4 }}>
              <div style={{ fontWeight: 700, color: '#0A4D68', marginBottom: 2 }}>{m.label}</div>
              <div style={{ color: '#5C6B73' }}>Hari {m.dayIndex + 1} · {m.waktu}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
