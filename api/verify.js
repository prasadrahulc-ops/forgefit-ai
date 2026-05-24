// api/verify.js
// Validates access codes against the ACCESS_CODES environment variable.
// Codes are stored server-side — never exposed to the browser.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const accessCodes = process.env.ACCESS_CODES;
  if (!accessCodes) {
    return res.status(500).json({ valid: false, error: "Access codes not configured." });
  }

  const { code } = req.body;
  if (!code || typeof code !== "string") {
    return res.status(400).json({ valid: false, error: "No code provided." });
  }

  const validCodes = accessCodes
    .split(",")
    .map((c) => c.trim().toUpperCase());

  const isValid = validCodes.includes(code.trim().toUpperCase());

  return res.status(200).json({ valid: isValid });
}
