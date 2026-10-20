import { GoogleGenAI } from "@google/genai";

// POST /api/ai/generate  (auth)
export const generateBlogContent = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic || topic.trim().length < 3) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Topic is required (min 3 characters)",
        });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res
        .status(500)
        .json({
          success: false,
          message: "AI service is not configured (missing GEMINI_API_KEY)",
        });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `You are a professional blog writer. Generate a complete, engaging blog post about: "${topic}"

Return ONLY a valid JSON object (no markdown, no code fences) with exactly these fields:
{
  "title": "An engaging, SEO-friendly blog title",
  "subTitle": "A compelling one-line subtitle or tagline",
  "description": "The full blog post content in HTML format using <h2>, <p>, <ul>, <li>, <strong> tags. Write at least 400 words with 4-6 sections.",
  "category": "One of: Technology, Startup, Business, Lifestyle"
}`;

    const result = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    const text = result.text.trim();

    // Strip markdown code fences if model adds them
    const jsonStr = text
      .replace(/^```(?:json)?\n?/, "")
      .replace(/\n?```$/, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch {
      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON. Please try again.",
      });
    }

    const { title, subTitle, description, category } = parsed;
    if (!title || !description || !category) {
      return res.status(500).json({
        success: false,
        message: "AI response missing required fields. Please try again.",
      });
    }

    return res.json({ success: true, title, subTitle, description, category });
  } catch (error) {
    console.error("AI GENERATE ERROR:", error);
    // Friendly messages for common Gemini errors
    if (error.message?.includes("API_KEY_INVALID")) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Gemini API key" });
    }
    if (error.message?.includes("QUOTA_EXCEEDED") || error.status === 429) {
      return res
        .status(429)
        .json({
          success: false,
          message: "AI quota exceeded. Try again later.",
        });
    }
    if (error.status === 503 || error.message?.includes("UNAVAILABLE") || error.message?.includes("high demand")) {
      return res
        .status(503)
        .json({
          success: false,
          message: "AI service is temporarily unavailable due to high demand. Please try again in a moment.",
        });
    }
    return res
      .status(500)
      .json({
        success: false,
        message: "AI generation failed: " + error.message,
      });
  }
};
