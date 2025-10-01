import { url } from "inspector"
import type { NextApiRequest, NextApiResponse } from "next"
import NodeCache from "node-cache"

const cache = new NodeCache({ stdTTL: 600 }) // Cache TTL set to 10 minutes

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const PAGE_ID = process.env.FACEBOOK_EVENTS_ID
  const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN

  const urlAllEvents = `https://graph.facebook.com/v22.0/${PAGE_ID}/events?fields=id,name,description,start_time,cover&access_token=${ACCESS_TOKEN}`
  

  try {
    // Check if events are cached
    const cachedEvents = cache.get("events")
    if (cachedEvents) {
      return res.status(200).json(cachedEvents)
    }

    const response = await fetch(urlAllEvents)
    const data = await response.json()

    if (data.error) {
      return res.status(500).json({ error: data.error.message })
    }

    const events = data.data.map((event: any) => ({
      id: event.id,
      title: event.name,
      date: new Date(event.start_time).toLocaleDateString("nl-BE"),
      time: new Date(event.start_time).toLocaleTimeString("nl-BE", { hour: "2-digit", minute: "2-digit" }),
      location: "Jeugdhuis De Choke",
      image: event.cover?.source || "/images/default-event.jpg",
      description: event.description || "Geen beschrijving beschikbaar",
    }))

    // Cache the events
    cache.set("events", events)

    res.status(200).json(events)
  } catch (error) {
    res.status(500).json({ error: "Kon evenementen niet ophalen." })
  }
}
