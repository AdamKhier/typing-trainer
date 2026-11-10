import { renderKeyboard } from './keyboard.js';
import { LESSONS, FINGER_MAP } from './lessons.js';

const LEARN = 'learn';
const TEST = 'test';

let state = {
  mode: LEARN,
  lessonIndex: 0,
  lesson: LESSONS[0],
  textInput: '',
  correct: 0,
  total: 0,
  wpm: 0,
  acc: 100,
  testTimer: null,
  testSeconds: 30,
  testRemaining: 30,
  testWords: [],
  nextKeyChar: null,
};

const el = {
  modeTabs: document.querySelector('.mode-tabs'),
  learnMode: document.getElementById('learn-mode'),
  testMode: document.getElementById('test-mode'),
  resultsOverlay: document.getElementById('results-overlay'),
  // learn
  lessonCounter: document.querySelector('.lesson-counter'),
  lessonProgress: document.querySelector('.lesson-progress'),
  lessonPreview: document.getElementById('lesson-preview'),
  lessonText: document.getElementById('lesson-text'),
  caret: document.getElementById('caret'),
  lessonKeyboard: document.getElementById('lesson-keyboard'),
  // test
  testBtns: document.querySelectorAll('.test-btn'),
  wpmEl: document.getElementById('wpm'),
  accuracyEl: document.getElementById('accuracy'),
  testCaret: document.getElementById('test-caret'),
  testText: document.getElementById('test-text'),
  testKeyboard: document.getElementById('test-keyboard'),
  // results
  resultsWpm: document.getElementById('results-wpm'),
  resultsAccuracy: document.getElementById('results-accuracy'),
  resultsAccuracyDetail: document.getElementById('results-accuracy-detail'),
  restartBtn: document.querySelector('.restart-btn'),
};

function setMode(mode) {
  state.mode = mode;
  el.learnMode.style.display = mode === LEARN ? 'block' : 'none';
  el.testMode.style.display = mode === TEST ? 'block' : 'none';
  el.modeTabs.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.mode === mode));
  if (mode === LEARN) startLesson();
  if (mode === TEST) startTest();
}

function startLesson() {
  const l = state.lesson;
  // Render keyboard with new keys highlighted
  renderKeyboard(el.lessonKeyboard, 'lesson', l.newKeys);
  
  // Set preview text
  const previewText = l.drill + ' ' + (l.words?.[0] || '');
  el.lessonPreview.textContent = previewText;
  
  // Set main text
  el.lessonText.textContent = l.words?.[0] || '';
  
  // Update lesson info
  el.lessonCounter.textContent = `Lesson ${l.id} of ${LESSONS.length}`;
  el.lessonProgress.style.width = `${l.progress}%`;
}

function startTest() {
  const duration = parseInt(document.querySelector('.test-btn.active').dataset.duration);
  state.testSeconds = duration;
  state.testRemaining = duration;
  state.wpm = 0;
  state.acc = 100;
  state.nextKeyChar = null;
  
  el.wpmEl.textContent = `0 WPM`;
  el.accuracyEl.textContent = `100% Acc`;
  
  // Generate test text - a sample of common words
  const commonWords = ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', 'and', 'that', 'have'];
  state.testWords = Array.from({ length: 60 }, () => commonWords[Math.floor(Math.random() * commonWords.length)]).slice(0, 60);
  const testText = state.testWords.join(' ') + ' ';
  el.testText.textContent = testText;
  
  // Render full QWERTY keyboard
  renderKeyboard(el.testKeyboard, 'test');
  
  // Caret blink
  el.testCaret.style.animation = 'none';
  el.testCaret.offsetHeight;
  el.testCaret.style.animation = 'blink 1s stepEnd infinite';
  
  // Set first character as target
  state.nextKeyChar = testText[0];
  const highlighted = state.nextKeyChar ? [{ char: state.nextKeyChar }] : [];
  renderKeyboard(el.testKeyboard, 'test', highlighted);
  
  // Start timer
  clearInterval(state.testTimer);
  state.testTimer = setInterval(() => {
    state.testRemaining--;
    const perMin = (60 / duration) * (duration - state.testRemaining);
    state.wpm = Math.round(perMin);
    el.wpmEl.textContent = `${state.wpm} WPM`;
    el.accuracyEl.textContent = `${state.acc}% Acc`;
    if (state.testRemaining <= 0) {
      clearInterval(state.testTimer);
      showResults();
    }
  }, 1000);
  
  // Reset text position tracking
  el.testText.textContent = testText;
}

