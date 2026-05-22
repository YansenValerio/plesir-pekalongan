export function imgUrl(url: string, width: number, quality = 75): string {
  if (!url || !url.includes('/storage/v1/object/public/')) return url
  return (
    url.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/') +
    `?width=${width}&quality=${quality}`
  )
}
