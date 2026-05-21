// api/generate.js
// Uses Google Gemini API (free tier) — 1,500 free requests/day
// Response is converted to match the format App.jsx already expects,
// so no changes needed in the frontend.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "API key not configured. Add GOOGLE_API_KEY to your Vercel environment variables.",
    });
  }

  try {
    // Extract the prompt from the request body
    const messages = req.body.messages || [];
    const prompt = messages[0]?.content || "";

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 2000 },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "Gemini API error",
      });
    }

    // Convert Gemini response to Anthropic-style format so App.jsx works unchanged
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return res.status(200).json({
      content: [{ type: "text", text }],
    });
  } catch (err) {
    console.error("API proxy error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
