const accessCodes = {
  carQuiz: "car-game-quiz-01",
  treasureQuiz: "treasure-game-quiz-02",
  alphabetMatchApp: "alphabet-match-app-03",
  numbersCountingApp: "numbers-counting-app-04",
  colorsShapesApp: "colors-shapes-app-05"
};

const quizData = {
  car: [
    {
      question: "What shape is a car wheel?",
      answers: ["Square", "Circle", "Triangle"],
      correct: "Circle"
    },
    {
      question: "What color means stop at a traffic light?",
      answers: ["Red", "Green", "Blue"],
      correct: "Red"
    },
    {
      question: "What do we wear to stay safe in a car?",
      answers: ["A cape", "A seat belt", "A balloon"],
      correct: "A seat belt"
    }
  ],
  treasure: [
    {
      question: "What do pirates use to find treasure?",
      answers: ["A treasure map", "A pillow", "A spoon"],
      correct: "A treasure map"
    },
    {
      question: "What might be inside a treasure chest?",
      answers: ["Gold coins", "Snow boots", "A sofa"],
      correct: "Gold coins"
    },
    {
      question: "What shines like treasure?",
      answers: ["Mud", "Pebbles", "Jewels"],
      correct: "Jewels"
    }
  ],
  alphabet: [
    {
      visual: "A",
      question: "Which picture starts with the letter A?",
      answers: ["Apple 🍎", "Ball 🏀", "Cat 🐱"],
      correct: "Apple 🍎"
    },
    {
      visual: "B",
      question: "Which picture starts with the letter B?",
      answers: ["Sun ☀️", "Banana 🍌", "Fish 🐟"],
      correct: "Banana 🍌"
    },
    {
      visual: "C",
      question: "Which picture starts with the letter C?",
      answers: ["Car 🚗", "Drum 🥁", "Leaf 🍃"],
      correct: "Car 🚗"
    }
  ],
  numbers: [
    {
      visual: "⭐ ⭐ ⭐",
      question: "How many stars can you count?",
      answers: ["2", "3", "4"],
      correct: "3"
    },
    {
      visual: "🍎 🍎 🍎 🍎",
      question: "How many apples are here?",
      answers: ["4", "5", "6"],
      correct: "4"
    },
    {
      visual: "⚽ ⚽ ⚽ ⚽ ⚽",
      question: "How many balls can you see?",
      answers: ["3", "5", "7"],
      correct: "5"
    }
  ],
  colors: [
    {
      visual: "🟥",
      question: "Tap the name of this color.",
      answers: ["Blue", "Red", "Green"],
      correct: "Red"
    },
    {
      visual: "⚪",
      question: "Which shape is a circle?",
      answers: ["Circle", "Square", "Triangle"],
      correct: "Circle"
    },
    {
      visual: "🟨",
      question: "Tap the name of this color.",
      answers: ["Purple", "Yellow", "Black"],
      correct: "Yellow"
    }
  ]
};

function setupAccessButtons() {
  const buttons = document.querySelectorAll("[data-code-target]");
  const message = document.getElementById("access-message");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.getElementById(button.dataset.codeTarget);
      const value = input.value.trim();
      const expectedCode = accessCodes[button.dataset.app];

      if (value === expectedCode) {
        window.location.href = button.dataset.destination;
        return;
      }

      if (message) {
        message.textContent = "That entry is not correct.";
      }
    });
  });
}

function setupQuiz(type) {
  const questions = quizData[type];

  if (!questions) {
    return;
  }

  const questionEl = document.getElementById(`${type}-question`);
  const answersEl = document.getElementById(`${type}-answers`);
  const feedbackEl = document.getElementById(`${type}-feedback`);
  const progressEl = document.getElementById(`${type}-progress`);
  const scoreEl = document.getElementById(`${type}-score`);
  const visualEl = document.getElementById(`${type}-visual`);
  const nextButton = document.getElementById(`${type}-next`);
  const restartButton = document.getElementById(`${type}-restart`);

  let currentIndex = 0;
  let score = 0;
  let answered = false;

  function renderQuestion() {
    const currentQuestion = questions[currentIndex];

    answered = false;
    questionEl.textContent = currentQuestion.question;
    answersEl.innerHTML = "";
    feedbackEl.textContent = "";
    progressEl.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
    scoreEl.textContent = `Score: ${score}`;
    if (visualEl) {
      visualEl.textContent = currentQuestion.visual || "";
    }
    nextButton.classList.remove("visible");
    restartButton.classList.remove("visible");

    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-button";
      button.textContent = answer;
      button.addEventListener("click", () => checkAnswer(button, answer, currentQuestion.correct));
      answersEl.appendChild(button);
    });
  }

  function checkAnswer(button, selectedAnswer, correctAnswer) {
    if (answered) {
      return;
    }

    answered = true;

    const allButtons = answersEl.querySelectorAll(".answer-button");
    allButtons.forEach((answerButton) => {
      answerButton.disabled = true;

      if (answerButton.textContent === correctAnswer) {
        answerButton.classList.add("correct");
      }
    });

    if (selectedAnswer === correctAnswer) {
      score += 1;
      scoreEl.textContent = `Score: ${score}`;
      feedbackEl.textContent = "Great job! That is right!";
      button.classList.add("correct");
    } else {
      button.classList.add("wrong");
      feedbackEl.textContent = `Nice try! The correct answer is ${correctAnswer}.`;
    }

    if (currentIndex < questions.length - 1) {
      nextButton.classList.add("visible");
    } else {
      feedbackEl.textContent = `You finished with ${score} out of ${questions.length}!`;
      restartButton.classList.add("visible");
    }
  }

  nextButton.addEventListener("click", () => {
    currentIndex += 1;
    renderQuestion();
  });

  restartButton.addEventListener("click", () => {
    currentIndex = 0;
    score = 0;
    renderQuestion();
  });

  renderQuestion();
}

document.addEventListener("DOMContentLoaded", () => {
  setupAccessButtons();

  const quizPanel = document.querySelector("[data-quiz]");
  if (quizPanel) {
    setupQuiz(quizPanel.dataset.quiz);
  }
});
