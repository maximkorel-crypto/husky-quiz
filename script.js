const questions = [
  {
    difficulty: "Легкий разогрев",
    question: "Как настоящее имя рэпера Хаски?",
    answers: ["Иван Алексеев", "Дмитрий Кузнецов", "Мирон Федоров", "Алексей Узенюк"],
    correct: 1,
    explanation: "Хаски - сценический псевдоним Дмитрия Николаевича Кузнецова.",
  },
  {
    difficulty: "Легкий разогрев",
    question: "Из какого города родом Хаски?",
    answers: ["Новосибирск", "Пермь", "Улан-Удэ", "Ростов-на-Дону"],
    correct: 2,
    explanation: "Хаски родился в Улан-Удэ, столице Бурятии.",
  },
  {
    difficulty: "Легкий разогрев",
    question: "Какой жанр чаще всего связывают с творчеством Хаски?",
    answers: ["Синти-поп", "Панк-рок", "Альтернативный хип-хоп", "Джаз-фьюжн"],
    correct: 2,
    explanation: "Его обычно относят к рэпу, хип-хопу и альтернативному хип-хопу.",
  },
  {
    difficulty: "Уверенный слушатель",
    question: "В каком треке звучит желание быть автоматом, стреляющим в лица?",
    answers: ["Панелька", "Ай", "Пуля-дура", "Иуда"],
    correct: 2,
    explanation: "Эта узнаваемая строчка связана с треком «Пуля-дура».",
  },
  {
    difficulty: "Уверенный слушатель",
    question: "Как называется известный альбом Хаски 2017 года?",
    answers: [
      "Хошхоног",
      "сбчь жзнь",
      "Любимые песни (воображаемых) людей",
      "Автопортреты",
    ],
    correct: 2,
    explanation: "«Любимые песни (воображаемых) людей» вышел в 2017 году.",
  },
  {
    difficulty: "Уверенный слушатель",
    question: "Какой клип и трек Хаски связан с образом типовой многоэтажки?",
    answers: ["Космолет", "Люцифер", "Поэма о Родине", "Панелька"],
    correct: 3,
    explanation: "«Панелька» - один из самых узнаваемых визуальных и музыкальных образов Хаски.",
  },
  {
    difficulty: "Почти эксперт",
    question: "Как назывался дебютный альбом Хаски?",
    answers: ["Хошхоног", "Искажение", "сбчь жзнь", "Триптих о человечине"],
    correct: 2,
    explanation: "Дебютная пластинка Хаски называется «сбчь жзнь».",
  },
  {
    difficulty: "Почти эксперт",
    question: "С каким писателем Хаски сотрудничал в треке «Пора валить»?",
    answers: ["Виктор Пелевин", "Дмитрий Глуховский", "Захар Прилепин", "Сергей Минаев"],
    correct: 2,
    explanation: "В записи «Пора валить» участвовал Захар Прилепин.",
  },
  {
    difficulty: "Финальный босс",
    question: "Как называется альбом 2020 года, отсылающий к бурятскому блюду?",
    answers: ["Партизан", "У", "Бесконечный магазин", "Хошхоног"],
    correct: 3,
    explanation: "«Хошхоног» вышел в 2020 году, а название отсылает к бурятскому блюду.",
  },
  {
    difficulty: "Финальный босс",
    question: "Под каким псевдонимом Хаски выпускал проект «эскимо // горячая линия»?",
    answers: ["MC Кузнец", "Husky Jr.", "dj hvost", "черный тмин"],
    correct: 2,
    explanation: "Этот проект выходил под псевдонимом dj hvost.",
  },
];

const screens = {
  start: document.querySelector('[data-screen="start"]'),
  question: document.querySelector('[data-screen="question"]'),
  result: document.querySelector('[data-screen="result"]'),
};

const startButtons = document.querySelectorAll("[data-start]");
const restartButton = document.querySelector("[data-restart]");
const nextButton = document.querySelector("[data-next]");
const answersElement = document.querySelector("[data-answers]");
const feedback = document.querySelector("[data-feedback]");
const feedbackTitle = document.querySelector("[data-feedback-title]");
const feedbackText = document.querySelector("[data-feedback-text]");
const questionTitle = document.querySelector("[data-question-title]");
const questionNumber = document.querySelector("[data-question-number]");
const difficulty = document.querySelector("[data-difficulty]");
const progressText = document.querySelector("[data-progress-text]");
const scoreText = document.querySelector("[data-score-text]");
const progressFill = document.querySelector("[data-progress-fill]");
const resultTitle = document.querySelector("[data-result-title]");
const resultScore = document.querySelector("[data-result-score]");
const resultCopy = document.querySelector("[data-result-copy]");
const reviewList = document.querySelector("[data-review-list]");

