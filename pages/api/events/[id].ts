import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Geen geldig event ID opgegeven" });
  }

  const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

  if (!ACCESS_TOKEN) {
    console.error("FACEBOOK_ACCESS_TOKEN is not set");
    return res.status(500).json({ error: "Server configuratiefout: ontbrekende toegangstoken." });
  }

  const urlOneEvent = `https://graph.facebook.com/v22.0/${id}?fields=id,name,description,start_time,cover&access_token=${ACCESS_TOKEN}`;

  try {
    const response = await fetch(urlOneEvent);
    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const event = {
      id: data.id,
      title: data.name,
      date: new Date(data.start_time).toLocaleDateString("nl-BE"),
      time: new Date(data.start_time).toLocaleTimeString("nl-BE", { hour: "2-digit", minute: "2-digit" }),
      image: data.cover?.source || "/images/default-event.jpg",
      description: data.description || "Geen beschrijving beschikbaar",
    };

    res.status(200).json(event);
  } catch (error) {
    console.error("Fout bij ophalen van evenement:", error);
    res.status(500).json({ error: "Kon evenement niet ophalen." });
  }
}