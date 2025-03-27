import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const PAGE_ID = process.env.FACEBOOK_EVENTS_ID
  const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN

  const url = `https://graph.facebook.com/v19.0/${PAGE_ID}/events?fields=id,name,description,start_time,cover&access_token=${ACCESS_TOKEN}`

  try {
    const response = await fetch(url)
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

    res.status(200).json(events)
  } catch (error) {
    res.status(500).json({ error: "Kon evenementen niet ophalen." })
  }
}
