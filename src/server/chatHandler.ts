import type { IncomingMessage, ServerResponse } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { generateSalesResponse, type BrainResponse } from '../data/salesBrain';
import type { ChatMessage } from '../types';

/**
 * Cache and helper to load DEEPSEEK_API_KEY from process.env or .env.local
 */
let cachedApiKey: string | null = null;

export function getDeepSeekApiKey(): string {
  if (cachedApiKey) return cachedApiKey;

  if (process.env.DEEPSEEK_API_KEY) {
    cachedApiKey = process.env.DEEPSEEK_API_KEY.trim();
    return cachedApiKey;
  }

  // Check .env.local and .env in current directory
  const root = process.cwd();
  const envCandidates = ['.env.local', '.env'];

  for (const filename of envCandidates) {
    const fullPath = path.resolve(root, filename);
    if (fs.existsSync(fullPath)) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        for (const line of content.split('\n')) {
          const trimmed = line.trim();
          if (trimmed.startsWith('DEEPSEEK_API_KEY=')) {
            const rawVal = trimmed.split('=')[1] || '';
            const cleanVal = rawVal.replace(/["'\r]/g, '').trim();
            if (cleanVal) {
              cachedApiKey = cleanVal;
              return cleanVal;
            }
          }
        }
      } catch {
        // Continue searching
      }
    }
  }

  return '';
}

/**
 * Guardrail Classifier:
 * Determines if a query is relevant to VinFast, electric vehicles, automotive topics,
 * financing, charging, Philippine road conditions, or dealership services.
 */
export function isTopicRelated(query: string): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return true;

  // 1. Explicit Unrelated Indicators (homework, math, coding, cooking, unrelated trivia, etc.)
  const unrelatedPatterns = [
    // Math, academic equations, homework, essays
    /\b(solve|equation|calculus|derivative|integral|polynomial|pythagor|homework|assignment|thesis|essay)\b/i,
    /\b(photosynthesis|mitochondria|biology|chemistry|cellular respiration|atomic mass)\b/i,
    /\b(renaissance|french revolution|world war (1|2|i|ii)|ancient rome|julius caesar|shakespear)\b/i,
    // Coding & technical programming outside car context
    /\b(python|javascript|typescript|c\+\+|java code|html tag|css style|sql query|select \* from|git commit|regex code|write a function|class component)\b/i,
    // Food, cooking, recipes
    /\b(recipe|how to cook|ingredients for|baking cake|adobo recipe|sinigang recipe|lasagna|pasta carbonara|pancake)\b/i,
    // Creative writing, songs, jokes
    /\b(write a poem|write a song|write a story|bedtime story|tell me a joke|write fiction|rhyme)\b/i,
    // Non-automotive sports / entertainment / pop trivia
    /\b(who won the (super bowl|world cup|nba|oscar|grammy)|capital of [a-z]+|president of [a-z]+)\b/i,
    // Astrology, dating, medical diagnosis
    /\b(zodiac sign|horoscope|astrology|dating advice|tinder|diagnose my|headache remedy|stomach ache)\b/i,
  ];

  for (const pattern of unrelatedPatterns) {
    if (pattern.test(q)) {
      // If it explicitly asks about VinFast/EV in the same prompt, give benefit of the doubt
      if (q.includes('vinfast') || q.includes('vf 3') || q.includes('vf 5') || q.includes('electric vehicle') || q.includes('test drive')) {
        return true;
      }
      return false;
    }
  }

  // 2. Automotive, VinFast, EV, and Dealership Indicators
  const relatedPatterns = [
    // Brand & models
    /\b(vinfast|vf|vf\s*3|vf\s*5|vf\s*6|vf\s*7|vf\s*9|vingroup|electric)\b/i,
    // EV technology & charging
    /\b(ev|battery|charge|charging|charger|kwh|range|distance|km|motor|inverter|regen|regenerative|ccs2|type 2|wallbox|plug|dc fast|ac)\b/i,
    // Automotive specs & features
    /\b(car|suv|crossover|vehicle|auto|automobile|wheel|tire|brake|suspension|seat|cabin|trunk|cargo|dimension|ground clearance|clearance|wading|flood|airbag|adas|speed|torque|power|hp)\b/i,
    // Buying, financing, ownership
    /\b(buy|purchase|own|order|reserve|booking|book|test drive|drive|srp|price|cost|quote|quotation|promo|discount|installment|financing|monthly|amortization|downpayment|down payment|loan|bank|interest|bdo|bpi|security bank|rcbc|metrobank|maybank)\b/i,
    /\b(subscription|battery subscription|outright|warranty|maintenance|pms|service|parts|plate|lto|registration|rfid|autosweep|easytrip)\b/i,
    // Locations & dealers
    /\b(dealer|dealership|showroom|branch|store|location|address|hotline|phone|contact|manila|bgc|taguig|makati|quezon|qc|alabang|cebu|davao|pampanga|cavite|bulacan|tarlac|iloilo|bacolod)\b/i,
    // Philippine driving & comparisons
    /\b(evida|ra 11697|number coding|coding|traffic|expressway|slex|nlex|gas|petrol|diesel|fuel|savings|compare|comparison|byd|wuling|tesla|hyundai|nissan|toyota|wigo|raize)\b/i,
    // Polite conversational affirmations or questions
    /\b(hello|hi|kamusta|kumusta|morning|afternoon|evening|salamat|thanks|thank you|yes|no|sure|ok|sige|help|inquire|inquiry|details|specs)\b/i,
  ];

  for (const pattern of relatedPatterns) {
    if (pattern.test(q)) return true;
  }

  // If query is short conversational greeting or inquiry, treat as related
  if (q.length <= 15 && (/^(hey|hi|hello|sup|yo|good day|magandang araw)/i.test(q))) {
    return true;
  }

  // If query does not mention anything automotive or related, default to unrelated guardrail
  return false;
}

