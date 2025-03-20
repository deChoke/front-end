import { useEffect, useState } from "react"
import ScrollAnimation from "@/components/scroll-animation"
import EventCard from "@/components/event-card"
import Image from "next/image"

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/events")
        const data = await response.json()
  
        // Huidige datum verkrijgen zonder tijd
        const today = new Date().setHours(0, 0, 0, 0)
  
        // Functie om DD-MM-YYYY naar een correcte Date om te zetten
        const parseEuropeanDate = (dateStr: string) => {
          const [day, month, year] = dateStr.split("/").map(Number) // Split de datum
          return new Date(year, month - 1, day) // Maand is 0-gebaseerd in JavaScript
        }
  
        // Filter evenementen met een datum in de toekomst
        const upcomingEvents = data
        .map(event => ({ ...event, parsedDate: parseEuropeanDate(event.date) })) // Voeg geparste datum toe
        .filter(event => event.parsedDate.setHours(0, 0, 0, 0) >= today) // Filter op datum
        .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime()) // Sorteer op datum
  
        setEvents(upcomingEvents)
      } catch (error) {
        console.error("Fout bij ophalen van evenementen:", error)
      } finally {
        setLoading(false)
      }
    }
  
    fetchEvents()
  }, [])

  function truncateDescription(description: string, maxLength: number) {
    if (description.length <= maxLength) return description;
    const truncated = description.slice(0, maxLength);
    return truncated.slice(0, truncated.lastIndexOf(" ")) + "...";
  }

  return (
    <>
      <section className="relative pt-32 bg-white">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-primary/10 to-white/0 opacity-70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimation>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 text-center mb-6">Upcoming Events</h1>
          </ScrollAnimation>
          <ScrollAnimation delay="1">
            <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Ontdek al onze komende events bij Jeugdhuis De Choke en mis niets van de actie!
            </p>
          </ScrollAnimation>
        </div>
      </section>

      <section className="pb-20 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Image 
                src="/images/logo zwart.png" 
                alt="Loading" 
                width={90} 
                height={90} 
                className="animate-bounce"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.length > 0 ? (
                events.map((event, index) => (
                  <ScrollAnimation key={event.id} delay={String(((index % 3) + 1)) as "1" | "2" | "3"}>
                    <EventCard 
                      {...event} 
                      description={truncateDescription(event.description, 112)} 
                    />
                  </ScrollAnimation>
                ))
              ) : (
                <p className="text-center col-span-3 text-gray-600">Geen evenementen gevonden.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
