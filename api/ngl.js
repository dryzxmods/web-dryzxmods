export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { username, message } = req.body;
  if (!username || !message) return res.status(400).json({ error: "Missing data" });

  const deviceId = crypto.randomUUID();
  const response = await fetch("https://ngl.link/api/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://ngl.link",
      "Referer": `https://ngl.link/${username}`,
      "User-Agent": "Mozilla/5.0 (Linux; Android 13; Pixel 6)",
    },
    body: `username=${encodeURIComponent(username)}&question=${encodeURIComponent(message)}&deviceId=${encodeURIComponent(deviceId)}`
  });

  const text = await response.text();
  res.status(response.status).json({ ok: response.ok, body: text });
}
