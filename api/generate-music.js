export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;
  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

  if (!REPLICATE_API_TOKEN) {
    return res.status(500).json({ error: 'Replicate API Token is missing in Vercel Environment Variables.' });
  }

  try {
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

    if (prediction.error) {
      return res.status(500).json({ error: prediction.error });
    }

    const pollUrl = prediction.urls && prediction.urls.get ? prediction.urls.get : `https://api.replicate.com/v1/predictions/${prediction.id}`;

    let songResult = prediction;
    while (songResult.status !== "succeeded" && songResult.status !== "failed") {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const checkRes = await fetch(pollUrl, {
        headers: { "Authorization": `Token ${REPLICATE_API_TOKEN}` }
      });
      songResult = await checkRes.json();
    }

    if (songResult.status === "succeeded") {
      return res.status(200).json({ audio_url: songResult.output });
    } else {
      return res.status(500).json({ error: songResult.error || "Music generation failed" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
