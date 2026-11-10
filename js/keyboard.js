const KEY_LAYOUT = [
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'bs'],
  ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', 'enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
];

const FINGER_MAP = {
  'q': 'pinkyL', '1': 'pinkyL', '`': 'pinkyL',
  'w': 'ringL', '2': 'ringL',
  'a': 'pinkyL', 'z': 'pinkyL',
  's': 'ringL', 'x': 'ringL',
  'd': 'middleL', 'c': 'middleL',
  'f': 'indexL', 'v': 'indexL',
  'g': 'indexL', 'b': 'indexR',
  'h': 'indexL', 'n': 'indexR',
  'j': 'indexL',
  'k': 'middleR', ',': 'middleR',
  'l': 'ringR', '.': 'ringR',
  ';': 'pinkyR', ':': 'pinkyR',
  '': 'space',
  'ShiftLeft': 'shift', 'ShiftRight': 'shift',
  'Tab': 'tab', 'Backspace': 'backspace', 'CapsLock': 'capslock',
  'Enter': 'enter',
};

function fingerColor(finger) {
  const colors = {
    pinkyL: '#ff5f57', ringL: '#ff8c42', middleL: '#ffd345', indexL: '#a8d5ff',
    pinkyR: '#ff5f57', ringR: '#ff8c42', middleR: '#ffd345', indexR: '#a8d5ff',
    space: '#fff', shift: '#777', tab: '#777', backspace: '#777', capslock: '#777',
  };
  return colors[finger] || '#646669';
}

function keyHtml(key) {
  const finger = FINGER_MAP[key.char || key] || '';
  return `
    <button type="button" class="key" data-key="${key.char || ''}" data-finger="${finger}" style="--finger-color: ${fingerColor(finger)}">
      ${key.label || (key.char ? key.char.toUpperCase() : key)}
    </button>
  `;
}

export function renderKeyboard(container, mode = 'test', highlighted = []) {
  container.innerHTML = '';
  container.classList.add(mode === 'test' ? 'test-keyboard' : 'lesson-keyboard');
  
  // Build rows from KEY_LAYOUT
  KEY_LAYOUT.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.style.display = 'grid';
    rowDiv.style.gridTemplateColumns = `repeat(${row.length}, 1fr)`;
    rowDiv.style.gap = '2px';
    
    row.forEach(key => {
      const isHighlighted = highlighted.some(h => h.char === key.char);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `key ${isHighlighted ? 'target' : ''}`;
      btn.dataset.key = key.char || '';
      btn.dataset.finger = FINGER_MAP[key.char || key] || '';
      
      // Build label: show the key cap
      let label = key.char ? key.char.toUpperCase() : key;
      if (key === 'space') label = 'Space';
      if (key === 'enter') label = 'Enter';
      if (key === 'backspace') label = 'Backspace';
      if (key === 'tab') label = 'Tab';
      if (key === 'capslock') label = 'Caps';
      if (key === 'shift') label = 'Shift';
      
      btn.textContent = label;
      btn.addEventListener('click', () => {
        // App will handle onPress separately; for on-screen click we dispatch a synthetic event
        const event = new Event('keydown', { bubbles: true });
        event.key = key.char || ' ';
        document.dispatchEvent(event);
      });
      rowDiv.append(btn);
    });
    container.append(rowDiv);
  });
  
  // Apply target highlighting after render setTimeout
  setTimeout(() => {
    highlighted.forEach(h => {
      const btn = container.querySelector(`[data-key="${h.char}"]`);
      if (btn) btn.classList.add('target');
    });
  }, 10);
}