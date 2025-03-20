"use client"

import { useEffect } from "react"
import ScrollAnimation from "@/components/scroll-animation"
import EventCard from "@/components/event-card"

// Mock data for events
const events = [
  {
    id: "choke-saloon",
    title: "Choke Saloon",
    date: "29 juni 2024",
    time: "20:00 - 02:00",
    location: "Jeugdhuis De Choke",
    image: "/images/choke-saloon.png",
    description:
      "Stap binnen in het Wilde Westen voor een avond vol cowboy vibes, country muziek en ijskoude drankjes.",
  },
  {
    id: "summer-vibes",
    title: "Summer Vibes",
    date: "20 juli 2024",
    time: "21:00 - 03:00",
    location: "Jeugdhuis De Choke",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Vier de zomer met tropische cocktails, zomerse hits en een sfeer die je direct naar het strand transporteert.",
  },
  {
    id: "retro-night",
    title: "Retro Night",
    date: "10 augustus 2024",
    time: "20:00 - 02:00",
    location: "Jeugdhuis De Choke",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Ga terug in de tijd met muziek uit de jaren '80 en '90. Trek je vintage outfit aan en dans de hele nacht!",
  },
  {
    id: "halloween-horror",
    title: "Halloween Horror",
    date: "31 oktober 2024",
    time: "20:00 - 03:00",
    location: "Jeugdhuis De Choke",
    image: "/placeholder.svg?height=400&width=600",
    description: "Een griezelige avond vol enge kostuums, spookachtige decoraties en speciale Halloween drankjes.",
  },
  {
    id: "winter-wonderland",
    title: "Winter Wonderland",
    date: "21 december 2024",
    time: "19:00 - 01:00",
    location: "Jeugdhuis De Choke",
    image: "/placeholder.svg?height=400&width=600",
    description: "Vier de winter in stijl met warme drankjes, gezellige verlichting en de beste winterhits.",
  },
  {
    id: "new-years-bash",
    title: "New Year's Bash",
    date: "31 december 2024",
    time: "22:00 - 06:00",
    location: "Jeugdhuis De Choke",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Sluit het jaar af met de grootste party van het jaar! Vier het nieuwe jaar met vrienden, muziek en champagne.",
  },
]

export default function EventsPage() {
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
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 text-center mb-6">Upcoming Events</h1>
          </ScrollAnimation>
          <ScrollAnimation delay="1">
            <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Ontdek alle komende events bij Jeugdhuis De Choke en mis niets van de actie!
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <ScrollAnimation key={event.id} delay={String(((index % 3) + 1)) as "1" | "2" | "3"}>
                <EventCard {...event} />
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

