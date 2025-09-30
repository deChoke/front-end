import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Link from "next/link"

interface Photo {
  id: string
  url: string
  created_time: string
}

export default function AlbumDetailPage() {
  const router = useRouter()
  const { albumId } = router.query
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!albumId) return

    async function fetchPhotos() {
      setLoading(true)
      try {
        const response = await fetch(`/api/photos?albumId=${albumId}`)
        const data = await response.json()
        setPhotos(data.photos)
      } catch (error) {
        console.error("Fout bij ophalen van foto's:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [albumId])

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center my-10">Foto's van 20 jaar Choke</h1>
      {loading ? (
        <p className="text-center">Laden...</p>
      ) : Array.isArray(photos) && photos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <img
              key={photo.id}
              src={photo.url}
              alt="Foto uit album"
              className="rounded shadow"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/default-photo.jpg"
              }}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">Geen foto's gevonden.</p>
      )}
    </div>
  )
}