/**
 * Dynamic human deflections pool that rotates dynamically to never repeat the same deflection.
 */
let lastDeflectionIndex = -1;

const ENGLISH_DEFLECTIONS = [
  "Haha, as much as I'd love to help with that, that's definitely outside my wheelhouse! I'm specialized exclusively as your VinFast Philippines EV Companion. Can I help you explore our electric models like the VF 3 or VF 5 Plus, calculate monthly installments, or book a free 30-minute VIP test drive?",
  "I wish I could help with that, but my expertise is laser-focused on VinFast electric mobility and ownership in the Philippines! If you have any questions about vehicle specs, charging solutions, or our 10-year warranty, I'm all ears. What can I assist you with today?",
  "That's a bit outside my lane! I'm here specifically to guide you through VinFast's electric lineup in the Philippines—such as comparing battery subscription vs outright purchase, or finding your nearest authorized showroom. How can I assist you with an EV today?",
  "You caught me! I'm tuned strictly for everything electric vehicles and Philippine EV driving. For other subjects, I'll have to pass, but if you're curious about zero fuel costs, smart tech features, or checking flexible bank financing, let me know!",
  "That sounds interesting, but my daily route is strictly driving electric with VinFast! I can help you compute down payments, check charging times, or reserve a VIP test drive at any of our 29 showrooms nationwide. Where should we start?",
  "As fun as that topic is, I'm dedicated exclusively to VinFast electric vehicles in the Philippines. Would you like to check out the urban favorite VF 3 starting at ₱590k, explore our family crossover VF 5 Plus, or locate your closest dealership?",
  "I have to admit, that's outside my territory! My sole mission is helping drivers in the Philippines discover the benefits of electric mobility with VinFast. Can I answer any questions about our electric lineup, savings vs gas, or road trip range?",
  "That's definitely off my radar! I'm trained strictly as a VinFast sales specialist. If you'd like to schedule a hands-on test drive, see real photos of our models, or calculate monthly amortizations, I'd be delighted to help!"
];

