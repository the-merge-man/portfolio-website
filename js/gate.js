const TIME_LIMIT = 6.0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let problem = null;

const problemEl = document.getElementById('gate-problem');
const fillEl = document.getElementById('timer-fill');
const form = document.getElementById('gate-form');
const input = document.getElementById('gate-answer');
const feedback = document.getElementById('gate-feedback');

function generateProblem() {
  const twoDigit = Math.floor(Math.random() * 70) + 30; // 30–99
  const oneDigit = Math.floor(Math.random() * 6) + 4;   // 4–9
  return { text: `${twoDigit} × ${oneDigit}`, answer: twoDigit * oneDigit };
}

function startProblem() {
  problem = generateProblem();
  problemEl.textContent = problem.text;
  input.value = '';
  feedback.innerHTML = '&nbsp;';
  feedback.className = 'gate-feedback';
  timeLeft = TIME_LIMIT;
  fillEl.style.width = '100%';
  fillEl.classList.remove('urgent');
  input.focus();

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft -= 0.1;
    const pct = Math.max(0, (timeLeft / TIME_LIMIT) * 100);
    fillEl.style.width = pct + '%';

    if (timeLeft <= 2) fillEl.classList.add('urgent');

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      feedback.textContent = 'Too slow.';
      feedback.className = 'gate-feedback error';
      setTimeout(startProblem, 900);
    }
  }, 100);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const userAnswer = parseInt(input.value, 10);

  if (userAnswer === problem.answer) {
    clearInterval(timerInterval);
    feedback.textContent = 'Impressive.';
    feedback.className = 'gate-feedback success';
    setTimeout(() => {
      window.location.href = 'home.html';
    }, 700);
  } else {
    feedback.textContent = 'Incorrect.';
    feedback.className = 'gate-feedback error';
    input.value = '';
    input.focus();
  }
});

startProblem();