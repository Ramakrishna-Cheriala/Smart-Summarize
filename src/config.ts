export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Validate API key exists
if (!GEMINI_API_KEY) {
  console.error("Gemini API key not found in environment variables");
}
