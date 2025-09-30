import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ScrollAnimation from "@/components/scroll-animation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

export default function EventDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  interface Event {
    title: string;
    description: string;
    date: string;
    time: string;
    image: string;
  }

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && typeof id === "string") {
      async function fetchEvent() {
        try {
          console.log("Fetching event:", `/api/events/${id}`); 
          const response = await fetch(`/api/events/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log("Ontvangen event data:", data);
          setEvent(data);
        } catch (error) {
          console.error("Fout bij ophalen van evenement:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchEvent();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Image 
          src="/images/logo zwart.png" 
          alt="Loading" 
          width={90} 
          height={90} 
          className="animate-bounce"
        />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-center text-gray-600 text-lg">Evenement niet gevonden.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow relative">
        <div className="absolute top-16 left-6 z-10">
          
        </div>
        <section className="pt-24 pb-16 bg-gray-50">
        <Link
            href="/events"
            className="inline-flex items-center bg-primary text-white ml-5 mb-6 px-4 py-2 rounded-lg hover:bg-primary/80 transition"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Terug
          </Link>
          <div className="container mx-auto px-6 lg:px-20">
            <ScrollAnimation>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-8">
                {event.title}
              </h1>
            </ScrollAnimation>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <ScrollAnimation delay="1">
                  <Image 
                    src={event.image} 
                    alt={event.title} 
                    width={600} 
                    height={400} 
                    className="rounded-lg shadow-lg"
                  />
                </ScrollAnimation>
              </div>
              <div className="flex flex-col">
                <ScrollAnimation delay="2" className="order-2 lg:order-1">
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
                    {event.description}
                  </p>
                </ScrollAnimation>
                <ScrollAnimation delay="3" className="order-1 lg:order-2">
                  <p className="text-md mb-5 md:text-lg text-gray-500">
                    <div className="flex items-center text-gray-500 mb-2">
                      <Calendar className="h-5 w-5 mr-2 text-primary"/>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-500 mb-2">
                      <Clock className="h-5 w-5 mr-2 text-primary" />
                      <span>{event.time}</span>
                    </div>
                  </p>
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}