let currentQuestion = 0;
let score = 0;
let selectedAnswers = [];

function showScreen(screenName) {
  Object.entries(screens).forEach(([name, element]) => {
    element.classList.toggle("is-hidden", name !== screenName);
  });
}

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedAnswers = [];
  showScreen("question");
  renderQuestion();
}

function renderQuestion() {
  const item = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  feedback.classList.add("is-hidden");
  feedback.classList.remove("is-correct", "is-wrong");
  nextButton.classList.add("is-hidden");
  answersElement.innerHTML = "";

  questionTitle.textContent = item.question;
  questionNumber.textContent = String(currentQuestion + 1).padStart(2, "0");
  difficulty.textContent = item.difficulty;
  progressText.textContent = `Вопрос ${currentQuestion + 1} из ${questions.length}`;
  scoreText.textContent = `Счет: ${score}`;
  progressFill.style.width = `${progress}%`;

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(index));
    answersElement.append(button);
  });
}

function selectAnswer(answerIndex) {
  const item = questions[currentQuestion];
  const isCorrect = answerIndex === item.correct;
  const answerButtons = document.querySelectorAll(".answer-button");

  selectedAnswers[currentQuestion] = answerIndex;

  if (isCorrect) {
    score += 1;
  }

  answerButtons.forEach((button, index) => {
    button.disabled = true;
    button.classList.toggle("is-correct", index === item.correct);
    button.classList.toggle("is-wrong", index === answerIndex && !isCorrect);
  });

  feedbackTitle.textContent = isCorrect ? "Верно" : "Мимо";
  feedbackText.textContent = isCorrect
    ? item.explanation
    : `Правильный ответ: ${item.answers[item.correct]}. ${item.explanation}`;
  feedback.classList.toggle("is-correct", isCorrect);
  feedback.classList.toggle("is-wrong", !isCorrect);
  feedback.classList.remove("is-hidden");

  scoreText.textContent = `Счет: ${score}`;
  nextButton.textContent =
    currentQuestion === questions.length - 1 ? "Показать результат" : "Дальше";
  nextButton.classList.remove("is-hidden");
}

function goNext() {
  currentQuestion += 1;

  if (currentQuestion >= questions.length) {
    renderResult();
    return;
  }

  renderQuestion();
}

function getResult() {
  if (score <= 3) {
    return {
      title: "Случайный слушатель",
      copy: "Тема, база пока только просыпается. Зато теперь есть повод переслушать главное и вернуться за реваншем.",
    };
  }

  if (score <= 6) {
    return {
      title: "Знает базу",
      copy: "Тема, ты явно не впервые слышишь Хаски. Еще немного деталей - и можно спорить с фанатами.",
    };
  }

  if (score <= 8) {
    return {
      title: "Уверенный фанат",
      copy: "Тема, хороший проход. Ты держишь и биографию, и треки, и альбомы почти без провалов.",
    };
  }

  return {
    title: "Хаски-эксперт",
    copy: "Тема, это мощно. Тут уже не квиз, а контрольная проверка архивариуса темного рэпа.",
  };
}

function renderResult() {
  const result = getResult();

  showScreen("result");
  resultTitle.textContent = result.title;
  resultScore.textContent = `${score} из ${questions.length}`;
  resultCopy.textContent = result.copy;
  reviewList.innerHTML = "";

  questions.forEach((item, index) => {
    const listItem = document.createElement("li");
    const userAnswer = selectedAnswers[index];
    const isCorrect = userAnswer === item.correct;

    listItem.innerHTML = `
      <span>${index + 1}. ${item.question}</span>
      <strong>${item.answers[item.correct]}</strong>
      <em>${isCorrect ? "засчитано" : "не засчитано"}</em>
    `;
    reviewList.append(listItem);
  });
}

startButtons.forEach((button) => {
  button.addEventListener("click", startQuiz);
});

restartButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", goNext);
