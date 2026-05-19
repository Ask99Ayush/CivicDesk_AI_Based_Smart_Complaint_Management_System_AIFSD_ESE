const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 600,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = message.content[0].text.trim();
    let analysis;
    try {
      analysis = JSON.parse(raw);
    } catch {
      const match = raw.match(/\{[\s\S]*\}/);
      analysis = match ? JSON.parse(match[0]) : null;
    }

    if (!analysis) return res.status(500).json({ success: false, message: "Failed to parse AI response." });

    res.json({ success: true, data: { ...analysis, analyzedAt: new Date() } });
  } catch (err) {
    next(err);
  }
};

module.exports = { analyzeComplaint };