export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, pollUrl } = req.body || {};
  const token = process.env.REPLICATE_API_TOKEN;

  if (!token) {
    return res.status(500).json({ error: 'Replicate API Key is missing in Vercel.' });
  }

  try {
    if (pollUrl) {
      const checkRes = await fetch(pollUrl, {
        headers: { 
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json"
        }
      });
      const data = await checkRes.json();
      return res.status(200).json(data);
    }

    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "6715d0ee0a17ed9075bef10688d02194d6e9a8b3e20601614804764b882688d6",
        input: {
          prompt: prompt || "relaxing background piano music",
          duration: 10,
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