const TAGALOG_DEFLECTIONS = [
  "Naku, medyo malayo po 'yan sa aking linya! Nandidito po ako bilang inyong VinFast Philippines EV Specialist para gabayan kayo sa ating mga electric vehicle. Maaari kitang tulungan sa specs ng VF 3 o VF 5 Plus, pagkukwenta ng buwanang hulog, o pag-reserve ng libreng 30-minutong VIP test drive. Ano po ang nais ninyong alamin?",
  "Haha, gusto ko man po kayong tulungan diyan, nakatutok lang po talaga ang aking kaalaman sa VinFast electric mobility at pagmamay-ari ng EV sa Pilipinas. Kung may tanong po kayo ukol sa aming 10-year warranty, charging stations, o battery subscription, masayang-masaya po akong magpaliwanag!",
  "Pasensya na po, labas po 'yan sa aking ruta! Ang expertise ko po ay strictly para sa VinFast electric cars, promos, at dealership services sa bansa. Nais mo bang makita kung magkano ang matitipid mo sa gasolina o hanapin ang pinakamalapit na showroom sa inyo?",
  "Medyo malayo po 'yan sa biyahe natin! Ako po ang inyong gabay sa lahat ng katanungan ukol sa VinFast EVs sa Pilipinas. Puwede kitang tulungan mag-compute ng financing options o mag-schedule ng test drive sa alinman sa 29 naming awtorisadong showrooms!",
  "Nahuli mo ako roon! Nakalaan po ang aking sistema para sa mga electric vehicle ng VinFast. Kung nais ninyong pag-aralan ang presyo ng VF 3, battery subscription vs outright purchase, o test drive booking, sabihan niyo lang po ako!"
];

export function generateDynamicDeflection(lang: string = 'EN'): string {
  const isTagalog = lang === 'PH' || lang.toLowerCase() === 'tagalog' || lang.toLowerCase() === 'filipino';
  const pool = isTagalog ? TAGALOG_DEFLECTIONS : ENGLISH_DEFLECTIONS;

  let nextIndex = Math.floor(Math.random() * pool.length);
  // Ensure we don't pick the exact same index as last time
  if (pool.length > 1 && nextIndex === lastDeflectionIndex) {
    nextIndex = (nextIndex + 1) % pool.length;
  }
  lastDeflectionIndex = nextIndex;

  return pool[nextIndex];
}

/**
 * DeepSeek API Caller
 * Base URL: https://api.deepseek.com
 * Model: deepseek-chat
 */
export async function queryDeepSeek(
  userMessage: string,
  lang: string = 'EN',
  history: ChatMessage[] = [],
  apiKey: string
): Promise<{ text: string; success: boolean; errorStatus?: number }> {
  const systemPrompt = `You are the VinFast Philippines AI Senior Sales Specialist and EV Companion.
SCOPE:
You are an expert sales consultant for VinFast electric vehicles in the Philippines (models: VF 3, VF 5 Plus, VF 6, VF 7, VF 9).
You answer questions about VinFast EV specifications, battery subscription vs outright purchase, Philippine pricing and SRP, partner bank financing and installments, 29 authorized Philippine showrooms and service centers, DC fast charging and AC home charging in the Philippines, EVIDA law coding exemption, and 10-year / 200,000 km warranty.

GUARDRAILS:
1. ONLY answer questions related to VinFast, electric vehicles, automotive technology, automotive financing, charging infrastructure, and dealership services in the Philippines.
2. If the user asks an unrelated question (homework, math, coding, cooking recipes, general pop trivia, weather, politics, or casual non-automotive chit-chat), DO NOT answer the question. Instead, provide a polite, natural, and human deflection explaining your focus on VinFast electric mobility in the Philippines and invite them to explore our EV lineup or book a test drive. Vary your phrasing naturally every time.
3. Tone: Warm, professional, transparent, knowledgeable Philippine automotive expert.
4. Language: Respond in ${lang === 'PH' ? 'Tagalog / Filipino' : lang === 'CEB' ? 'Cebuano / Bisaya' : lang === 'ZH' ? 'Chinese' : lang === 'ES' ? 'Spanish' : lang === 'JA' ? 'Japanese' : lang === 'KO' ? 'Korean' : 'English'}.
5. Formatting: Use clean text formatting. Bullet points are encouraged for lists. Do not use raw HTML.`;

  // Format past history for context (up to last 6 messages)
  const recentHistory = history.slice(-6).map((msg) => ({
    role: msg.sender === 'user' ? 'user' : 'assistant',
    content: msg.text,
  }));

  const messages = [
    { role: 'system', content: systemPrompt },
    ...recentHistory,
    { role: 'user', content: userMessage }
  ];

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        temperature: 0.6,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      console.warn(`[DeepSeek API] returned status ${response.status}: ${response.statusText}`);
      return { text: '', success: false, errorStatus: response.status };
    }

    const data = (await response.json()) as any;
    const content = data.choices?.[0]?.message?.content?.trim();

    if (content) {
      return { text: content, success: true };
    }

    return { text: '', success: false };
  } catch (err: any) {
    console.error('[DeepSeek API] network error:', err?.message || err);
    return { text: '', success: false };
  }
}

