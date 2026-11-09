export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, pollUrl } = req.body;
  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

  if (!REPLICATE_API_TOKEN) {
    return res.status(500).json({ error: 'Replicate API Token is missing.' });
  }

  try {
    // Check status of existing prediction
    if (pollUrl) {
      const checkRes = await fetch(pollUrl, {
        headers: { "Authorization": `Token ${REPLICATE_API_TOKEN}` }
      });
      const data = await checkRes.json();
      return res.status(200).json(data);
    }

    // Start new music generation prediction
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "b05b1d2681564601810b176370428654d2e557494f7f76d231b5d4e64a3efebd",
        input: {
          prompt: prompt,
          duration: 15,
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
