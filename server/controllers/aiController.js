const axios = require("axios");

const analyzeComplaint = async (req, res, next) => {
  try {
    const { title, description, category, location } = req.body;
    if (!title || !description)
      return res.status(400).json({ success: false, message: "Title and description are required." });

    const prompt = `You are an AI complaint management analyst for a municipal system. Analyze the following complaint and return a JSON object ONLY (no markdown, no explanation).

Complaint Details:
- Title: ${title}
- Category: ${category || "Unspecified"}
- Location: ${location || "Unspecified"}
- Description: ${description}

Return exactly this JSON structure:
{
  "urgency": "<Low|Medium|High|Critical>",
  "department": "<specific responsible department name>",
  "summary": "<2-3 sentence concise summary of the complaint>",
  "autoResponse": "<professional automated response message to the complainant, 3-4 sentences>"
}

Base urgency on: health/safety risk (Critical), infrastructure damage (High), service disruption (Medium), general inconvenience (Low).`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "anthropic/claude-3-haiku",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 600,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.APP_URL || "http://localhost:5000",
          "X-Title": "CivicDesk",
        },
      }
    );

    const raw = response.data.choices[0].message.content.trim();
    let analysis;
    try {
      analysis = JSON.parse(raw);
    } catch {
      const match = raw.match(/\{[\s\S]*\}/);
      analysis = match ? JSON.parse(match[0]) : null;
    }

    if (!analysis)
      return res.status(500).json({ success: false, message: "Failed to parse AI response." });

    res.json({ success: true, data: { ...analysis, analyzedAt: new Date() } });
  } catch (err) {
    next(err);
  }
};

module.exports = { analyzeComplaint };