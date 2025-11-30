function normalize(text) {
  return text
    .replace(/[^\w\s]/g, "") // remove punctuation
    .toLowerCase()
    .trim();
}

function wordsArray(text) {
  if (!text) return [];
  return normalize(text).split(/\s+/).filter(Boolean);
}

function getAddedRemoved(oldText, newText) {
  const oldWords = wordsArray(oldText);
  const newWords = wordsArray(newText);

  const oldCount = {};
  const newCount = {};

  oldWords.forEach((w) => (oldCount[w] = (oldCount[w] || 0) + 1));
  newWords.forEach((w) => (newCount[w] = (newCount[w] || 0) + 1));

  const added = [];
  const removed = [];

  // Find added words
  for (const w of Object.keys(newCount)) {
    if (!oldCount[w] || newCount[w] > oldCount[w]) {
      added.push(w);
    }
  }

  // Find removed words
  for (const w of Object.keys(oldCount)) {
    if (!newCount[w] || oldCount[w] > newCount[w]) {
      removed.push(w);
    }
  }

  return {
    addedWords: [...new Set(added)],
    removedWords: [...new Set(removed)],
    oldLength: oldText ? oldText.length : 0,
    newLength: newText ? newText.length : 0,
  };
}

module.exports = { getAddedRemoved };