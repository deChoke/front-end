import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EventCardProps {
  id: string
  title: string
  date: string
  time: string
  image: string
  description: string
}

const EventCard = ({ id, title, date, time, image, description }: EventCardProps) => {
  return (
    <div className="event-card bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md h-full flex flex-col">
      <div className="relative h-48 md:h-64">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold mb-2 text-gray-800">{title}</h3>
        <div className="flex items-center text-gray-500 mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{date}</span>
        </div>
        <div className="flex items-center text-gray-500 mb-2">
          <Clock className="h-4 w-4 mr-2" />
          <span>{time}</span>
        </div>
        <p className="text-gray-600 mb-6 flex-1">{description}</p>
        <div className="mt-auto">
          <Link href={`/events/${id}`}>
            <Button className="w-full bg-primary hover:bg-primary/80">Meer Info</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EventCard