function handleKeyPress(char) {
  if (state.mode === TEST) {
    // Find the current character in the display text
    const displayText = el.testText.textContent;
    const currentChar = displayText[0];
    
    const isCorrect = char === currentChar;
    
    // Update stats
    state.total++;
    if (isCorrect) state.correct++;
    state.acc = Math.round((state.correct / state.total) * 100);
    el.accuracyEl.textContent = `${state.acc}% Acc`;
    
    // Advance display text - remove first char, add a new one at the end
    el.testText.textContent = displayText.slice(1);
    // Add a new random word chunk at the end to keep flow
    if (state.testWords.length > 0) {
      const newWord = state.testWords.shift();
      el.testText.textContent += newWord + ' ';
    }
    
    // Update next key char - it's now the first character of remaining text
    state.nextKeyChar = el.testText.textContent[0];
    const highlighted = state.nextKeyChar ? [{ char: state.nextKeyChar }] : [];
    renderKeyboard(el.testKeyboard, 'test', highlighted);
    
    // Update WPM - calculate based on chars typed per minute
    const elapsed = state.testSeconds - state.testRemaining + 1;
    if (elapsed > 0) {
      const charsPerMin = (elapsed / state.testSeconds) * 60;
      state.wpm = Math.round(charsPerMin / 5); // 5 chars per word approx
      el.wpmEl.textContent = `${state.wpm} WPM`;
    }
  }
  
  if (!state.testRemaining || state.testRemaining <= 0) return;
  
  // Learn mode
  if (state.mode === LEARN) {
    const l = state.lesson;
    if (l.newKeys.includes(char)) {
      // Mark key as correct on keyboard
      const keys = el.lessonKeyboard.querySelectorAll('.key');
      keys.forEach(k => {
        if (k.dataset.key === char) k.classList.add('correct');
      });
      // Advance lesson
      const remainingNew = l.newKeys.filter(k => k !== char);
      if (remainingNew.length === 0) {
        setTimeout(() => {
          if (state.lessonIndex < LESSONS.length - 1) {
            state.lessonIndex++;
            state.lesson = LESSONS[state.lessonIndex];
          }
          startLesson();
        }, 800);
      } else {
        startLesson();
      }
    }
  }
}

function showResults() {
  const wpm = state.wpm || 0;
  const acc = state.acc || 100;
  el.resultsWpm.textContent = `${wpm} WPM`;
  el.resultsAccuracy.textContent = `${acc}% Acc`;
  el.resultsAccuracyDetail.textContent = `${state.correct || 0} / ${state.total || 0}`;
  el.resultsOverlay.classList.remove('hidden');
}

el.restartBtn.addEventListener('click', () => {
  el.resultsOverlay.classList.add('hidden');
  setMode(LEARN);
});

// Mode tabs
el.modeTabs.addEventListener('click', e => {
  if (e.target.classList.contains('tab')) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    setMode(e.target.dataset.mode);
  }
});

// Test duration buttons
el.testBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    el.testBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    startTest();
  });
}

// Physical keyboard input
document.addEventListener('keydown', e => {
  // Skip special modifier keys for typing content
  if (/^Meta|^Alt|^Control|Shift$/.test(e.key)) return;
  if (e.key === ' ') {
    handleKeyPress(' ');
    e.preventDefault();
  } else if (e.key.length === 1) {
    handleKeyPress(e.key.toLowerCase());
  }
  // Enter or Tab to finish test
  if ((e.key === 'Enter' || e.key === 'Tab') && state.mode === TEST) {
    showResults();
  }
});

// Init
setMode(LEARN);