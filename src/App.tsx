import { useState, useEffect } from "react";

function App() {
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    // Initial load
    chrome.storage.local.get("selectedText", (data) => {
      if (data.selectedText) {
        setSelectedText(data.selectedText);
      }
    });

    // Listen for changes
    chrome.storage.onChanged.addListener((changes) => {
      if (changes.selectedText) {
        setSelectedText(changes.selectedText.newValue);
      }
    });
  }, []);

  return (
    <div className="h-80 w-60 flex flex-col p-4">
      <h1 className="text-xl mb-4">Research Assistant</h1>
      <div className="border p-2 rounded-md flex-1 overflow-auto">
        {selectedText ? selectedText : "Select text on the page to analyze"}
      </div>
    </div>
  );
}

export default App;
