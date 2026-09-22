import { generateSalesResponse, detectLanguage } from '../src/data/salesBrain';

const testCases = [
  { input: 'Pwede mag-Bisaya?', expectedLang: 'CEB' },
  { input: 'Pila ang binuwan sa VF 5 Plus?', currentLang: 'CEB', expectedLang: 'CEB' },
  { input: 'Can you speak Chinese?', expectedLang: 'ZH' },
  { input: '你能说中文吗？VF 3 多少钱？', expectedLang: 'ZH' },
  { input: 'Pwede Ilonggo?', expectedLang: 'ILO' },
  { input: 'Hablas español?', expectedLang: 'ES' },
  { input: 'Japanese please', expectedLang: 'JA' },
  { input: '한국어로 말해줘', expectedLang: 'KO' },
  { input: 'Can you speak French?', expectedLang: 'FRENCH' },
];

console.log('=== TESTING MULTILINGUAL DETECTION & RESPONSES ===\n');

let allPassed = true;

for (const tc of testCases) {
  const detected = detectLanguage(tc.input, tc.currentLang || 'EN');
  const res = generateSalesResponse(tc.input, detected.lang);

  console.log(`Query: "${tc.input}"`);
  console.log(`Detected Lang: ${detected.lang} (expected: ${tc.expectedLang})`);
  console.log(`Response Preview:\n${res.text.split('\n').slice(0, 4).join('\n')}\n---`);

  if (detected.lang !== tc.expectedLang) {
    console.error(`FAILED: Expected ${tc.expectedLang}, got ${detected.lang}`);
    allPassed = false;
  }
}

if (allPassed) {
  console.log('ALL MULTILINGUAL TESTS PASSED!');
} else {
  process.exit(1);
}
