// pages/photos.tsx
import Link from "next/link"
import BundleCard from "../../components/bundelCard"

interface PhotosPageProps {
  albumId: string
}

export default function PhotosPage({ albumId }: PhotosPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Foto Albums</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Link href={`/photos/${albumId}`} legacyBehavior>
            <a className="transform transition-transform hover:scale-105">
              <BundleCard title="20 jaar Choke" onClick={() => {}} />
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const albumId = process.env.FACEBOOK_ALBUM_ID

  if (!albumId) {
    throw new Error('FACEBOOK_ALBUM_ID is not configured')
  }

  return {
    props: {
      albumId,
    },
  }
}
