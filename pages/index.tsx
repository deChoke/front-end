"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, MapPin, Beer, PartyPopper } from "lucide-react"
import ScrollAnimation from "@/components/scroll-animation"

interface Event {
  id: string
  title: string
  date: string // DD-MM-YYYY formaat
  time: string
  description: string
  image: string
}

export default function Home() {
  const [nextEvent, setNextEvent] = useState<Event | null>(null)
  useEffect(() => {
    async function fetchNextEvent() {
      try {
        const response = await fetch("/api/events")
        const data: Event[] = await response.json()
  
        const today = new Date().setHours(0, 0, 0, 0)
  
        const parseEuropeanDate = (dateStr: string) => {
          const [day, month, year] = dateStr.split("/").map(Number)
          return new Date(year, month - 1, day)
        }
  
        const upcomingEvents = data
          .map(event => ({ ...event, parsedDate: parseEuropeanDate(event.date) }))
          .filter(event => event.parsedDate.setHours(0, 0, 0, 0) >= today)
          .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime())
  
        if (upcomingEvents.length > 0) {
          setNextEvent(upcomingEvents[0])
        }
      } catch (error) {
        console.error("Fout bij ophalen van het volgende event:", error)
      }
    }
  
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
  
    fetchNextEvent() // Haal het volgende event op
    animateElements() // Start de animatiecontrole
  
    window.addEventListener("scroll", animateElements)
    return () => window.removeEventListener("scroll", animateElements)
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/DSC06889.JPG" alt="Jeugdhuis De Choke Event" fill className="object-cover" priority />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <ScrollAnimation delay="1">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Jeugdhuis De Choke</h1>
          </ScrollAnimation>

          <ScrollAnimation delay="2">
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Tot in de week 's nachts
            </p>
          </ScrollAnimation>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center animate-bounce">
          <ArrowRight className="h-10 w-10 text-white rotate-90" />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=800&width=600"
                  alt="Foto van het gebouw"
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollAnimation>

            <div>
              
              <ScrollAnimation>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Welkom bij Jeugdhuis De Choke</h2>
              </ScrollAnimation>
              <ScrollAnimation delay="1">
                <div className="flex items-center text-gray-600 mb-6">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  <span>Asbroek 2, 2230 Herselt</span>
                </div>
              </ScrollAnimation>

              <ScrollAnimation delay="2">
                <p className="text-gray-600 mb-6">
                  Jeugdhuis De Choke is dé ontmoetingsplek voor jongeren die op zoek zijn naar een plek om te relaxen,
                  vrienden te ontmoeten en te genieten van een gezellige sfeer.
                </p>
              </ScrollAnimation>

              <ScrollAnimation delay="3">
                <Button asChild className="bg-primary hover:bg-primary/80">
                  <Link href="/events">Ontdek Onze Evenementen</Link>
                </Button>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      <section id="next-event" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">Volgende Evenement</h2>
          </ScrollAnimation>

          {nextEvent ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <ScrollAnimation>
                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                  <Image src={nextEvent.image} alt={nextEvent.title} fill className="object-cover" />
                </div>
              </ScrollAnimation>

              <div>
                <ScrollAnimation>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{nextEvent.title}</h3>
                </ScrollAnimation>

                <ScrollAnimation delay="1">
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    <span>{nextEvent.date}</span>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation delay="1">
                  <div className="flex items-center text-gray-600 mb-2">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    <span>{nextEvent.time}</span>
                  </div>
                </ScrollAnimation>

               

                <ScrollAnimation delay="2">
                  <Button asChild className="bg-primary hover:bg-primary/80">
                    <Link href={`/events/${nextEvent.id}`}>Meer Info</Link>
                  </Button>
                </ScrollAnimation>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600">Kom wat later terug om ons volgend evenementen te checken</p>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">Wat Maakt Ons Bijzonder</h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollAnimation>
              <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-md h-full">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Geweldige Evenementen</h3>
                <p className="text-gray-600">
                Van thema-avonden tot uitdagende toernooien en live optredens: wij organiseren allerlei onvergetelijke avonden die je niet wilt missen.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay="1">
              <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-md h-full">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Beer className="h-8 w-8 text-primary"/>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Betaalbare Drankjes</h3>
                <p className="text-gray-600">
                  Geniet van een breed assortiment aan studentvriendelijke prijzen. Want ja, wie betaalt er nu graag meer dan nodig?
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay="2">
              <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-md h-full">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <PartyPopper className="h-8 w-8 text-primary"/>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Toffe Sfeer</h3>
                <p className="text-gray-600">
                  Een warme, verwelkomende omgeving waar iedereen zich thuis voelt en nieuwe vrienden kan maken.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </>
  )
}

