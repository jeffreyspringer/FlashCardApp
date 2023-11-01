const startButton = document.getElementById('start-btn');
const homeButton = document.getElementById('home-btn');
const nextButton = document.getElementById('next-btn');
const textAboveStart = document.getElementById('text-above-start'); // New ID for the text above the Start button
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  homeButton.classList.add('hide');
  textAboveStart.classList.add('hide'); // Hide the text above the Start button
  answerSelected = false; // Reset the answerSelected variable
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide'); // Show the question container
  setNextQuestion();
}

function setNextQuestion() {
  answerSelected = false; // Reset the answerSelected variable
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

let answerSelected = false;

function selectAnswer(e) {
  if (answerSelected) {
    return; // Do nothing if an answer has already been selected
  }
  
  answerSelected = true; // Set the answer as selected
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    if (button !== selectedButton) {
      button.disabled = true; // Disable other answer buttons
    }
  });
  
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
    homeButton.classList.add('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
    homeButton.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

homeButton.addEventListener('click', function() {
    window.location.href = 'german.html'; // Navigate to the "german.html" page
});

const questions = [
  {
    question: 'Family',
    answers: [
      { text: 'die Familie', correct: true },
      { text: 'der Vater', correct: false },
      { text: 'der Onkel', correct: false },
      { text: 'der Sohn', correct: false }
    ]
  },
  {
    question: 'Mom',
    answers: [
      { text: 'der Mutter', correct: false },
      { text: 'der Mann', correct: false },
      { text: 'die Mutter', correct: true },
      { text: 'die Schwester', correct: false }
    ]
  },
  {
    question: 'Dad',
    answers: [
      { text: 'der Sohn', correct: false },
      { text: 'das Mädchen', correct: false },
      { text: 'die Mutter', correct: false },
      { text: 'der Vater', correct: true }
    ]
  },
  {
    question: 'Brother',
    answers: [
      { text: 'die Bruder', correct: false },
      { text: 'der Bruder', correct: true },
      { text: 'die Mutter', correct: false },
      { text: 'der Opa', correct: false }
    ]
  },
  {
    question: 'Sister',
    answers: [
      { text: 'die Oma', correct: false },
      { text: 'der Schwester', correct: false },
      { text: 'der Mann', correct: false },
      { text: 'die Schwester', correct: true }
    ]
  },
  {
    question: 'Aunt',
    answers: [
      { text: 'die Tante', correct: true },
      { text: 'der Onkel', correct: false },
      { text: 'die Aunt', correct: false },
      { text: 'der Opa', correct: false }
    ]
  },
  {
    question: 'Uncle',
    answers: [
      { text: 'der Vater', correct: false },
      { text: 'die Oma', correct: false },
      { text: 'der Onkel', correct: true },
      { text: 'der Sohn', correct: false }
    ]
  },
  {
    question: 'Grandpa',
    answers: [
      { text: 'der Sohn', correct: false },
      { text: 'der Vater', correct: false },
      { text: 'der Opa', correct: true },
      { text: 'der Onkel', correct: false }
    ]
  },
  {
    question: 'Grandma',
    answers: [
      { text: 'die Mutter', correct: false },
      { text: 'die Tochter', correct: false },
      { text: 'die Tante', correct: false },
      { text: 'die Oma', correct: true }
    ]
  },
  {
    question: 'Son',
    answers: [
      { text: 'der Sohn', correct: true },
      { text: 'die Sohn', correct: false },
      { text: 'das Sohn', correct: false },
      { text: 'the Son', correct: false }
    ]
  },
  {
    question: 'Daughter',
    answers: [
      { text: 'das Tochter', correct: false },
      { text: 'die Tochter', correct: true },
      { text: 'der Tochter', correct: false },
      { text: 'the Daughter', correct: false }
    ]
  },
]