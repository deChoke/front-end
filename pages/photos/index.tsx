// pages/photos.tsx
import Link from "next/link"
import BundleCard from "../../components/bundelCard"

export default function PhotosPage() {
  // Hardcode het album-ID dat je wilt gebruiken
  const albumId = process.env.FACEBOOK_ALBUM_ID

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">Foto Albums</h1>
      <div className="flex justify-center">
        <Link href={`/photos/${albumId}`} legacyBehavior>
          <a>
            <BundleCard title="20 jaar Choke" onClick={() => {}} />
          </a>
        </Link>
      </div>
    </div>
  )
}
