import { useState, useEffect } from "react";
import { GEMINI_API_KEY, GEMINI_API_URL } from "./config";
import MDEditor from "@uiw/react-md-editor";

function App() {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the selected text and analyze it automatically
    chrome.storage.local.get("selectedText", async (data) => {
      if (!data.selectedText) {
        setAnalysis("No text selected. Please select some text and reopen.");
        setLoading(false);
        return;
      }
      await analyzeWithGemini(data.selectedText);
    });
  }, []);

  const analyzeWithGemini = async (selectedText: string) => {
    setLoading(true);
    setError("");
    setAnalysis("");

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Please analyze the following text and provide a summary in clean and short form with key insights in the form of bullet points or provide with a solution if the provide text is a question: ${selectedText}`,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      const analysisText =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "No insights found.";
      setAnalysis(analysisText);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-96 h-96 bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col">
      <h1 className="text-2xl font-bold text-gray-200 mb-4">
        Research Assistant
      </h1>

      <div className="flex-1 border p-3 rounded-md bg-gray-700 shadow-sm overflow-auto">
        {loading ? (
          <div className="text-gray-500 animate-pulse">
            🔍 Analyzing text...
          </div>
        ) : error ? (
          <div className="text-red-500">⚠️ Error: {error}</div>
        ) : (
          <div>
            {/* <h2 className="text-lg font-semibold mb-2">🔎 Insights:</h2> */}
            <MDEditor.Markdown source={analysis} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
