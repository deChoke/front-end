"use client"

import { useEffect } from "react"
import ScrollAnimation from "@/components/scroll-animation"
import PhotoGallery from "@/components/photo-gallery"

// Mock data for photo galleries
const photoGalleries = [
  {
    id: "choke-saloon-2023",
    title: "Choke Saloon 2023",
    date: "24 juni 2023",
    photos: [
      { id: "cs1", src: "/placeholder.svg?height=600&width=800", alt: "Choke Saloon 2023 - 1" },
      { id: "cs2", src: "/placeholder.svg?height=600&width=800", alt: "Choke Saloon 2023 - 2" },
      { id: "cs3", src: "/placeholder.svg?height=600&width=800", alt: "Choke Saloon 2023 - 3" },
      { id: "cs4", src: "/placeholder.svg?height=600&width=800", alt: "Choke Saloon 2023 - 4" },
      { id: "cs5", src: "/placeholder.svg?height=600&width=800", alt: "Choke Saloon 2023 - 5" },
      { id: "cs6", src: "/placeholder.svg?height=600&width=800", alt: "Choke Saloon 2023 - 6" },
    ],
  },
  {
    id: "summer-vibes-2023",
    title: "Summer Vibes 2023",
    date: "15 juli 2023",
    photos: [
      { id: "sv1", src: "/placeholder.svg?height=600&width=800", alt: "Summer Vibes 2023 - 1" },
      { id: "sv2", src: "/placeholder.svg?height=600&width=800", alt: "Summer Vibes 2023 - 2" },
      { id: "sv3", src: "/placeholder.svg?height=600&width=800", alt: "Summer Vibes 2023 - 3" },
      { id: "sv4", src: "/placeholder.svg?height=600&width=800", alt: "Summer Vibes 2023 - 4" },
      { id: "sv5", src: "/placeholder.svg?height=600&width=800", alt: "Summer Vibes 2023 - 5" },
      { id: "sv6", src: "/placeholder.svg?height=600&width=800", alt: "Summer Vibes 2023 - 6" },
    ],
  },
  {
    id: "halloween-2023",
    title: "Halloween Horror 2023",
    date: "31 oktober 2023",
    photos: [
      { id: "hw1", src: "/placeholder.svg?height=600&width=800", alt: "Halloween Horror 2023 - 1" },
      { id: "hw2", src: "/placeholder.svg?height=600&width=800", alt: "Halloween Horror 2023 - 2" },
      { id: "hw3", src: "/placeholder.svg?height=600&width=800", alt: "Halloween Horror 2023 - 3" },
      { id: "hw4", src: "/placeholder.svg?height=600&width=800", alt: "Halloween Horror 2023 - 4" },
      { id: "hw5", src: "/placeholder.svg?height=600&width=800", alt: "Halloween Horror 2023 - 5" },
      { id: "hw6", src: "/placeholder.svg?height=600&width=800", alt: "Halloween Horror 2023 - 6" },
    ],
  },
  {
    id: "new-year-2024",
    title: "New Year's Bash 2024",
    date: "31 december 2023",
    photos: [
      { id: "ny1", src: "/placeholder.svg?height=600&width=800", alt: "New Year's Bash 2024 - 1" },
      { id: "ny2", src: "/placeholder.svg?height=600&width=800", alt: "New Year's Bash 2024 - 2" },
      { id: "ny3", src: "/placeholder.svg?height=600&width=800", alt: "New Year's Bash 2024 - 3" },
      { id: "ny4", src: "/placeholder.svg?height=600&width=800", alt: "New Year's Bash 2024 - 4" },
      { id: "ny5", src: "/placeholder.svg?height=600&width=800", alt: "New Year's Bash 2024 - 5" },
      { id: "ny6", src: "/placeholder.svg?height=600&width=800", alt: "New Year's Bash 2024 - 6" },
    ],
  },
]

export default function PhotosPage() {
  // Initialize scroll animations
  useEffect(() => {
    const animateElements = () => {
      const elements = document.querySelectorAll(".animate-on-scroll")
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const isVisible = rect.top <= window.innerHeight * 0.8
        if (isVisible) {
          element.classList.add("visible")
        }
      })
    }

    // Run once on load
    animateElements()

    // Add scroll event listener
    window.addEventListener("scroll", animateElements)
    return () => window.removeEventListener("scroll", animateElements)
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-white/0 opacity-70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimation>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 text-center mb-6">Photo Gallery</h1>
          </ScrollAnimation>
          <ScrollAnimation delay="1">
            <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Bekijk foto's van onze vorige events en herbeleef de geweldige momenten bij Jeugdhuis De Choke!
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Photo Galleries */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {photoGalleries.map((gallery) => (
            <PhotoGallery key={gallery.id} title={gallery.title} date={gallery.date} photos={gallery.photos} />
          ))}
        </div>
      </section>
    </>
  )
}