/**
 * Secure HTTP Request Handler for /api/chat
 * Handles POST requests and implements the Two-Tier answering behavior.
 */
export async function handleChatApiRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
  // CORS & headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  // Parse JSON Body
  let bodyStr = '';
  try {
    bodyStr = await new Promise((resolve, reject) => {
      let data = '';
      req.on('data', chunk => {
        data += chunk;
        if (data.length > 500_000) reject(new Error('Payload too large'));
      });
      req.on('end', () => resolve(data));
      req.on('error', reject);
    });
  } catch (err: any) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Invalid request body', details: err?.message }));
    return;
  }

  let parsed: { message?: string; language?: string; history?: ChatMessage[] } = {};
  try {
    parsed = bodyStr ? JSON.parse(bodyStr) : {};
  } catch {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Malformed JSON payload' }));
    return;
  }

  const userMessage = (parsed.message || '').trim();
  const lang = parsed.language || 'EN';
  const history = parsed.history || [];

  if (!userMessage) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Message cannot be empty' }));
    return;
  }

  // ==========================================
  // TIER 1 (PRIMARY): Built-in Local Knowledge
  // ==========================================
  const localResponse: BrainResponse = generateSalesResponse(userMessage, lang, history);

  if (localResponse.isLocalMatch !== false) {
    // Primary local knowledge matched with high confidence!
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({
      text: localResponse.text,
      mediaUrls: localResponse.mediaUrls || [],
      suggestedDealer: localResponse.suggestedDealer,
      quickActions: localResponse.quickActions,
      detectedLanguage: localResponse.detectedLanguage || lang,
      source: 'local'
    }));
    return;
  }

  // ==========================================
  // GUARDRAIL RULE CHECK
  // ==========================================
  const isRelevant = isTopicRelated(userMessage);

  if (!isRelevant) {
    // User asked an unrelated question (homework, recipes, coding, trivia, etc.)
    const deflectionText = generateDynamicDeflection(lang);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({
      text: deflectionText,
      mediaUrls: [],
      quickActions: [
        { label: lang === 'PH' ? 'Suriin ang VF 3' : 'Explore VF 3', action: 'calculate_model', payload: 'vf-3' },
        { label: lang === 'PH' ? 'Mag-book ng Test Drive' : 'Book VIP Test Drive', action: 'book_test_drive', payload: 'vf-3' },
        { label: lang === 'PH' ? 'Hanapin ang Showroom' : 'Find Showroom', action: 'view_dealer' }
      ],
      detectedLanguage: lang,
      source: 'guardrail'
    }));
    return;
  }

  // ==========================================
  // TIER 2 (SECONDARY): DeepSeek API Fallback
  // ==========================================
  const apiKey = getDeepSeekApiKey();

  if (apiKey) {
    const deepSeekResult = await queryDeepSeek(userMessage, lang, history, apiKey);

    if (deepSeekResult.success && deepSeekResult.text) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({
        text: deepSeekResult.text,
        mediaUrls: [],
        quickActions: [
          { label: lang === 'PH' ? 'Mag-book ng Test Drive' : 'Book VIP Test Drive', action: 'book_test_drive', payload: 'vf-3' },
          { label: lang === 'PH' ? 'Kwentahin ang Hulog' : 'Calculate Monthly', action: 'calculate_model', payload: 'vf-3' },
          { label: lang === 'PH' ? 'Hanapin ang Dealer' : 'Find Showroom', action: 'view_dealer' }
        ],
        detectedLanguage: lang,
        source: 'deepseek'
      }));
      return;
    }
  }

  // Graceful fallback to local response if DeepSeek is unavailable or returned an error
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify({
    text: localResponse.text,
    mediaUrls: localResponse.mediaUrls || [],
    suggestedDealer: localResponse.suggestedDealer,
    quickActions: localResponse.quickActions,
    detectedLanguage: localResponse.detectedLanguage || lang,
    source: 'local-fallback'
  }));
}
