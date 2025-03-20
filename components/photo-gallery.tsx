"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import ScrollAnimation from "@/components/scroll-animation"

interface Photo {
  id: string
  src: string
  alt: string
}

interface PhotoGalleryProps {
  title: string
  date: string
  photos: Photo[]
}

const PhotoGallery = ({ title, date, photos }: PhotoGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const openLightbox = (photo: Photo) => {
    setSelectedPhoto(photo)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedPhoto(null)
    document.body.style.overflow = "auto"
  }

  return (
    <div className="mb-16">
      <ScrollAnimation>
        <h2 className="text-3xl font-bold mb-2 text-gray-800">{title}</h2>
        <p className="text-gray-500 mb-6">{date}</p>
      </ScrollAnimation>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <ScrollAnimation
            key={photo.id}
            className="photo-grid-item rounded-lg overflow-hidden cursor-pointer shadow-md"
            delay={String(((index % 3) + 1)) as "1" | "2" | "3"}
          >
            <div className="relative h-64 w-full" onClick={() => openLightbox(photo)}>
              <Image src={photo.src || "/placeholder.svg"} alt={photo.alt} fill className="object-cover" />
            </div>
          </ScrollAnimation>
        ))}
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/80 transition-colors"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </button>
          <div className="relative w-full max-w-4xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedPhoto.src || "/placeholder.svg"}
              alt={selectedPhoto.alt}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default PhotoGallery

