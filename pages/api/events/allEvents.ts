import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const PAGE_ID = process.env.FACEBOOK_EVENTS_ID
  const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN

  const urlAllEvents = `https://graph.facebook.com/v22.0/${PAGE_ID}/events?fields=id,name,description,start_time,cover&access_token=${ACCESS_TOKEN}`
  
  // Set caching headers
  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400')

  try {

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
      image: event.cover?.source || "Geen afbeelding beschikbaar",
      description: event.description || "Geen beschrijving beschikbaar",
    }))

    res.status(200).json(events)
  } catch (error) {
    res.status(500).json({ error: "Kon evenementen niet ophalen." })
  }
}