"use strict";

// ======================================
// 1. PAGE NAVIGATION
// ======================================

const pages = document.querySelectorAll(".page");

function showPage(pageId) {
  const target = document.getElementById(pageId);
  if (!target) return;

  pages.forEach(page => page.classList.remove("active"));
  target.classList.add("active");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-page]").forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});

// ======================================
// 2. FLOWER-BLOOMING CELEBRATION
// No voice or background music.
// ======================================

const flowerContainer = document.getElementById("flower-rain");
const celebrateButton = document.getElementById("celebrate-btn");

const flowerSymbols = ["🌸", "🌷", "💜", "🌺", "✿", "🌼"];

celebrateButton.addEventListener("click", () => {
  showPage("celebrate");
  createFlowerShower();
});

function createFlowerShower() {
  // Clear any flowers left from an earlier celebration.
  flowerContainer.replaceChildren();

  // Create flowers that fall from the top to the bottom.
  for (let i = 0; i < 55; i++) {
    const flower = document.createElement("span");
    flower.className = "falling-flower";
    flower.textContent =
      flowerSymbols[Math.floor(Math.random() * flowerSymbols.length)];

    flower.style.left = `${Math.random() * 100}%`;
    flower.style.fontSize = `${16 + Math.random() * 22}px`;
    flower.style.animationDuration = `${3.5 + Math.random() * 4}s`;
    flower.style.animationDelay = `${Math.random() * 3}s`;
    flower.style.setProperty(
      "--drift",
      `${Math.round(Math.random() * 150 - 75)}px`
    );

    flowerContainer.appendChild(flower);
  }

  // Remove the animation elements after the shower finishes.
  window.setTimeout(() => {
    flowerContainer.replaceChildren();
  }, 11000);
}

// ======================================
// 3. GUESS MIRAB! — 10 QUESTIONS
// ======================================

// The first six correct answers use the details provided.
// Questions 7–10 are sample questions; edit them to match Mirab.

const questions = [
  {
    question: "What is Mirab's favourite food?",
    options: ["Pizza", "Noodles", "Burgers", "Biryani"],
    answer: "Noodles"
  },
  {
    question: "Which game is Mirab's favourite?",
    options: ["Cricket", "Ludo", "Football", "Chess"],
    answer: "Ludo"
  },
  {
    question: "What is Mirab's favourite colour?",
    options: ["Pink", "Blue", "Purple", "Green"],
    answer: "Purple"
  },
  {
    question: "How old is Mirab turning?",
    options: ["8 years", "9 years", "10 years", "11 years"],
    answer: "10 years"
  },
  {
    question: "Which word best describes Mirab's nature?",
    options: ["Always sleepy", "Moody", "Always quiet", "Shy"],
    answer: "Moody"
  },
  {
    question: "What is Mirab's favourite drink?",
    options: ["Orange juice", "Milkshake", "Coca-Cola", "Lemonade"],
    answer: "Coca-Cola"
  },
  {
    question: "Which dessert might Mirab choose?",
    options: ["Chocolate cake", "Carrot cake", "Fruit salad", "Ice lolly"],
    answer: "Chocolate cake"
  },
  {
    question: "Which animal might Mirab like?",
    options: ["Cat", "Giraffe", "Penguin", "Dolphin"],
    answer: "Cat"
  },
  {
    question: "Which season might Mirab prefer?",
    options: ["Summer", "Winter", "Autumn", "Spring"],
    answer: "Winter"
  },
  {
    question: "Mirab birthday date?",
    options: ["15-0ct", "16-oct", "17-oct", "18-oct"],
    answer: "17-oct"
  }
];

let currentQuestion = 0;
let score = 0;
let questionAnswered = false;

const questionCount = document.getElementById("question-count");
const scoreLive = document.getElementById("score-live");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");
const feedback = document.getElementById("answer-feedback");
const progressBar = document.getElementById("progress-bar");
const nextButton = document.getElementById("next-question");
const quizBox = document.getElementById("quiz-box");
const quizResult = document.getElementById("quiz-result");

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  questionAnswered = false;

  quizBox.hidden = false;
  quizResult.hidden = true;

  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentQuestion];
  questionAnswered = false;

  questionCount.textContent =
    `QUESTION ${currentQuestion + 1} OF ${questions.length}`;

  scoreLive.textContent = `Score: ${score}`;
  questionText.textContent = q.question;
  progressBar.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  feedback.textContent = "";
  nextButton.hidden = true;
  nextButton.textContent =
    currentQuestion === questions.length - 1
      ? "See My Result ✨"
      : "Next Question →";

  optionsContainer.replaceChildren();

  q.options.forEach(option => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-btn";
    button.textContent = option;

    button.addEventListener("click", () => {
      checkAnswer(option, button);
    });

    optionsContainer.appendChild(button);
  });
}

