// api/generate.js
// This is a Vercel Serverless Function.
// It sits between your React app and the Anthropic API.
// Your ANTHROPIC_API_KEY is stored as a Vercel environment variable —
// it never reaches the user's browser.

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured. Add ANTHROPIC_API_KEY to your Vercel environment variables." });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "Anthropic API error",
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("API proxy error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
