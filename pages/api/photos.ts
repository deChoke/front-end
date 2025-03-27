import type { NextApiRequest, NextApiResponse } from "next"

let cachedPhotos: any = null
let lastFetchTime = 0
const CACHE_DURATION = 60 * 1000

const ALBUM_ID = process.env.FACEBOOK_ALBUM_ID
const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const now = Date.now()
  
    if (cachedPhotos && (now - lastFetchTime < CACHE_DURATION)) {
      return res.status(200).json(cachedPhotos)
    }
  
    try {
      const url = `https://graph.facebook.com/v19.0/${ALBUM_ID}/photos?fields=id,images,created_time&access_token=${ACCESS_TOKEN}`
      const response = await fetch(url)
      const data = await response.json()
  
      if (!data || !data.data) {
        return res.status(500).json({ error: "Kan geen foto's ophalen" })
      }
  
      const photos = data.data.map((photo: any) => ({
        id: photo.id,
        url: photo.images[0]?.source || "/images/default-photo.jpg",
        created_time: photo.created_time,
      }))
  
      // Cache de resultaten
      cachedPhotos = photos
      lastFetchTime = now
  
      res.status(200).json(photos)
    } catch (error) {
      console.error("Error fetching photos:", error)
      res.status(500).json({ error: "Fout bij ophalen van foto's" })
    }
  }