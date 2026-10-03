let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// Returns notes whose text contains the word (ignoring case)
function searchNotes(word) {
  const search = word.toLowerCase();
  return notes.filter(function (note) {
    return note.text.toLowerCase().includes(search);
  });
}

// Returns the note with the most characters, or null if there are none
function longestNote() {
  if (notes.length === 0) {
    return null;
  }
  let longest = notes[0];
  for (const note of notes) {
    if (note.text.length > longest.text.length) {
      longest = note;
    }
  }
  return longest;
}

// Returns an object counting notes per category
function countByCategory() {
  const counts = {};
  for (const note of notes) {
    if (counts[note.category]) {
      counts[note.category] += 1;
    } else {
      counts[note.category] = 1;
    }
  }
  return counts;
}

// Returns a sentence such as "5 notes: 2 personal, 1 work, 2 study."
function getSummary() {
  const counts = countByCategory();
  const total = notes.length;
  const word = total === 1 ? "note" : "notes";
  const order = ["personal", "work", "study"];
  const parts = [];

  for (const category of order) {
    if (counts[category]) {
      parts.push(`${counts[category]} ${category}`);
    }
  }

  if (parts.length === 0) {
    return `${total} ${word}.`;
  }
  return `${total} ${word}: ${parts.join(", ")}.`;
}

// Cleans text so comparisons ignore case and extra spaces
function normalize(text) {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

// Returns true if a note with the same text already exists
function isDuplicate(text) {
  const clean = normalize(text);
  return notes.some(function (note) {
    return normalize(note.text) === clean;
  });
}

// Adds a note if it is valid. Returns true when added, false otherwise.
function addNote(text, category) {
  const cleanText = typeof text === "string" ? text.trim() : "";

  if (cleanText.length < 1 || cleanText.length > 200) {
    console.log("Not added: text must be 1 to 200 characters.");
    return false;
  }
  if (isDuplicate(cleanText)) {
    console.log("Not added: that note already exists.");
    return false;
  }
  if (!["personal", "work", "study"].includes(category)) {
    console.log("Not added: category must be personal, work or study.");
    return false;
  }

  let newId = 1;
  for (const note of notes) {
    if (note.id >= newId) {
      newId = note.id + 1;
    }
  }
  notes.push({ id: newId, text: cleanText, category: category });
  console.log("Added: " + cleanText);
  return true;
}

// ---------- Tests ----------
console.log("--- searchNotes ---");
console.log(searchNotes("the"));   // notes 2 and 3
console.log(searchNotes("CALL"));  // note 5 (ignores case)
console.log(searchNotes("xyz"));   // []

console.log("--- longestNote ---");
console.log(longestNote());        // note 3 (longest text)
const savedNotes = notes;
notes = [];
console.log(longestNote());        // null
notes = savedNotes;

console.log("--- countByCategory ---");
console.log(countByCategory());    // { personal: 2, study: 2, work: 1 }

console.log("--- getSummary ---");
console.log(getSummary());         // 5 notes: 2 personal, 1 work, 2 study.

console.log("--- isDuplicate ---");
console.log(isDuplicate("call mum"));          // true
console.log(isDuplicate("  BUY  milk and bread ")); // true (extra spaces)
console.log(isDuplicate("Walk the dog"));      // false

console.log("--- addNote ---");
console.log(addNote("Walk the dog", "personal"));  // true
console.log(addNote("call mum", "personal"));      // false (duplicate)
console.log(addNote("", "work"));                  // false (too short)
console.log(addNote("a".repeat(201), "work"));     // false (too long)
console.log(addNote("Plan holiday", "fun"));       // false (bad category)
console.log(getSummary());                         // 6 notes: 3 personal, 1 work, 2 study.
