import type { ReactNode } from 'react'

interface Column<T> {
  header: string
  render: (row: T) => ReactNode
  width?: string
}

interface Props<T> {
  columns: Column<T>[]
  rows: T[]
  loading: boolean
  keyFn: (row: T) => string
  emptyText?: string
}

export default function AdminTable<T>({ columns, rows, loading, keyFn, emptyText = 'Belum ada data.' }: Props<T>) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,.1)' }}
    >
      <table className="w-full text-sm">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,.06)' }}>
            {columns.map(col => (
              <th
                key={col.header}
                className="text-left px-4 py-3 text-white/60 font-semibold text-xs uppercase tracking-wider"
                style={{ width: col.width }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
                {columns.map(col => (
                  <td key={col.header} className="px-4 py-3">
                    <div className="h-4 rounded animate-pulse" style={{ background: 'rgba(255,255,255,.08)', width: '60%' }} />
                  </td>
                ))}
              </tr>
            ))
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-white/40">
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map(row => (
              <tr
                key={keyFn(row)}
                style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}
                className="hover:bg-white/[0.03] transition-colors"
              >
                {columns.map(col => (
                  <td key={col.header} className="px-4 py-3 text-white/80">
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
