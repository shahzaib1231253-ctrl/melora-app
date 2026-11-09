export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, pollUrl } = req.body;
  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

  if (!REPLICATE_API_TOKEN) {
    return res.status(500).json({ error: 'Replicate API Key is missing in Vercel Environment Variables.' });
  }

  try {
    // If browser sends pollUrl, just check prediction status (Instant execution)
    if (pollUrl) {
      const checkRes = await fetch(pollUrl, {
        headers: { 
          "Authorization": `Token ${REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json"
        }
      });
      const data = await checkRes.json();
      return res.status(200).json(data);
    }

    // Otherwise start new AI prediction (Instant execution)
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "6715d0ee0a17ed9075bef10688d02194d6e9a8b3e20601614804764b882688d6",
        input: {
          prompt: prompt,
          duration: 12,
          model_version: "stereo-large"
        }
      })
    });

    const prediction = await response.json();
    return res.status(200).json(prediction);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
