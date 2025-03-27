import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ScrollAnimation from "@/components/scroll-animation";
import Image from "next/image";

export default function EventDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  interface Event {
    title: string;
    description: string;
    // Add other event properties here
  }

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      async function fetchEvent() {
        try {
          const response = await fetch(`/api/events/${id}`);
          const data = await response.json();
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
      <div className="flex justify-center items-center h-64">
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
    return <p className="text-center text-gray-600">Evenement niet gevonden.</p>;
  }

  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 text-center mb-6">{event.title}</h1>
        </ScrollAnimation>
        <ScrollAnimation delay="1">
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12">{event.description}</p>
        </ScrollAnimation>
        {/* Add more event details here */}
      </div>
    </section>
  );
}
