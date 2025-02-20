document.addEventListener("mouseup", () => {
  try {
    const selectedText = window.getSelection().toString().trim();
    if (!selectedText) return;

    // Store directly to chrome.storage
    chrome.storage.local.set({ selectedText: selectedText }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error storing text:", chrome.runtime.lastError);
      }
    });
  } catch (error) {
    console.error("Error in content script:", error);
  }
});
