const FINGER_MAP = {
  // Pinkies
  'q': 'pinkyL', '1': 'pinkyL', '`': 'pinkyL',
  'a': 'pinkyL', 'z': 'pinkyL',
  ';': 'pinkyR', "'": 'pinkyR', 'enter': 'pinkyR',
  // Ring fingers
  'w': 'ringL', '2': 'ringL',
  's': 'ringL', 'x': 'ringL',
  'l': 'ringR', ':': 'ringR',
  // Middle fingers
  'e': 'middleL', '3': 'middleL',
  'd': 'middleL', 'c': 'middleL',
  'k': 'middleR', ',': 'middleR',
  // Index fingers
  'r': 'indexL', '4': 'indexL', '5': 'indexL',
  't': 'indexL', 'f': 'indexL',
  'g': 'indexL', 'b': 'indexR',
  'y': 'indexL', 'h': 'indexL', 'n': 'indexR',
  'u': 'indexL', 'j': 'indexL',
  'i': 'indexL', 'm': 'indexR',
  'o': 'indexL', ',': 'middleR',
  'p': 'indexL', '.': 'ringR',
  // Space
  ' ': 'space',
  // Shift
  'ShiftLeft': 'shift', 'ShiftRight': 'shift',
  // Tab/Backspace/Caps
  'Tab': 'tab', 'Backspace': 'backspace', 'CapsLock': 'capslock',
}

const LESSONS = [
  {
    id: 1,
    name: 'Home Row Anchors',
    progress: 14.3,
    newKeys: ['f', 'j'],
    drill: 'fj fj fj fj fj fj',
    words: ['of', 'to', 'in', 'is', 'it'],
  },
  {
    id: 2,
    name: 'Full Home Row',
    progress: 28.6,
    newKeys: ['d', 'k', 's', 'l', 'a', ';'],
    drill: 'asdf jkl; asdf jkl;',
    words: ['and', 'the', 'have', 'that', 'for'],
  },
  {
    id: 3,
    name: 'Top Row',
    progress: 42.9,
    newKeys: ['r', 'u', 'e', 'i', 't', 'o', 'w', 'q', 'p', 'y'],
    drill: 'retui owqp',
    words: ['you', 'your', 'good', 'can', 'want'],
  },
  {
    id: 4,
    name: 'Bottom Row',
    progress: 57.1,
    newKeys: ['v', 'm', 'c', ',', '.', '/', 'b', 'n'],
    drill: 'vcm,/. bn',
    words: ['been', 'not', 'now', 'him', 'with'],
  },
  {
    id: 5,
    name: 'Common Bigrams',
    progress: 71.4,
    newKeys: [],
    drill: 'th he in er an re on th he in',
    words: [],
  },
  {
    id: 6,
    name: 'Common Words',
    progress: 85.7,
    newKeys: [],
    drill: '',
    words: ['the', 'and', 'that', 'have', 'this', 'from', 'they', 'we', 'were', 'when'],
  },
  {
    id: 7,
    name: 'Full Sentences',
    progress: 100,
    newKeys: [],
    drill: '',
    words: ['The quick brown fox jumps over the lazy dog', 'Pack my box with five dozen liquor jugs', 'How quickly daft jumping zebras vex'],
  },
]

export { FINGER_MAP, LESSONS }