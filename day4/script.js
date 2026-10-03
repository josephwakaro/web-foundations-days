const textarea = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const clearBtn = document.getElementById("clear-btn");
const themeBtn = document.getElementById("theme-toggle");

const MAX_CHARS = 200;
const WARNING_AT = 180;

function updateCounts() {
  const text = textarea.value;
  const length = text.length;
  const trimmed = text.trim();
  const words = trimmed === "" ? 0 : trimmed.split(/\s+/).length;

  charCount.textContent = `${length} / ${MAX_CHARS} characters`;
  wordCount.textContent = `${words} words`;

  charCount.classList.toggle("warning", length > WARNING_AT);
  charCount.classList.toggle("over", length > MAX_CHARS);
}

function saveDraft() {
  try {
    localStorage.setItem("draft", textarea.value);
  } catch (error) {
    console.log("Could not save draft:", error);
  }
}

function clearAll() {
  textarea.value = "";
  try {
    localStorage.removeItem("draft");
  } catch (error) {
    console.log("Could not remove draft:", error);
  }
  updateCounts();
}

function updateThemeLabel() {
  themeBtn.textContent = document.body.classList.contains("dark")
    ? "Light mode"
    : "Dark mode";
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch (error) {
    console.log("Could not save theme:", error);
  }
  updateThemeLabel();
}

// Events
textarea.addEventListener("input", function () {
  updateCounts();
  saveDraft();
});

textarea.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    clearAll();
  }
});

clearBtn.addEventListener("click", clearAll);
themeBtn.addEventListener("click", toggleTheme);

// On page load: restore draft and theme, then update counters
try {
  const savedDraft = localStorage.getItem("draft");
  if (savedDraft !== null) {
    textarea.value = savedDraft;
  }
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
} catch (error) {
  console.log("Could not read saved data:", error);
}

updateThemeLabel();
updateCounts();
