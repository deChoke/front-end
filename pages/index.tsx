"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, MapPin, Beer, PartyPopper } from "lucide-react"
import ScrollAnimation from "@/components/scroll-animation"

export default function Home() {
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
                <p className="text-gray-600 mb-8">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">Ons Volgende Event</h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <ScrollAnimation>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image src="/images/choke-saloon.png" alt="Foto volgend event" fill className="object-cover" />
              </div>
            </ScrollAnimation>

            <div>
              <ScrollAnimation>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">[volgend event]</h3>
              </ScrollAnimation>

              <ScrollAnimation delay="1">
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  <span>29 juni 2024</span>
                </div>
              </ScrollAnimation>

              <ScrollAnimation delay="1">
                <div className="flex items-center text-gray-600 mb-2">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  <span>20:00 - 02:00</span>
                </div>
              </ScrollAnimation>

              <ScrollAnimation delay="2">
                <p className="text-gray-600 mb-8">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam repudiandae molestiae similique illum cupiditate ab laboriosam eaque saepe excepturi iste et pariatur est, debitis cum, ad aperiam accusantium. At doloremque ad aliquid eveniet laudantium quasi esse nemo explicabo ea? Eius alias omnis, fugiat placeat sit obcaecati similique veniam delectus expedita.
                </p>
              </ScrollAnimation>

              <ScrollAnimation delay="3">
                <Button asChild className="bg-primary hover:bg-primary/80">
                  <Link href="/events/[id]">Meer Info</Link>
                </Button>
              </ScrollAnimation>
            </div>
          </div>
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
                <h3 className="text-xl font-bold text-gray-800 mb-4">Geweldige Events</h3>
                <p className="text-gray-600">
                  Van thema-avonden tot live bandjes tot beerpongtoernooien, we organiseren allerlei evenementen die je niet wilt missen.
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
                  Geniet van een breed assortiment aan studentvriendelijke prijzen.
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