function checkAnswer(selected, selectedButton) {
  if (questionAnswered) return;
  questionAnswered = true;

  const correctAnswer = questions[currentQuestion].answer;
  const allButtons = optionsContainer.querySelectorAll(".option-btn");

  allButtons.forEach(button => {
    button.disabled = true;

    if (button.textContent === correctAnswer) {
      button.classList.add("correct");
    }
  });

  if (selected === correctAnswer) {
    score++;
    feedback.textContent = "Correct! You know Mirab well! 💜";
  } else {
    selectedButton.classList.add("incorrect");
    feedback.textContent = `Not quite! The answer is ${correctAnswer}.`;
  }

  scoreLive.textContent = `Score: ${score}`;
  nextButton.hidden = false;
}

nextButton.addEventListener("click", () => {
  if (!questionAnswered) return;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showQuizResult();
  }
});

function showQuizResult() {
  quizBox.hidden = true;
  quizResult.hidden = false;

  document.getElementById("final-score").textContent =
    `Your score: ${score} out of ${questions.length}`;

  if (score >= 5) {
    document.getElementById("result-title").textContent =
      "You Know Mirab Well! 💜";

    document.getElementById("result-message").textContent =
      "Aww! You know Mirab and her little world. Keep making beautiful memories together!";
  } else {
    document.getElementById("result-title").textContent =
      "Get to Know Mirab Better! 🌷";

    document.getElementById("result-message").textContent =
      "You don't know Mirab too much just yet! Spend more time together and discover all her favourite things.";
  }
}

document.getElementById("restart-quiz").addEventListener("click", startQuiz);

// ======================================
// 4. SAFE LOCAL STORAGE HELPERS
// Each browser has its own separate entries.
// ======================================

function readEntries(key) {
  try {
    const saved = localStorage.getItem(key);
    const entries = saved ? JSON.parse(saved) : [];
    return Array.isArray(entries) ? entries : [];
  } catch (error) {
    return [];
  }
}

function saveEntry(key, entry) {
  try {
    const entries = readEntries(key);
    entries.unshift(entry);
    localStorage.setItem(key, JSON.stringify(entries));
    return true;
  } catch (error) {
    alert("Your browser could not save this entry. Please check your browser storage settings.");
    return false;
  }
}

function addTextElement(parent, tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = text;
  parent.appendChild(element);
  return element;
}

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

// ======================================
// 5. BIRTHDAY WISHES
// ======================================

const wishForm = document.getElementById("wish-form");

wishForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("wish-name").value.trim();
  const message = document.getElementById("wish-message").value.trim();

  if (!name || !message) return;

  const saved = saveEntry("mirabBirthdayWishes", {
    name,
    message,
    date: Date.now()
  });

  if (saved) {
    wishForm.reset();
    renderWishes();
    document.getElementById("wish-list").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
});

function renderWishes() {
  const list = document.getElementById("wish-list");
  const wishes = readEntries("mirabBirthdayWishes");

  list.replaceChildren();

  document.getElementById("wish-count").textContent =
    `${wishes.length} ${wishes.length === 1 ? "wish" : "wishes"}`;

  if (wishes.length === 0) {
    addTextElement(
      list,
      "p",
      "empty-message",
      "No wishes yet. Be the first to send Mirab some love! 💜"
    );
    return;
  }

  wishes.forEach(wish => {
    const card = document.createElement("article");
    card.className = "entry-card";

    addTextElement(card, "h4", "", `💌 ${wish.name}`);
    addTextElement(card, "p", "", wish.message);
    addTextElement(card, "span", "entry-date", formatDate(wish.date));

    list.appendChild(card);
  });
}

// ======================================
// 6. ADVICE FOR MIRAB
// ======================================

const adviceForm = document.getElementById("advice-form");

adviceForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("advice-name").value.trim();
  const message = document.getElementById("advice-message").value.trim();

  if (!name || !message) return;

  const saved = saveEntry("mirabBirthdayAdvice", {
    name,
    message,
    date: Date.now()
  });

  if (saved) {
    adviceForm.reset();
    renderAdvice();
    document.getElementById("advice-list").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
});

function renderAdvice() {
  const list = document.getElementById("advice-list");
  const entries = readEntries("mirabBirthdayAdvice");

  list.replaceChildren();

  document.getElementById("advice-count").textContent =
    `${entries.length} ${entries.length === 1 ? "note" : "notes"}`;

  if (entries.length === 0) {
    addTextElement(
      list,
      "p",
      "empty-message",
      "A little space for thoughtful advice and kind words. 🌷"
    );
    return;
  }

  entries.forEach(entry => {
    const card = document.createElement("article");
    card.className = "entry-card";

    addTextElement(card, "h4", "", `🌷 From ${entry.name}`);
    addTextElement(card, "p", "", entry.message);
    addTextElement(card, "span", "entry-date", formatDate(entry.date));

    list.appendChild(card);
  });
}

// ======================================
// 7. INITIALIZE THE WEBSITE
// ======================================

startQuiz();
renderWishes();
renderAdvice();