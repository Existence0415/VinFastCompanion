import type { Dealer, ChatMessage } from '../types';
import { DEALERS } from './dealers';

interface BrainResponse {
  text: string;
  mediaUrls: string[];
  suggestedDealer?: Dealer;
  quickActions?: {
    label: string;
    action: 'book_test_drive' | 'calculate_model' | 'call_dealer' | 'view_dealer';
    payload?: string;
  }[];
  detectedLanguage?: string;
}

// Media URLs database
const MEDIA_MAP: Record<string, { model: string; color: string; url: string }[]> = {
  'vf 3': [
    { model: 'VF 3', color: 'Blue', url: 'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf3%20blue.png' },
    { model: 'VF 3', color: 'Green', url: 'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf3%20green.png' },
    { model: 'VF 3', color: 'Light Blue', url: 'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf3%20light%20blue.png' },
    { model: 'VF 3', color: 'Grey', url: 'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf3%20grey.png' },
    { model: 'VF 3', color: 'Pink', url: 'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf3%20pink.png' },
    { model: 'VF 3', color: 'Purple', url: 'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf3%20purple.png' },
    { model: 'VF 3', color: 'Red', url: 'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf3%20red.png' },
    { model: 'VF 3', color: 'White', url: 'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf3%20white.png' },
    { model: 'VF 3', color: 'Yellow', url: 'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf3%20yellow.png' },
  ],
  'vf 5': [
    { model: 'VF 5 Plus', color: 'Brahminy White', url: 'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf5%20brahimny%20white.png' },
    { model: 'VF 5 Plus', color: 'Crimson Grey', url: 'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf5%20crimson%20grey.png' },
    { model: 'VF 5 Plus', color: 'Crimson Red', url: 'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf5%20crimson%20red.png' },
    { model: 'VF 5 Plus', color: 'VinFast Blue', url: 'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf5%20vinfast%20blue.png' },
  ],
  'vf 6': [
    { model: 'VF 6', color: 'Crimson Red', url: 'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf6%20crimson%20red.png' },
    { model: 'VF 6', color: 'Infinity Blanc', url: 'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf6%20infinity%20blanc.png' },
    { model: 'VF 6', color: 'Jet Black', url: 'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf6%20jet%20black.png' },
    { model: 'VF 6', color: 'Urban Mint', url: 'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf6%20urban%20mint.png' },
    { model: 'VF 6', color: 'Zenith Grey', url: 'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf6%20zenith%20grey.png' },
  ],
  'vf 7': [
    { model: 'VF 7', color: 'Jet Black', url: 'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf7%20black.png' },
    { model: 'VF 7', color: 'Blue', url: 'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf7%20blue.png' },
    { model: 'VF 7', color: 'Green', url: 'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf7%20green.png' },
    { model: 'VF 7', color: 'Grey', url: 'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf7%20grey.png' },
    { model: 'VF 7', color: 'Red', url: 'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf7%20red.png' },
    { model: 'VF 7', color: 'Silver', url: 'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf7%20silver.png' },
    { model: 'VF 7', color: 'White', url: 'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf7%20white.png' },
  ],
};

/**
 * Finds the closest dealer based on user input location keywords
 */
export function findNearestDealer(query: string): Dealer | undefined {
  const q = query.toLowerCase();

  for (const dealer of DEALERS) {
    if (q.includes(dealer.city.toLowerCase())) return dealer;
    if (dealer.province && q.includes(dealer.province.toLowerCase())) return dealer;
    for (const area of dealer.serves) {
      if (q.includes(area.toLowerCase())) return dealer;
    }
  }

  // Common keywords
  if (q.includes('manila') || q.includes('bgc') || q.includes('taguig') || q.includes('makati')) {
    return DEALERS.find(d => d.id === 'dealer-bgc');
  }
  if (q.includes('quezon') || q.includes('qc') || q.includes('edsa') || q.includes('cubao')) {
    return DEALERS.find(d => d.id === 'dealer-eton-centris');
  }
  if (q.includes('alabang') || q.includes('muntinlupa') || q.includes('filinvest') || q.includes('las pinas')) {
    return DEALERS.find(d => d.id === 'dealer-atc');
  }
  if (q.includes('cavite') || q.includes('bacoor') || q.includes('imus')) {
    return DEALERS.find(d => d.id === 'dealer-bacoor');
  }
  if (q.includes('cebu') || q.includes('visayas') || q.includes('mandaue')) {
    return DEALERS.find(d => d.id === 'dealer-cebu-central');
  }
  if (q.includes('davao') || q.includes('mindanao')) {
    return DEALERS.find(d => d.id === 'dealer-davao-buhangin');
  }
  if (q.includes('gensan') || q.includes('general santos') || q.includes('cotabato')) {
    return DEALERS.find(d => d.id === 'dealer-gensan');
  }
  if (q.includes('tarlac') || q.includes('clark') || q.includes('pampanga')) {
    return DEALERS.find(d => d.id === 'dealer-capas');
  }
  if (q.includes('pangasinan') || q.includes('dagupan') || q.includes('urdaneta')) {
    return DEALERS.find(d => d.id === 'dealer-urdaneta');
  }
  if (q.includes('bulacan')) {
    return DEALERS.find(d => d.id === 'dealer-sta-maria');
  }
  if (q.includes('isabela')) {
    return DEALERS.find(d => d.id === 'dealer-cordon');
  }

  return undefined;
}

/**
 * Detects whether the user is requesting to speak in a specific language,
 * or typing in that language (e.g. Bisaya, Ilonggo, Chinese, Spanish, Japanese, Korean, etc.).
 */
export function detectLanguage(query: string, currentLang: string = 'EN'): { lang: string; isExplicitSwitch: boolean } {
  const q = query.toLowerCase();

  // 1. Bisaya / Cebuano
  const isBisayaSwitch =
    q.includes('bisaya') ||
    q.includes('cebuano') ||
    q.includes('binisaya') ||
    q.includes('sinugboanon') ||
    q.includes('mag-bisaya') ||
    q.includes('mag bisaya') ||
    q.includes('pag-bisaya') ||
    q.includes('makasulti kag bisaya') ||
    q.includes('kasabot ka bisaya') ||
    q.includes('kahibalo ka mag bisaya') ||
    q.includes('kabalo ka mag bisaya') ||
    q.includes('pwede bisaya') ||
    q.includes('pwede mag-bisaya') ||
    q.includes('pwede mag bisaya') ||
    q.includes('speak bisaya') ||
    q.includes('in bisaya');

  const hasBisayaWords =
    q.includes('maayong buntag') ||
    q.includes('maayong hapon') ||
    q.includes('maayong adlaw') ||
    q.includes('maayong gabii') ||
    q.includes('pila ang') ||
    q.includes('tagpila') ||
    q.includes('pila man') ||
    q.includes('palihug') ||
    q.includes('balayran') ||
    q.includes('salamat kaayo') ||
    q.includes('asa ang showroom') ||
    q.includes('asa dapit') ||
    q.includes('pila ka tuig') ||
    q.includes('unsaon pag') ||
    q.includes('mopalit') ||
    q.includes('sakyanan');

  if (isBisayaSwitch) return { lang: 'CEB', isExplicitSwitch: true };
  if (hasBisayaWords) return { lang: 'CEB', isExplicitSwitch: false };

  // 2. Ilonggo / Hiligaynon
  const isIlonggoSwitch =
    q.includes('ilonggo') ||
    q.includes('hiligaynon') ||
    q.includes('mag-ilonggo') ||
    q.includes('mag ilonggo') ||
    q.includes('makahambal ka ilonggo') ||
    q.includes('makaintindi ka ilonggo') ||
    q.includes('pwede ilonggo') ||
    q.includes('pwede mag-ilonggo') ||
    q.includes('pwede mag ilonggo') ||
    q.includes('speak ilonggo') ||
    q.includes('in ilonggo');

  const hasIlonggoWords =
    q.includes('maayong aga') ||
    q.includes('maayong gab-i') ||
    q.includes('diin') ||
    q.includes('sang') ||
    q.includes('balayran') ||
    q.includes('pila ang balayran') ||
    q.includes('pila ang bili') ||
    q.includes('luyag') ||
    q.includes('luyag ko') ||
    q.includes('pamangkot') ||
    q.includes('namian') ||
    q.includes('subong') ||
    q.includes('iloilo') ||
    q.includes('bacolod');

  if (isIlonggoSwitch) return { lang: 'ILO', isExplicitSwitch: true };
  if (hasIlonggoWords) return { lang: 'ILO', isExplicitSwitch: false };

  // 3. Chinese / Mandarin
  const isChineseSwitch =
    q.includes('chinese') ||
    q.includes('mandarin') ||
    q.includes('中文') ||
    q.includes('普通话') ||
    q.includes('华语') ||
    q.includes('国语') ||
    q.includes('说中文') ||
    q.includes('讲中文') ||
    q.includes('用中文') ||
    q.includes('会中文') ||
    q.includes('can you speak chinese') ||
    q.includes('speak chinese') ||
    q.includes('in chinese');

  const hasChineseChars = /[\u4e00-\u9fa5]{2,}/.test(query);

  if (isChineseSwitch) return { lang: 'ZH', isExplicitSwitch: true };
  if (hasChineseChars) return { lang: 'ZH', isExplicitSwitch: false };

  // 4. Spanish
  const isSpanishSwitch =
    q.includes('spanish') ||
    q.includes('español') ||
    q.includes('espanol') ||
    q.includes('hablas espanol') ||
    q.includes('hablas español') ||
    q.includes('hablar en español') ||
    q.includes('en español') ||
    q.includes('en espanol') ||
    q.includes('speak spanish');

  const hasSpanishWords =
    q.includes('buenos dias') ||
    q.includes('buenas tardes') ||
    q.includes('cuanto cuesta') ||
    q.includes('prueba de manejo');

  if (isSpanishSwitch) return { lang: 'ES', isExplicitSwitch: true };
  if (hasSpanishWords) return { lang: 'ES', isExplicitSwitch: false };

  // 5. Japanese
  const isJapaneseSwitch =
    q.includes('japanese') ||
    q.includes('日本語') ||
    q.includes('にほんご') ||
    q.includes('speak japanese') ||
    q.includes('in japanese');

  const hasJapaneseChars = /[\u3040-\u30ff]{2,}/.test(query);

  if (isJapaneseSwitch) return { lang: 'JA', isExplicitSwitch: true };
  if (hasJapaneseChars) return { lang: 'JA', isExplicitSwitch: false };

  // 6. Korean
  const isKoreanSwitch =
    q.includes('korean') ||
    q.includes('한국어') ||
    q.includes('한국말') ||
    q.includes('speak korean') ||
    q.includes('in korean');

  const hasKoreanChars = /[\uac00-\ud7af]{2,}/.test(query);

  if (isKoreanSwitch) return { lang: 'KO', isExplicitSwitch: true };
  if (hasKoreanChars) return { lang: 'KO', isExplicitSwitch: false };

  // 7. Tagalog / Filipino
  const isTagalogSwitch =
    q.includes('tagalog') ||
    q.includes('filipino') ||
    q.includes('mag-tagalog') ||
    q.includes('mag tagalog') ||
    q.includes('pwede mag-tagalog') ||
    q.includes('speak tagalog') ||
    q.includes('in tagalog');

  if (isTagalogSwitch) return { lang: 'PH', isExplicitSwitch: true };

  // 8. English
  const isEnglishSwitch =
    q.includes('speak in english') ||
    q.includes('speak english') ||
    q.includes('english please') ||
    q.includes('in english') ||
    q.includes('switch to english');

  if (isEnglishSwitch) return { lang: 'EN', isExplicitSwitch: true };

  // 9. Generic language request (e.g., "speak in French", "can you speak German", "talk in Vietnamese")
  const genericMatch = q.match(/\b(?:speak|converse|talk|translate|switch to)\s+(?:in\s+)?([a-zA-Z]+)\b/i);
  if (genericMatch && genericMatch[1]) {
    const word = genericMatch[1].toLowerCase();
    const commonIgnored = ['to', 'with', 'about', 'a', 'the', 'my', 'your', 'me', 'us', 'detail', 'details', 'terms', 'mind', 'fact', 'short', 'full', 'more', 'now'];
    if (!commonIgnored.includes(word)) {
      return { lang: word.toUpperCase(), isExplicitSwitch: true };
    }
  }

  // Otherwise retain current language
  return { lang: currentLang, isExplicitSwitch: false };
}

export interface ConversationContext {
  lastModel?: 'VF 3' | 'VF 5 Plus' | 'VF 6' | 'VF 7' | 'VF 9';
  lastModelId?: 'vf-3' | 'vf-5-plus' | 'vf-6' | 'vf-7' | 'vf-9';
  lastTopic?: 'pricing' | 'subscription' | 'colors' | 'photos' | 'specs' | 'dealers' | 'test_drive' | 'comparison' | 'savings' | 'general';
  lastClosingQuestion?: string;
  repeatModelCount: number;
  repeatTopicCount: number;
  totalTurns: number;
}

/**
 * Extracts conversation context from prior chat history to resolve pronouns,
 * track discussed models and topics, and prevent repetitive responses.
 */
export function extractConversationContext(history: ChatMessage[] = [], currentQuery: string): ConversationContext {
  let lastModel: ConversationContext['lastModel'];
  let lastModelId: ConversationContext['lastModelId'];
  let lastTopic: ConversationContext['lastTopic'];
  let lastClosingQuestion: string | undefined;
  let repeatModelCount = 0;
  let repeatTopicCount = 0;

  const q = currentQuery.toLowerCase();
  const currentModel = detectModelInText(q);
  const currentTopic = detectTopicInText(q);

  // Scan messages in reverse (from newest to oldest)
  const pastMessages = history.slice();
  if (pastMessages.length > 0 && pastMessages[pastMessages.length - 1].sender === 'user' && pastMessages[pastMessages.length - 1].text.trim() === currentQuery.trim()) {
    pastMessages.pop();
  }

  for (let i = pastMessages.length - 1; i >= 0; i--) {
    const msg = pastMessages[i];
    const text = msg.text.toLowerCase();

    if (!lastModel) {
      const found = detectModelInText(text);
      if (found) {
        lastModel = found.model;
        lastModelId = found.id;
      }
    }

    if (!lastTopic) {
      const foundTopic = detectTopicInText(text);
      if (foundTopic) {
        lastTopic = foundTopic;
      }
    }

    if (!lastClosingQuestion && msg.sender === 'assistant') {
      const lines = msg.text.trim().split('\n').filter(l => l.trim().length > 0);
      if (lines.length > 0) {
        lastClosingQuestion = lines[lines.length - 1];
      }
    }

    if (lastModel && lastTopic && lastClosingQuestion) break;
  }

  // Count repeat inquiries on the same model
  if (currentModel && lastModel && currentModel.model === lastModel) {
    repeatModelCount = 1;
    for (let i = pastMessages.length - 1; i >= 0; i--) {
      const m = detectModelInText(pastMessages[i].text.toLowerCase());
      if (m && m.model === lastModel) repeatModelCount++;
      else if (m) break;
    }
  }

  // Count repeat inquiries on the same topic
  if (currentTopic && lastTopic && currentTopic === lastTopic) {
    repeatTopicCount = 1;
    for (let i = pastMessages.length - 1; i >= 0; i--) {
      const t = detectTopicInText(pastMessages[i].text.toLowerCase());
      if (t && t === lastTopic) repeatTopicCount++;
      else if (t) break;
    }
  }

  return {
    lastModel,
    lastModelId,
    lastTopic,
    lastClosingQuestion,
    repeatModelCount,
    repeatTopicCount,
    totalTurns: history.length,
  };
}

export function detectModelInText(text: string): { model: ConversationContext['lastModel']; id: ConversationContext['lastModelId'] } | undefined {
  if (text.includes('vf 3') || text.includes('vf3')) return { model: 'VF 3', id: 'vf-3' };
  if (text.includes('vf 5') || text.includes('vf5')) return { model: 'VF 5 Plus', id: 'vf-5-plus' };
  if (text.includes('vf 6') || text.includes('vf6')) return { model: 'VF 6', id: 'vf-6' };
  if (text.includes('vf 7') || text.includes('vf7')) return { model: 'VF 7', id: 'vf-7' };
  if (text.includes('vf 9') || text.includes('vf9')) return { model: 'VF 9', id: 'vf-9' };
  return undefined;
}

export function detectTopicInText(text: string): ConversationContext['lastTopic'] | undefined {
  if (text.includes('photo') || text.includes('picture') || text.includes('image') || text.includes('litrato') || text.includes('larawan') || text.includes('gallery') || text.includes('图片') || text.includes('写真') || text.includes('사진')) return 'photos';
  if (text.includes('color') || text.includes('kulay') || text.includes('look') || text.includes('paint') || text.includes('kolor') || text.includes('颜色') || text.includes('色') || text.includes('색상')) return 'colors';
  if (text.includes('subscription') || text.includes('lease') || text.includes('rental') || text.includes('baterya') || text.includes('租') || text.includes('구독')) return 'subscription';
  if (text.includes('price') || text.includes('presyo') || text.includes('magkano') || text.includes('srp') || text.includes('cost') || text.includes('financing') || text.includes('monthly') || text.includes('promo') || text.includes('discount') || text.includes('down payment') || text.includes('hulog') || text.includes('pila') || text.includes('tagpila') || text.includes('多少钱') || text.includes('报价') || text.includes('cuanto') || text.includes('いくら') || text.includes('얼마')) return 'pricing';
  if (text.includes('dealer') || text.includes('showroom') || text.includes('branch') || text.includes('saan') || text.includes('where') || text.includes('location') || text.includes('address') || text.includes('hotline') || text.includes('cebu') || text.includes('davao') || text.includes('gensan') || text.includes('manila') || text.includes('bgc') || text.includes('展厅') || text.includes('门店') || text.includes('asa') || text.includes('diin') || text.includes('concesionario') || text.includes('ディーラー') || text.includes('매장') || text.includes('대리점')) return 'dealers';
  if (text.includes('test drive') || text.includes('subukan') || text.includes('drive') || text.includes('try') || text.includes('schedule') || text.includes('book') || text.includes('试驾') || text.includes('prueba de manejo') || text.includes('試乗') || text.includes('시승')) return 'test_drive';
  if (text.includes('range') || text.includes('charging') || text.includes('charge') || text.includes('hp') || text.includes('speed') || text.includes('specs') || text.includes('feature') || text.includes('ground clearance') || text.includes('motor') || text.includes('torque') || text.includes('battery') || text.includes('续航') || text.includes('充电') || text.includes('走行距離') || text.includes('주행거리')) return 'specs';
  if (text.includes('compare') || text.includes('vs') || text.includes('gas') || text.includes('toyota') || text.includes('byd') || text.includes('kontra') || text.includes('ihambing')) return 'comparison';
  if (text.includes('save') || text.includes('savings') || text.includes('tipid') || text.includes('gasolina') || text.includes('diesel')) return 'savings';
  return undefined;
}

/**
 * Detects whether a query is ambiguous, confusing, or non-committal
 * so the AI can provide focused clarification without dumping unrelated text.
 */
export function isConfusingOrAmbiguous(rawQuery: string): boolean {
  const q = rawQuery.trim().toLowerCase();

  const hasDomainKeyword =
    q.includes('vf') ||
    q.includes('vinfast') ||
    q.includes('price') ||
    q.includes('presyo') ||
    q.includes('magkano') ||
    q.includes('pila') ||
    q.includes('dealer') ||
    q.includes('showroom') ||
    q.includes('test drive') ||
    q.includes('subok') ||
    q.includes('color') ||
    q.includes('kulay') ||
    q.includes('photo') ||
    q.includes('picture') ||
    q.includes('litrato') ||
    q.includes('range') ||
    q.includes('km') ||
    q.includes('charge') ||
    q.includes('charging') ||
    q.includes('battery') ||
    q.includes('baterya') ||
    q.includes('warranty') ||
    q.includes('evida') ||
    q.includes('coding') ||
    q.includes('cebu') ||
    q.includes('davao') ||
    q.includes('manila') ||
    q.includes('bgc') ||
    q.includes('qc') ||
    q.includes('试驾') ||
    q.includes('展厅') ||
    q.includes('多少钱') ||
    q.includes('颜色') ||
    q.includes('续航') ||
    q.includes('시승') ||
    q.includes('가격') ||
    q.includes('試乗') ||
    q.includes('価格') ||
    q.includes('specs') ||
    q.includes('features');

  if (hasDomainKeyword) return false;

  const ambiguousPhrases = [
    'ok', 'okay', 'k', 'kk', 'sure', 'yes', 'no', 'maybe', 'huh', 'huh?', 'what', 'what?',
    'how', 'how?', 'tell me more', 'hmm', 'hmmm', 'why', 'why?', 'idk', 'what do you mean',
    'not sure', 'confused', 'i don\'t know', 'what else', 'and then', 'so?', 'so what',
    'ano?', 'ano', 'ha?', 'ano po?', 'bakit?', 'sige', 'sige nga', 'talaga?', 'e ano?',
    'paano?', 'paano ba?', 'ewan', 'di ko alam', 'wala lang', 'pwede ba?', 'anong meron',
    'unsa?', 'unsa man?', 'ngano?', 'mao ba?', 'ambot', 'unya?',
    'ano?', 'nga-a?', 'ti ano?',
    '什么?', '什么', '怎么说', '然後呢', '然后呢', '不懂', '啊?', '哦', '好的', '行吧', '不知道',
    'que?', '¿qué?', 'como?', '¿cómo?', 'no se', 'bueno', 'vale',
    'どういうこと?', 'え？', '何？', 'うん', 'わからない',
    '뭐?', '어떤 거?', '글쎄', '몰라', '네', '어떻게?',
  ];

  if (ambiguousPhrases.includes(q)) return true;
  if (/^[?!\.\s,;:-]+$/.test(q)) return true;
  if (q.length <= 3 && !/^[0-9]+$/.test(q)) return true;

  return false;
}

/**
 * Relates closing questions based on previous conversation history and the current inquiry,
 * ensuring variation and always directing the user toward a close or a VIP test drive.
 */
export function generateDynamicClosingQuestion(
  topic: string,
  modelName: string,
  context: ConversationContext,
  lang: string,
  dealerName?: string
): string {
  const isTagalog = lang === 'PH';
  const isBisaya = lang === 'CEB';
  const isChinese = lang === 'ZH';

  // 1. If previous topic was pricing and current is colors / photos
  if (context.lastTopic === 'pricing' && (topic === 'colors' || topic === 'photos')) {
    if (isTagalog) return `Dahil abot-kaya ang presyo ng ${modelName}, aling kulay ang nais mong makita nang personal sa iyong libreng VIP test drive?`;
    if (isBisaya) return `Tungod kay abot-kaya kaayo ang presyo sa ${modelName}, unsa nga kolor ang gusto nimong makita sa personal sa imong test drive?`;
    if (isChinese) return `鉴于 ${modelName} 极具性价比的官方售价，请问您想在到店试驾时亲自鉴赏哪款车身颜色？`;
    return `Since the ${modelName} offers such an accessible price point, which of these colors would you like to see in person during your VIP test drive?`;
  }

  // 2. If previous topic was colors and current is test drive / dealers
  if (context.lastTopic === 'colors' && (topic === 'test_drive' || topic === 'dealers')) {
    const dText = dealerName ? ` sa ${dealerName}` : '';
    const dTextEn = dealerName ? ` at ${dealerName}` : '';
    const dTextZh = dealerName ? `在 ${dealerName}` : '';
    if (isTagalog) return `Maaari naming ihanda ang iyong paboritong kulay ng ${modelName}${dText}. Nais mo bang ipag-schedule kita ng VIP test drive ngayong Sabado o Linggo?`;
    if (isBisaya) return `Mahimo namong iandam ang imong paboritong kolor sa ${modelName}. Gusto ba nimong mag-book og test drive karong semanaha?`;
    if (isChinese) return `我们可以提前为您备好心仪颜色的 ${modelName} 试驾车辆${dTextZh}。请问您想预约本周末上午还是下午到店？`;
    return `We can arrange to have your preferred color of the ${modelName} prepared for your arrival${dTextEn}. Would you prefer a morning or afternoon slot this weekend for your VIP test drive?`;
  }

  // 3. If previous topic was dealers and current is pricing / financing
  if (context.lastTopic === 'dealers' && topic === 'pricing') {
    const dText = dealerName ? ` sa ${dealerName}` : ' sa pinakamalapit na showroom';
    const dTextEn = dealerName ? ` at ${dealerName}` : ' at your nearest showroom';
    const dTextZh = dealerName ? `在 ${dealerName}` : '在离您最近的官方展厅';
    if (isTagalog) return `Maaari ring magbigay ng agarang bank approval ang aming finance team${dText}. Nais mo bang mag-book ng test drive kasama ang formal loan quotation doon?`;
    if (isBisaya) return `Makapreparar ang among finance team${dText} og on-the-spot bank computation. Mag-book ba kita og test drive slot karon?`;
    if (isChinese) return `我们${dTextZh}的金融顾问可现场为您办理银行分期极速预审。需要为您预约到店试驾并获取专属方案吗？`;
    return `Our on-site finance team${dTextEn} can also assist with immediate bank pre-approvals. Would you like to schedule an appointment for both a VIP test drive and a formal quotation?`;
  }

  // 4. If current topic is test drive
  if (topic === 'test_drive') {
    if (isTagalog) return `Ang test drive ay 100% libre at tumatagal lamang ng 20-30 minuto. Aling araw ngayong linggo ang pinaka-maginhawa para sa iyo upang subukan ang ${modelName}?`;
    if (isBisaya) return `Libre ug walay bayad ang test drive sulod sa 20-30 minutos. Unsa nga adlaw karong semanaha ang pinakamaayo para masulayan ang ${modelName}?`;
    if (isChinese) return `VIP 试驾全程免费并配备专属产品专家讲解（约 20-30 分钟）。请问您这周哪一天到店试驾 ${modelName} 最方便？`;
    return `VIP test drives are 100% complimentary and take just 20-30 minutes. Which day this week works best for your schedule to test drive the ${modelName}?`;
  }

  // 5. If current topic is dealers
  if (topic === 'dealers') {
    const dName = dealerName || (isTagalog ? 'pinakamalapit na showroom' : 'your nearest showroom');
    if (isTagalog) return `Handa ang aming mga demo units at EV specialists sa ${dName}. Ipag-schedule ba kita ng VIP test drive doon ngayong linggo?`;
    if (isBisaya) return `Andam na ang mga test drive units sa atong showroom sa ${dName}. Mag-book ba kita og test drive karong semanaha?`;
    if (isChinese) return `我们官方展厅已备好试驾车辆与专业顾问。需要为您预约本周到店深度体验吗？`;
    return `Our team at ${dName} has demo vehicles and certified EV specialists ready. Shall I reserve a VIP test drive slot for you this week?`;
  }

  // 6. If current topic is specs / features
  if (topic === 'specs' || topic === 'features') {
    if (isTagalog) return `Nais mo bang maranasan ang instant electric acceleration at tahimik na biyahe ng ${modelName} sa isang libreng test drive ngayong linggo?`;
    if (isBisaya) return `Gusto ba nimong masulayan ang kusog nga electric motor ug hapsay nga dagan sa ${modelName} pinaagi sa usa ka libreng test drive?`;
    if (isChinese) return `您想在本周的免费深度试驾中，亲自体验 ${modelName} 优异的即时扭矩加速与静谧智能座舱吗？`;
    return `Would you like to experience the instant electric acceleration and whisper-quiet ride of the ${modelName} during a complimentary test drive this week?`;
  }

  // 7. If repeating inquiry on the same model or topic
  if (context.repeatModelCount > 0 || context.repeatTopicCount > 0) {
    if (isTagalog) return `Gusto mo bang magreserba ng test drive unit para sa ${modelName} upang mapatunayan mo mismo ang mga bentaheng ito sa kalsada?`;
    if (isBisaya) return `Gusto ba nimong masulayan ang ${modelName} sa kalsada pinaagi sa usa ka libreng VIP test drive karong semanaha?`;
    if (isChinese) return `您想亲自开上路感受 ${modelName} 的卓越性能与省心品质吗？我可以立即为您锁定本周的试驾席位。`;
    return `Would you like to get behind the wheel of the ${modelName} this week so you can verify these advantages firsthand on the road?`;
  }

  // Default fallback closing question
  if (isTagalog) return `Nais mo bang mag-book ng libreng VIP test drive sa pinakamalapit na VinFast showroom upang maranasan ang ${modelName}?`;
  if (isBisaya) return `Gusto ba nimong mag-book og libreng test drive sa labing duol nga showroom aron masulayan ang ${modelName}?`;
  if (isChinese) return `需要为您预约离您最近的官方展厅，体验 ${modelName} 的免费专属试驾吗？`;
  return `Would you like me to schedule a complimentary VIP test drive for you in the ${modelName} at your nearest showroom this week?`;
}

/**
 * Generates responses in languages requested by the customer (Bisaya, Ilonggo, Chinese, Spanish, Japanese, Korean, etc.)
 */
function generateMultilingualResponse(
  rawQuery: string,
  lang: string,
  isExplicitSwitch: boolean,
  context: ConversationContext
): BrainResponse | null {
  const q = rawQuery.toLowerCase();
  const explicitModel = detectModelInText(q);
  const activeModel = explicitModel?.model || context.lastModel || 'VF 3';
  const ambiguous = isConfusingOrAmbiguous(rawQuery);

  // ----------------------------------------------------
  // 1. BISAYA / CEBUANO (CEB)
  // ----------------------------------------------------
  if (lang === 'CEB') {
    if (isExplicitSwitch) {
      return {
        text: [
          'MAAYONG ADLAW KANIMO',
          '',
          'Oo, makasulti ug makatabang ako kanimo sa Binisaya o Sinugboanon!',
          '',
          'Ako ang imong opisyal nga VinFast Senior Sales Specialist dinhi sa Pilipinas. Handa ako nga motabang kanimo sa tanang impormasyon kabahin sa atong mga 100% electric vehicles:',
          '',
          'ANG ATING MGA MODELO UG PRESYO',
          '- VF 3: Urban Mini Electric SUV simula ₱590,000 (Battery Subscription) o ₱745,000 (Outright)',
          '- VF 5 Plus: Compact Family Crossover simula ₱992,000 (Battery Subscription) o ₱1,191,000 (Outright)',
          '- VF 6: Modernong Italian-Styled Crossover simula ₱1,499,000',
          '- VF 7: Kusog nga Aero-Dynamic Crossover (hangtod 348 hp AWD) simula ₱1,760,000',
          '- VF 9: Luho nga 7-Seater Presidential Flagship SUV simula ₱4,990,000',
          '',
          'MGA SHOWROOM SA VISAYAS UG MINDANAO',
          '- Cebu: VinFast Cebu Central (A.S. Fortuna), Cebu North Mandaue, Cebu South SRP, ug Dumaguete',
          '- Mindanao: VinFast Davao Buhangin, Tagum, ug General Santos',
          '',
          generateDynamicClosingQuestion('general', 'VF 3', context, 'CEB')
        ].join('\n'),
        mediaUrls: [],
      };
    }

    if (ambiguous) {
      if (context.lastModel) {
        return {
          text: [
            `MAHITUNGOD SA IMONG INQUIRY SA ${context.lastModel}`,
            '',
            `Gusto nakong masiguro nga mahatag nako ang eksaktong impormasyon nga imong gikinahanglan kabahin sa ${context.lastModel}:`,
            '',
            'MGA IMPORMASYON NGA MAKATABANG',
            '- Opisyal nga Presyo: May Battery Subscription o Outright purchase',
            '- Mga Kolor ug Litrato: Kompleto nga gallery sa exterior finishes',
            '- Libreng VIP Test Drive: Masulayan ang sakyanan sa labing duol nga showroom',
            '',
            generateDynamicClosingQuestion('test_drive', context.lastModel, context, 'CEB')
          ].join('\n'),
          mediaUrls: [],
        };
      }
      return {
        text: [
          'VINFAST SALES CONSULTATION',
          '',
          'Aron matabangan tika sa labing maayong paagi, unsa nga bahin sa VinFast ang gusto nimong masayran?',
          '',
          'PANGUNANG MGA OPSYON',
          '- VF 3: Mini Electric SUV gikan ₱590,000 (210 km range)',
          '- VF 5 Plus: Family Crossover gikan ₱992,000 (326 km range)',
          '- 29 ka Opisyal nga Showroom: Sa Metro Manila, Cebu, Davao, ug tibuok Pilipinas',
          '- Libreng VIP Test Drive: Masinati ang 100% electric driving nga walay bayad',
          '',
          generateDynamicClosingQuestion('general', 'VF 3', context, 'CEB')
        ].join('\n'),
        mediaUrls: [],
      };
    }

    // Colors & Photos in Bisaya
    const isPhoto = q.includes('photo') || q.includes('picture') || q.includes('image') || q.includes('color') || q.includes('kulay') || q.includes('litrato') || q.includes('kolor');
    if (isPhoto) {
      const targetModel = q.includes('5') ? 'vf 5' : 'vf 3';
      const media = MEDIA_MAP[targetModel];
      const urls = media.map(m => m.url);
      const name = targetModel === 'vf 5' ? 'VF 5 Plus' : 'VF 3';
      return {
        text: [
          `MGA KOLOR UG LITRATO SA VINFAST ${name}`,
          '',
          `Narito ang mga opisyal nga kolor sa ${name} nga mapilian sa Pilipinas:`,
          '',
          targetModel === 'vf 3'
            ? '- Blue\n- Green\n- Light Blue\n- Grey\n- Pink\n- Purple\n- Red\n- White\n- Yellow'
            : '- Brahminy White\n- Crimson Grey\n- Crimson Red\n- VinFast Blue',
          '',
          urls.join('\n\n'),
          '',
          generateDynamicClosingQuestion('colors', name, context, 'CEB')
        ].join('\n'),
        mediaUrls: urls,
      };
    }

    // Test Drive in Bisaya
    if (q.includes('test drive') || q.includes('drive') || q.includes('subukan') || q.includes('sulayan') || q.includes('book') || q.includes('schedule')) {
      const nearest = findNearestDealer(rawQuery) || DEALERS.find(d => d.id === 'dealer-cebu-central');
      return {
        text: [
          'LIBRENG VIP TEST DRIVE SA VINFAST',
          '',
          'Ang test drive sa VinFast kay 100% libre ug walay bayad:',
          '',
          'MGA DETALYE SA TEST DRIVE',
          '- Gidugayon: 20 hangtod 30 minutos uban sa atong sertipikadong product specialist',
          '- Kinahanglanon: Pagdala lang og balidong driver\'s license',
          '- Lokasyon: Magamit sa tanang 29 ka opisyal nga showroom sa tibuok nasod',
          nearest ? `- Gisugyot nga Showroom: ${nearest.name} (${nearest.address})` : '',
          '',
          generateDynamicClosingQuestion('test_drive', activeModel, context, 'CEB', nearest?.name)
        ].filter(Boolean).join('\n'),
        mediaUrls: [],
        suggestedDealer: nearest,
      };
    }

    // Features & Specs in Bisaya
    if (q.includes('range') || q.includes('km') || q.includes('charge') || q.includes('charging') || q.includes('baterya') || q.includes('battery') || q.includes('hp') || q.includes('speed') || q.includes('ground clearance') || q.includes('warranty')) {
      return {
        text: [
          'MGA PANGUNAHING SPECIFICATIONS UG BENTAHE',
          '',
          '- Driving Range: 210 km (VF 3) / 326 km (VF 5 Plus) sa matag full charge',
          '- Madasig nga DC Fast Charging: 10% hangtod 70% sulod sa 36 minutos',
          '- Ground Clearance: 191 mm sa VF 3 (taas ug dili masangad sa baha o lubak)',
          '- Garantiya: Hangtod 7-10 ka tuig o 160,000-200,000 km warranty',
          '- Zero Gastusin sa Gasolina: Makadaginot og mga ₱8,000 matag buwan sa krudo',
          '',
          generateDynamicClosingQuestion('specs', activeModel, context, 'CEB')
        ].join('\n'),
        mediaUrls: [],
      };
    }

    // VF 3 inquiries in Bisaya
    if (q.includes('3') || q.includes('vf 3') || q.includes('vf3')) {
      const media = MEDIA_MAP['vf 3'];
      const urls = media.map(m => m.url);
      return {
        text: [
          'VINFAST VF 3 SA PILIPINAS',
          '',
          'Ang VF 3 mao ang pinaka-popular nga urban mini electric SUV sa Pilipinas nga perpekto sa trapiko sa siyudad:',
          '',
          'MGA DETALYE UG PRESYO',
          '- Presyo nga may Battery Subscription: ₱590,000',
          '- Presyo nga Outright (apil na ang baterya): ₱745,000',
          '- Driving Range: 210 km sa matag full charge',
          '- Ground Clearance: 191 mm (taas ug dili masangad sa baha o libaong)',
          '- Infotainment: 10-inch touch display nga may Apple CarPlay ug Android Auto',
          '- Kolor: Adunay 9 ka mabulokong exterior finishes',
          '',
          generateDynamicClosingQuestion('specs', 'VF 3', context, 'CEB')
        ].join('\n'),
        mediaUrls: urls,
      };
    }

    // VF 5 Plus inquiries in Bisaya
    if (q.includes('5') || q.includes('vf 5') || q.includes('vf5')) {
      const media = MEDIA_MAP['vf 5'];
      const urls = media.map(m => m.url);
      return {
        text: [
          'VINFAST VF 5 PLUS SA PILIPINAS',
          '',
          'Ang VF 5 Plus mao ang pinakamaayong compact crossover para sa pamilya ug adlaw-adlaw nga biyahe:',
          '',
          'MGA DETALYE UG PRESYO',
          '- Presyo nga may Battery Subscription: ₱992,000',
          '- Presyo nga Outright (apil na ang baterya): ₱1,191,000',
          '- Binuwan nga Hulog: Gibanabana nga ~₱16,400 matag buwan (36 ka bulan, 20% down payment)',
          '- Driving Range: 326 km (NEDC) sa matag full charge',
          '- Kusog sa Motor: 134 hp ug 135 Nm instant torque',
          '- Garantiya: 7 ka tuig o 160,000 km warranty',
          '',
          generateDynamicClosingQuestion('specs', 'VF 5 Plus', context, 'CEB')
        ].join('\n'),
        mediaUrls: urls,
      };
    }

    // VF 8 inquiry in Bisaya
    if (q.includes('vf 8') || q.includes('vf8')) {
      return {
        text: [
          'IMPORMASYON SA MODEL AVAILABILITY',
          '',
          'Gusto namong ipahibalo nga ang VF 8 sa pagkakaron wala gitanyag sa merkado sa Pilipinas.',
          '',
          'OPISYAL NGA MGA MODELO SA PILIPINAS',
          '- VF 3: Mini Electric SUV gikan ₱590,000',
          '- VF 5 Plus: Compact Family Crossover gikan ₱992,000',
          '- VF 6: Italian-Styled Crossover gikan ₱1,499,000',
          '- VF 7: Kusog nga Midsize Crossover (348 hp AWD) gikan ₱1,760,000',
          '- VF 9: 7-Seater Presidential Flagship SUV gikan ₱4,990,000',
          '',
          generateDynamicClosingQuestion('general', 'VF 7', context, 'CEB')
        ].join('\n'),
        mediaUrls: [],
      };
    }

    // Dealer inquiries in Bisaya
    if (q.includes('dealer') || q.includes('showroom') || q.includes('cebu') || q.includes('davao') || q.includes('gensan') || q.includes('dumaguete') || q.includes('asa')) {
      const nearest = findNearestDealer(rawQuery) || DEALERS.find(d => d.id === 'dealer-cebu-central');
      return {
        text: [
          'MGA SHOWROOM SA VINFAST SA PILIPINAS',
          '',
          'Aduna kitay 29 ka opisyal nga dealership sa tibuok nasod nga may kompleto nga service bays, DC fast-chargers, ug test drive units:',
          '',
          'MGA DEALER SA VISAYAS UG MINDANAO',
          '- Cebu Central: A.S. Fortuna St., Banilad, Mandaue City, Cebu',
          '- Cebu North: Mandaue North Highway, Cebu',
          '- Cebu South: South Road Properties, Cebu City',
          '- Dumaguete: National Highway, Dumaguete City, Negros Oriental',
          '- Davao Buhangin: Buhangin Road, Davao City',
          '- General Santos: National Highway, GenSan',
          '- Tagum: National Highway, Tagum City, Davao del Norte',
          '',
          nearest ? `PINAKADUOL NGA DEALER: ${nearest.name}\nAdres: ${nearest.address}\nHotline: ${nearest.hotline}\n` : '',
          generateDynamicClosingQuestion('dealers', activeModel, context, 'CEB', nearest?.name)
        ].filter(Boolean).join('\n'),
        mediaUrls: [],
        suggestedDealer: nearest,
      };
    }

    // Default Bisaya response
    return {
      text: [
        'VINFAST ELECTRIC VEHICLES PILIPINAS',
        '',
        'Ang VinFast ang nag-una sa electric mobility revolution sa Pilipinas nga may modernong teknolohiya, zero gastusin sa gasolina, ug pinakataas nga warranty.',
        '',
        'ANG ATING OPISYAL NGA MGA MODELO',
        '- VF 3: Mini Electric SUV gikan ₱590,000 (Battery Subscription)',
        '- VF 5 Plus: Compact Family Crossover gikan ₱992,000 (Battery Subscription)',
        '- VF 6: Italian-Styled Crossover gikan ₱1,499,000',
        '- VF 7: Aero-Dynamic Performance Crossover gikan ₱1,760,000',
        '- VF 9: 7-Seater Luxury Flagship SUV gikan ₱4,990,000',
        '',
        generateDynamicClosingQuestion('general', 'VF 3', context, 'CEB')
      ].join('\n'),
      mediaUrls: [],
    };
  }

  // ----------------------------------------------------
  // 2. ILONGGO / HILIGAYNON (ILO)
  // ----------------------------------------------------
  if (lang === 'ILO') {
    if (isExplicitSwitch) {
      return {
        text: [
          'MAAYONG ADLAW KAG MALIPAYONG PAG-ABOT',
          '',
          'Huo, makaintindi kag makahambal gid ako sa Ilonggo (Hiligaynon)!',
          '',
          'Ako ang imo opisyal nga VinFast Senior Sales Specialist sa Pilipinas. Handa ako magbulig sa imo parte sa aton mga de-kalidad nga 100% electric vehicles:',
          '',
          'MGA MODELO KAG PRESYO SANG VINFAST',
          '- VF 3: Urban Mini Electric SUV halin ₱590,000 (Battery Subscription) ukon ₱745,000 (Outright)',
          '- VF 5 Plus: Compact Family Crossover halin ₱992,000 (Battery Subscription) ukon ₱1,191,000 (Outright)',
          '- VF 6: Matahom nga Italian-Styled Crossover halin ₱1,499,000',
          '- VF 7: Madasig kag de-kuryente nga Crossover (tubtob 348 hp) halin ₱1,760,000',
          '- VF 9: 7-Seater Luxury Flagship SUV halin ₱4,990,000',
          '',
          'Dako gid ang masalbar mo sa krudo kon magbalhin ka sa electric vehicle, kag may 29 kita ka awtorisadong showroom sa bilog nga pungsod.',
          '',
          'Diin nga VinFast model ang luyag mo mahibal-an ukon i-test drive subong?'
        ].join('\n'),
        mediaUrls: [],
      };
    }

    if (ambiguous) {
      return {
        text: [
          'KONSULTASYON SA PAGBAKAL SANG VINFAST',
          '',
          'Para mabuligan ta ikaw sang maayo, ano nga bahin sang VinFast ang gusto mo mahibal-an?',
          '',
          'MGA PANGUNANG PILIANAN',
          '- VF 3: Urban Mini Electric SUV halin ₱590,000',
          '- VF 5 Plus: Family Crossover halin ₱992,000',
          '- 29 ka Awtorisadong Showroom sa bilog nga Pilipinas',
          '- Libre nga VIP Test Drive sa pinakamalapit nga sanga',
          '',
          'Gusto mo bala mag-book sang libre nga test drive para maeksperyensyahan ang aton mga de-kuryente nga salakyan?'
        ].join('\n'),
        mediaUrls: [],
      };
    }

    if (q.includes('photo') || q.includes('picture') || q.includes('color') || q.includes('litrato') || q.includes('kolor')) {
      const urls = MEDIA_MAP['vf 3'].map(m => m.url);
      return {
        text: [
          'MGA KOLOR KAG LITRATO SANG VINFAST VF 3',
          '',
          'May 9 ka matahom nga kolor ang VF 3 para sa imo pagsakay sa siyudad:',
          '',
          '- Blue\n- Green\n- Light Blue\n- Grey\n- Pink\n- Purple\n- Red\n- White\n- Yellow',
          '',
          urls.join('\n\n'),
          '',
          'Diin nga kolor ang gusto mo makit-an sa personal sa aton pinakamalapit nga showroom?'
        ].join('\n'),
        mediaUrls: urls,
      };
    }

    if (q.includes('test drive') || q.includes('drive') || q.includes('subukan') || q.includes('tilaw')) {
      const nearest = findNearestDealer(rawQuery) || DEALERS.find(d => d.id === 'dealer-iloilo') || DEALERS.find(d => d.id === 'dealer-bgc');
      return {
        text: [
          `LIBRE NGA VIP TEST DRIVE SANG VINFAST ${activeModel}`,
          '',
          `Ang aton test drive para sa ${activeModel} 100% libre kag nagadugay sang 20-30 minutos upod ang aton product specialist.`,
          'Kinahanglan mo lang magdala sang balido nga driver\'s license.',
          nearest ? `- Gisugyot nga Showroom: ${nearest.name} (${nearest.address})` : '- May 29 kita ka awtorisadong showroom sa bilog nga pungsod',
          '',
          `Luyag mo bala mag-iskedyul sang test drive para sa ${activeModel} subong nga semana sa pinakamalapit nga showroom?`
        ].join('\n'),
        mediaUrls: [],
        suggestedDealer: nearest,
      };
    }

    if (q.includes('3') || q.includes('vf 3') || q.includes('vf3')) {
      return {
        text: [
          'VINFAST VF 3 SA PILIPINAS',
          '',
          'Ang VF 3 amo ang paborito nga urban mini electric SUV nga bagay gid sa adlaw-adlaw nga byahe:',
          '',
          'MGA DETALYE KAG PRESYO',
          '- Presyo nga may Battery Subscription: ₱590,000',
          '- Presyo nga Outright (upod ang baterya): ₱745,000',
          '- Range sang Baterya: 210 km sa isa ka bug-os nga charge',
          '- Ground Clearance: 191 mm (mataas kag indi dali masalapay sa tubig ukon lubak)',
          '- Screen: 10-inch touchscreen nga may Apple CarPlay',
          '',
          'Luyag mo bala mag-iskedyul sang test drive ukon magtan-aw sang mga litrato sang VF 3?'
        ].join('\n'),
        mediaUrls: MEDIA_MAP['vf 3'].map(m => m.url),
      };
    }

    if (q.includes('5') || q.includes('vf 5') || q.includes('vf5')) {
      return {
        text: [
          'VINFAST VF 5 PLUS SA PILIPINAS',
          '',
          'Ang VF 5 Plus amo ang moderno kag komportable nga crossover para sa bilog nga pamilya:',
          '',
          'MGA DETALYE KAG PRESYO',
          '- Presyo nga may Battery Subscription: ₱992,000',
          '- Presyo nga Outright (upod ang baterya): ₱1,191,000',
          '- Binulan nga Hulog: Humalin sa ~₱16,400 kada bulan (36 ka bulan, 20% down payment)',
          '- Range: 326 km sa isa ka karga',
          '- Kusog: 134 hp kag 135 Nm instant torque',
          '- Garantiya: 7 ka tuig ukon 160,000 km warranty',
          '',
          'Luyag mo bala nga himuan ta ikaw sang financing computation para sa VF 5 Plus?'
        ].join('\n'),
        mediaUrls: MEDIA_MAP['vf 5'].map(m => m.url),
      };
    }

    return {
      text: [
        'VINFAST ELECTRIC VEHICLES PILIPINAS',
        '',
        'Ang VinFast nagadala sang pinakabag-o nga teknolohiya sang electric vehicles sa Pilipinas nga may zero gasto sa gasolina.',
        '',
        'ATON MGA OPISYAL NGA MODELO',
        '- VF 3: Mini Electric SUV halin ₱590,000',
        '- VF 5 Plus: Family Crossover halin ₱992,000',
        '- VF 6: Italian-Styled Crossover halin ₱1,499,000',
        '- VF 7: High-Performance Crossover halin ₱1,760,000',
        '- VF 9: 7-Seater Luxury Flagship halin ₱4,990,000',
        '',
        'Diin nga modelo ang gusto mo maeksperyensyahan sa isa ka libre nga test drive?'
      ].join('\n'),
      mediaUrls: [],
    };
  }

  // ----------------------------------------------------
  // 3. CHINESE / MANDARIN (ZH)
  // ----------------------------------------------------
  if (lang === 'ZH') {
    if (isExplicitSwitch) {
      return {
        text: [
          '您好！欢迎咨询 VINFAST 菲律宾',
          '',
          '没问题，我完全可以用中文为您提供专业的购车与咨询服务！',
          '',
          '我是您的 VinFast 菲律宾官方资深销售顾问与纯电出行专家。很荣幸为您介绍 VinFast 官方纯电车型及菲律宾专属购车方案：',
          '',
          'VINFAST 菲律宾官方全系车型与售价',
          '- VF 3：城市精品微型纯电 SUV，起售价 ₱590,000（电池租赁方案）/ ₱745,000（含电池整车方案）',
          '- VF 5 Plus：智能家用紧凑型跨界 SUV，起售价 ₱992,000（电池租赁）/ ₱1,191,000（含电池整车）',
          '- VF 6：意大利宾尼法利纳轻奢跨界车，起售价 ₱1,499,000',
          '- VF 7：高性能破风运动跨界 SUV（双电机 348 马力 AWD），起售价 ₱1,760,000',
          '- VF 9：旗舰级 7 座总统豪华全尺寸 SUV，起售价 ₱4,990,000',
          '',
          '专属核心优势',
          '- 全菲 29 家官方授权展厅与交付售后中心（包括大马尼拉 BGC、绿丘 Greenhills、宿务、达沃等）',
          '- 支持官方电池租赁（Battery Subscription）计划，大幅降低首付与购车门槛',
          '- 相比燃油车节省高达 74% 能源支出，享超长官方质保与 24/7 全天候道路救援',
          '',
          generateDynamicClosingQuestion('general', 'VF 3', context, 'ZH')
        ].join('\n'),
        mediaUrls: [],
      };
    }

    if (ambiguous) {
      if (context.lastModel) {
        return {
          text: [
            `关于您咨询的 VINFAST ${context.lastModel}`,
            '',
            `为了确保为您提供最精准的购车建议，关于 ${context.lastModel} 您想了解：`,
            '',
            '推荐了解项目',
            '- 官方售价与银行分期测算（支持 20% 低首付方案）',
            '- 实车车身颜色与高清图库',
            '- 核心三电续航、充电时间与官方质保政策',
            '- 预约就近展厅免费 VIP 深度试驾',
            '',
            generateDynamicClosingQuestion('test_drive', context.lastModel, context, 'ZH')
          ].join('\n'),
          mediaUrls: [],
        };
      }
      return {
        text: [
          'VINFAST 官方购车专属咨询',
          '',
          '为了协助您挑选最适合的纯电车型，请问您更关注哪一方面？',
          '',
          '热门推荐方向',
          '- VF 3：都市灵动微型纯电 SUV，起售价 ₱590,000（210 公里续航）',
          '- VF 5 Plus：家用紧凑型跨界 SUV，起售价 ₱992,000（326 公里续航）',
          '- 全菲 29 家官方授权展厅与售后网络',
          '- VIP 专属免费试驾与现场极速预审',
          '',
          generateDynamicClosingQuestion('general', 'VF 3', context, 'ZH')
        ].join('\n'),
        mediaUrls: [],
      };
    }

    // Colors & Photos in Chinese
    const isPhotoZh = q.includes('photo') || q.includes('picture') || q.includes('image') || q.includes('color') || q.includes('颜色') || q.includes('图片') || q.includes('照片') || q.includes('外观');
    if (isPhotoZh) {
      const targetModel = q.includes('5') ? 'vf 5' : 'vf 3';
      const media = MEDIA_MAP[targetModel];
      const urls = media.map(m => m.url);
      const name = targetModel === 'vf 5' ? 'VF 5 Plus' : 'VF 3';
      return {
        text: [
          `VINFAST ${name} 车身颜色与实车图库`,
          '',
          `以下为 ${name} 在菲律宾官方发售的车身配色方案：`,
          '',
          targetModel === 'vf 3'
            ? '- 蓝色 (Blue)\n- 绿色 (Green)\n- 浅蓝 (Light Blue)\n- 灰色 (Grey)\n- 粉色 (Pink)\n- 紫色 (Purple)\n- 红色 (Red)\n- 白色 (White)\n- 黄色 (Yellow)'
            : '- 纯净白 (Brahminy White)\n- 绯红灰 (Crimson Grey)\n- 绯红红 (Crimson Red)\n- 品牌蓝 (VinFast Blue)',
          '',
          urls.join('\n\n'),
          '',
          generateDynamicClosingQuestion('colors', name, context, 'ZH')
        ].join('\n'),
        mediaUrls: urls,
      };
    }

    // Test Drive in Chinese
    if (q.includes('test drive') || q.includes('试驾') || q.includes('试乘') || q.includes('预约') || q.includes('试车')) {
      const nearest = findNearestDealer(rawQuery) || DEALERS.find(d => d.id === 'dealer-bgc');
      return {
        text: [
          `VINFAST ${activeModel} 菲律宾官方 VIP 试驾服务`,
          '',
          `VinFast VIP 试驾服务全程免费，为您提供专业尊贵的 ${activeModel} 实车体验：`,
          '',
          '试驾核心须知',
          `- 试驾车型：${activeModel}（全系车型现车支持深度试乘试驾）`,
          '- 试驾时长：约 20-30 分钟，由官方认证产品专家全程陪同讲解',
          '- 试驾证件：仅需携带本人有效菲律宾或国际驾照',
          '- 网点覆盖：全菲 29 家官方展厅均提供现车试驾',
          nearest ? `- 推荐就近展厅：${nearest.name}（地址：${nearest.address} | 热线：${nearest.hotline}）` : '',
          '',
          generateDynamicClosingQuestion('test_drive', activeModel, context, 'ZH', nearest?.name)
        ].filter(Boolean).join('\n'),
        mediaUrls: [],
        suggestedDealer: nearest,
      };
    }

    // Features & Specs in Chinese
    if (q.includes('续航') || q.includes('充电') || q.includes('马力') || q.includes('功率') || q.includes('离地间隙') || q.includes('质保') || q.includes('配置') || q.includes('电池')) {
      return {
        text: [
          'VINFAST 核心技术参数与优势',
          '',
          '- 纯电续航：VF 3 拥有 210 公里满电续航；VF 5 Plus 达到 326 公里（NEDC）',
          '- 高效直流快充：36 分钟即可从 10% 充至 70%，支持家用慢充与全国公桩',
          '- 底盘通过性：VF 3 离地间隙达 191 mm，轻松应对菲律宾雨季积水与坑洼路面',
          '- 官方超长质保：整车享 7-10 年或 160,000-200,000 公里官方全面保障',
          '- 零燃油支出：相比燃油车每月可节省约 ₱8,000 能源开支，且享大马尼拉限行豁免',
          '',
          generateDynamicClosingQuestion('specs', activeModel, context, 'ZH')
        ].join('\n'),
        mediaUrls: [],
      };
    }

    // VF 3 in Chinese
    if (q.includes('3') || q.includes('vf 3') || q.includes('vf3')) {
      const urls = MEDIA_MAP['vf 3'].map(m => m.url);
      return {
        text: [
          'VINFAST VF 3 车型详解',
          '',
          'VF 3 是专为现代都市日常出行量身打造的纯电潮流微型 SUV：',
          '',
          '官方售价与核心配置',
          '- 电池租赁方案售价：₱590,000',
          '- 含电池整车购买方案：₱745,000',
          '- 纯电续航里程：210 公里（满电状态）',
          '- 最小离地间隙：191 毫米（通过性优异，轻松应对积水与复杂路况）',
          '- 智能座舱：配备 10 英寸悬浮触控屏，支持 Apple CarPlay 与 Android Auto',
          '- 外观配色：提供 9 款个性时尚车身色彩',
          '',
          generateDynamicClosingQuestion('specs', 'VF 3', context, 'ZH')
        ].join('\n'),
        mediaUrls: urls,
      };
    }

    // VF 5 Plus in Chinese
    if (q.includes('5') || q.includes('vf 5') || q.includes('vf5')) {
      const urls = MEDIA_MAP['vf 5'].map(m => m.url);
      return {
        text: [
          'VINFAST VF 5 PLUS 车型详解',
          '',
          'VF 5 Plus 是菲律宾家庭与日常通勤最理想的高性价比智能纯电跨界车：',
          '',
          '官方售价与金融测算',
          '- 电池租赁方案售价：₱992,000',
          '- 含电池整车购买售价：₱1,191,000',
          '- 预估月供：约 ₱16,400 / 月（按 36 期，20% 首付测算）',
          '- 纯电续航里程：326 公里（NEDC 工况）',
          '- 动力性能：134 马力，135 牛·米即时扭矩输出',
          '- 质保承诺：7 年或 160,000 公里官方整车质保',
          '',
          generateDynamicClosingQuestion('specs', 'VF 5 Plus', context, 'ZH')
        ].join('\n'),
        mediaUrls: urls,
      };
    }

    // Dealers in Chinese
    if (q.includes('dealer') || q.includes('展厅') || q.includes('门店') || q.includes('地址') || q.includes('马尼拉') || q.includes('宿务') || q.includes('达沃')) {
      const nearest = findNearestDealer(rawQuery) || DEALERS.find(d => d.id === 'dealer-bgc');
      return {
        text: [
          'VINFAST 菲律宾官方展厅网络',
          '',
          'VinFast 在全菲律宾设有 29 家官方授权展厅与服务中心，配备专业交付车间与 DC 直流快充设施：',
          '',
          '主要展厅覆盖区域',
          '- 大马尼拉核心区：BGC 塔吉格、绿丘 Greenhills、奎松 Centris、阿拉邦 ATC',
          '- 吕宋北部与南部：甲米地 Bacoor、大雅台附近、打拉 Tarlac、布拉干',
          '- 米沙鄢地区：宿务中心展厅、曼达维、杜马盖地',
          '- 棉兰老地区：达沃 Buhangin、桑托斯将军城 GenSan、塔古姆',
          '',
          nearest ? `为您推荐最近展厅：${nearest.name}\n地址：${nearest.address}\n服务热线：${nearest.hotline}\n` : '',
          generateDynamicClosingQuestion('dealers', activeModel, context, 'ZH', nearest?.name)
        ].filter(Boolean).join('\n'),
        mediaUrls: [],
        suggestedDealer: nearest,
      };
    }

    // Default Chinese response
    return {
      text: [
        'VINFAST 菲律宾官方新能源体验中心',
        '',
        'VinFast 致力于引领菲律宾纯电绿色出行，以尖端设计、零油耗支出与行业领先的超长质保为您提供无忧用车保障。',
        '',
        '官方现售车型',
        '- VF 3：微型纯电 SUV，起售价 ₱590,000（电池租赁方案）',
        '- VF 5 Plus：家用紧凑型跨界车，起售价 ₱992,000（电池租赁方案）',
        '- VF 6：意式设计轻奢跨界车，起售价 ₱1,499,000',
        '- VF 7：高性能破风运动跨界 SUV，起售价 ₱1,760,000',
        '- VF 9：旗舰 7 座豪华全尺寸 SUV，起售价 ₱4,990,000',
        '',
        generateDynamicClosingQuestion('general', 'VF 3', context, 'ZH')
      ].join('\n'),
      mediaUrls: [],
    };
  }

  // ----------------------------------------------------
  // 4. SPANISH (ES)
  // ----------------------------------------------------
  if (lang === 'ES') {
    if (isExplicitSwitch || q.includes('hola') || q.includes('espanol') || q.includes('español')) {
      return {
        text: [
          'HOLA Y BIENVENIDO A VINFAST FILIPINAS',
          '',
          '¡Sí, con mucho gusto le atiendo en español!',
          '',
          'Soy su especialista senior de ventas y asesor de vehículos eléctricos de VinFast en Filipinas. Con mucho gusto puedo asistirle con información completa sobre nuestra gama 100% eléctrica:',
          '',
          'GAMA OFICIAL Y PRECIOS EN FILIPINAS',
          '- VF 3: Mini SUV Eléctrico Urbano desde ₱590,000 (Suscripción de Batería) o ₱745,000 (Compra Total)',
          '- VF 5 Plus: Crossover Familiar Compacto desde ₱992,000 (Suscripción de Batería) o ₱1,191,000 (Compra Total)',
          '- VF 6: Crossover Subcompacto de Diseño Italiano desde ₱1,499,000',
          '- VF 7: Crossover Deportivo de Alto Rendimiento (hasta 348 hp AWD) desde ₱1,760,000',
          '- VF 9: SUV Insignia de Lujo de 7 Plazas desde ₱4,990,000',
          '',
          'RED Y BENEFICIOS',
          '- 29 concesionarios autorizados en todo el país con talleres y cargadores rápidos DC',
          '- Ahorro de hasta un 74% en costos de combustible frente a autos de gasolina',
          '- Garantía oficial líder en la industria y asistencia en carretera 24/7',
          '',
          '¿Qué modelo de VinFast le gustaría cotizar o probar en una prueba de manejo VIP?'
        ].join('\n'),
        mediaUrls: [],
      };
    }
  }

  // ----------------------------------------------------
  // 5. JAPANESE (JA)
  // ----------------------------------------------------
  if (lang === 'JA') {
    if (isExplicitSwitch || q.includes('japanese') || q.includes('日本語')) {
      return {
        text: [
          'こんにちは！VINFASTフィリピンへようこそ',
          '',
          'はい、喜んで日本語でご案内させていただきます！',
          '',
          '私はVinFastフィリピンのシニアセールススペシャリストです。フィリピン国内でのVinFast 100%電気自動車（EV）のご検討を日本語でフルサポートいたします：',
          '',
          '公式ラインナップとフィリピン価格',
          '- VF 3: アーバンミニ電気SUV ₱590,000より（バッテリーサブスクリプション）/ ₱745,000（バッテリー込み）',
          '- VF 5 Plus: コンパクトファミリークロスオーバー ₱992,000より（サブスク）/ ₱1,191,000（バッテリー込み）',
          '- VF 6: イタリアンデザイン・プレミアムクロスオーバー ₱1,499,000より',
          '- VF 7: ハイパフォーマンス・スポーツクロスオーバー（最大348馬力 AWD）₱1,760,000より',
          '- VF 9: プレジデンシャル7人乗りフラッグシップ高級SUV ₱4,990,000より',
          '',
          'ネットワークと特典',
          '- マニラ首都圏（BGC、グリーンヒルズ等）、セブ、ダバオを含む全国29の公式ディーラー網',
          '- ガソリン車と比較して約74%の燃料費削減',
          '- 業界最長クラスの公式保証および24時間年中无休のロードサービス',
          '',
          '本日はどのモデルのスペック詳細、ローン試算、またはVIP試乗予約をご希望でしょうか？'
        ].join('\n'),
        mediaUrls: [],
      };
    }
  }

  // ----------------------------------------------------
  // 6. KOREAN (KO)
  // ----------------------------------------------------
  if (lang === 'KO') {
    if (isExplicitSwitch || q.includes('korean') || q.includes('한국어')) {
      return {
        text: [
          '안녕하세요! 빈패스트 필리핀 공식 고객센터입니다',
          '',
          '네, 한국어로 친절하게 상담해 드리겠습니다!',
          '',
          '저는 VinFast 필리핀 시니어 세일즈 스페셜리스트이자 전기차 전문 컨설턴트입니다. 필리핀 공식 라인업 및 프로모션 정보를 한국어로 안내해 드립니다:',
          '',
          '공식 라인업 및 가격 안내',
          '- VF 3: 도심형 미니 전기 SUV ₱590,000부터 (배터리 구독형) / ₱745,000 (배터리 포함)',
          '- VF 5 Plus: 컴팩트 패밀리 크로스오버 ₱992,000부터 (배터리 구독형) / ₱1,191,000 (배터리 포함)',
          '- VF 6: 이탈리안 디자인 서브컴팩트 크로스오버 ₱1,499,000부터',
          '- VF 7: 고성능 에어로다이내믹 크로스오버 (최대 348마력 AWD) ₱1,760,000부터',
          '- VF 9: 7인승 프리미엄 플래그십 럭셔리 SUV ₱4,990,000부터',
          '',
          '전국 네트워크',
          '- 메트로 마닐라(BGC, 그린힐스 등), 세부, 다바오 등 필리핀 전국 29개 공식 전시장 운영',
          '- 가솔린 대비 약 74% 유류비 절감 효과',
          '- 업계 최고 수준의 공식 보증 및 24/7 긴급 출동 서비스',
          '',
          '관심 있으신 모델의 시승 예약이나 금융 할부 견적이 필요하신가요?'
        ].join('\n'),
        mediaUrls: [],
      };
    }
  }

  // ----------------------------------------------------
  // 7. EXPLICIT SWITCH TO TAGALOG (PH)
  // ----------------------------------------------------
  if (lang === 'PH' && isExplicitSwitch) {
    return {
      text: [
        'MALIGAYANG PAGDATING SA VINFAST PHILIPPINES',
        '',
        'Walang anuman! Ipagpapatuloy natin ang ating pag-uusap sa Tagalog.',
        '',
        'Ako ang iyong opisyal na VinFast Senior Sales Specialist. Handa akong tumulong sa opisyal na presyo, Battery Subscription, pagkalkula ng buwanang hulog, at pag-book ng test drive sa alinman sa ating 29 dealerships.',
        '',
        'Aling VinFast model ang nais mong suriin o i-test drive ngayong araw?'
      ].join('\n'),
      mediaUrls: [],
    };
  }

  // ----------------------------------------------------
  // 8. EXPLICIT SWITCH TO ENGLISH (EN)
  // ----------------------------------------------------
  if (lang === 'EN' && isExplicitSwitch) {
    return {
      text: [
        'WELCOME TO VINFAST PHILIPPINES',
        '',
        'Certainly! We will continue our conversation in English.',
        '',
        'I am your official VinFast Senior Sales Specialist. I am ready to assist you with official pricing, battery subscription plans, monthly amortization calculations, and booking a test drive at any of our 29 authorized dealerships across the Philippines.',
        '',
        'Which VinFast model would you like to explore or test drive today?'
      ].join('\n'),
      mediaUrls: [],
    };
  }

  // ----------------------------------------------------
  // 9. GENERIC OTHER LANGUAGE (e.g. French, German, Vietnamese, etc.)
  // ----------------------------------------------------
  if (isExplicitSwitch && lang !== 'EN' && lang !== 'PH') {
    return {
      text: [
        `WELCOME TO VINFAST PHILIPPINES (${lang})`,
        '',
        `Hello! I will be glad to converse and assist you in ${lang}.`,
        '',
        'I am your VinFast Senior Sales Consultant in the Philippines. I can help you with our 100% electric vehicle lineup, official pricing, battery subscription options, and test drive reservations across our 29 authorized dealerships:',
        '',
        'OFFICIAL PHILIPPINE LINEUP & PRICING',
        '- VF 3: Urban Mini Electric SUV starting at ₱590,000 (Battery Subscription) or ₱745,000 (Outright)',
        '- VF 5 Plus: Compact Family Crossover starting at ₱992,000 (Battery Subscription) or ₱1,191,000 (Outright)',
        '- VF 6: Italian-Styled Subcompact Crossover starting at ₱1,499,000',
        '- VF 7: Aero-Dynamic Performance Crossover (up to 348 hp AWD) starting at ₱1,760,000',
        '- VF 9: Presidential 7-Seater Luxury Flagship SUV starting at ₱4,990,000',
        '',
        'Which VinFast model would you like to explore or test drive today?'
      ].join('\n'),
      mediaUrls: [],
    };
  }

  return null;
}

/**
 * Processes user messages and returns AI Sales Specialist responses conforming strictly
 * to the instructions in all supported languages:
 * - NO markdown syntax (no **, *, #, _, `)
 * - NO tables, pipes, or backslashes
 * - Vertical key-value lists
 * - Proper spacing between numbers, models, and units (VF 5 Plus, 134 hp, 135 Nm, 326 km)
 * - Section titles in UPPERCASE on their own line
 * - Hyphen bullets ("- ")
 * - Blank line between list items / sections
 * - Exact media URLs on their own line when photos are requested
 * - Natural closing question on its own line without headers
 */
export function generateSalesResponse(
  rawQuery: string,
  language: string = 'EN',
  history: ChatMessage[] = []
): BrainResponse {
  const query = rawQuery.trim();
  const q = query.toLowerCase();

  // 1. Extract conversational context from history
  const context = extractConversationContext(history, rawQuery);

  // 2. Multilingual detection & routing
  const { lang, isExplicitSwitch } = detectLanguage(rawQuery, language);
  const multiResponse = generateMultilingualResponse(rawQuery, lang, isExplicitSwitch, context);
  if (multiResponse) {
    return {
      ...multiResponse,
      detectedLanguage: lang,
    };
  }

  const isTagalog = lang === 'PH';

  // 3. Resolve active model from query or previous context
  const explicitModel = detectModelInText(q);
  const activeModel = explicitModel?.model || context.lastModel || 'VF 3';
  const activeModelId = explicitModel?.id || context.lastModelId || 'vf-3';

  // 4. Handle ambiguous, confusing, or non-committal queries directly leading to a close
  if (isConfusingOrAmbiguous(rawQuery)) {
    if (context.lastModel) {
      const text = isTagalog
        ? [
            `TUNGKOL SA IYONG INQUIRY SA ${context.lastModel}`,
            '',
            `Nais kong masiguro na maibibigay ko ang eksaktong impormasyon na kailangan mo tungkol sa ${context.lastModel}:`,
            '',
            'MGA MAAARI KONG MAITULONG NGAYON',
            '- Opisyal na Presyo: May Battery Subscription o Outright purchase',
            '- Mga Kulay at Litrato: 9 na makukulay na exterior finishes',
            '- Driving Range: 210 km bawat charge na may 36-minutong DC fast charging',
            '- Libreng VIP Test Drive: 30-minutong karanasan sa alinman sa aming 29 showrooms',
            '',
            generateDynamicClosingQuestion('test_drive', context.lastModel, context, lang)
          ].join('\n')
        : [
            `REGARDING YOUR INQUIRY ON THE ${context.lastModel}`,
            '',
            `I want to ensure I provide the exact information you need regarding the ${context.lastModel}:`,
            '',
            'HOW I CAN ASSIST YOU TODAY',
            '- Official SRP: Battery Subscription or Outright purchase options',
            '- Exterior Colors and Photos: Complete gallery of factory finishes',
            '- Driving Range: Real-world range with 36-minute DC fast charging',
            '- Complimentary VIP Test Drive: 30-minute experience at any of our 29 showrooms',
            '',
            generateDynamicClosingQuestion('test_drive', context.lastModel, context, lang)
          ].join('\n');

      return {
        text,
        mediaUrls: [],
        quickActions: [
          { label: isTagalog ? `I-test Drive ang ${context.lastModel}` : `Test Drive ${context.lastModel}`, action: 'book_test_drive', payload: context.lastModelId || 'vf-3' },
          { label: isTagalog ? 'Kwentahin ang Buwanan' : 'Calculate Monthly', action: 'calculate_model', payload: context.lastModelId || 'vf-3' },
        ]
      };
    }

    const text = isTagalog
      ? [
          'KONSULTASYON SA PAGBILI NG VINFAST',
          '',
          'Upang maibigay ko ang pinaka-angkop na impormasyon para sa iyong pangangailangan, aling bahagi ng VinFast ang nais mong malaman?',
          '',
          'MGA PANGUNAHING OPSYON',
          '- VF 3: Urban Mini Electric SUV simula ₱590,000 (210 km range)',
          '- VF 5 Plus: Family Compact Crossover simula ₱949,000 (326 km range)',
          '- 29 Awtorisadong Dealership: Showrooms sa Metro Manila, Luzon, Visayas, at Mindanao',
          '- Libreng VIP Test Drive: Personal na pagsubok kasama ang aming sertipikadong product specialist',
          '',
          generateDynamicClosingQuestion('general', 'VF 3', context, lang)
        ].join('\n')
      : [
          'VINFAST SALES CONSULTATION',
          '',
          'To ensure I provide the most helpful guidance for your driving needs, which aspect of VinFast would you like to explore?',
          '',
          'POPULAR STARTING POINTS',
          '- VF 3: Urban Mini Electric SUV starting at ₱590,000 (210 km range)',
          '- VF 5 Plus: Family Compact Crossover starting at ₱949,000 (326 km range)',
          '- 29 Authorized Dealerships: Showrooms across Metro Manila, Luzon, Visayas, and Mindanao',
          '- Complimentary VIP Test Drive: Hands-on driving experience with a certified product specialist',
          '',
          generateDynamicClosingQuestion('general', 'VF 3', context, lang)
        ].join('\n');

    return {
      text,
      mediaUrls: [],
      quickActions: [
        { label: isTagalog ? 'Suriin ang VF 3' : 'Explore VF 3', action: 'calculate_model', payload: 'vf-3' },
        { label: isTagalog ? 'Suriin ang VF 5 Plus' : 'Explore VF 5 Plus', action: 'calculate_model', payload: 'vf-5-plus' },
        { label: isTagalog ? 'Mag-book ng Test Drive' : 'Book Test Drive', action: 'book_test_drive' },
      ]
    };
  }

  // 5. Photos, pictures, colors, gallery requests
  const isPhotoRequest = q.includes('photo') || q.includes('picture') || q.includes('image') || q.includes('look') || q.includes('color') || q.includes('kulay') || q.includes('litrato') || q.includes('larawan') || q.includes('gallery');

  if (isPhotoRequest) {
    const targetKey = activeModelId === 'vf-5-plus' ? 'vf 5' : activeModelId === 'vf-6' ? 'vf 6' : activeModelId === 'vf-7' ? 'vf 7' : 'vf 3';
    const media = MEDIA_MAP[targetKey] || MEDIA_MAP['vf 3'];
    const urls = media.map(m => m.url);
    const urlLines = urls.join('\n\n');

    const text = isTagalog
      ? [
          `MGA KULAY AT LITRATO NG VINFAST ${activeModel}`,
          '',
          `Narito ang mga opisyal na exterior colors para sa ${activeModel}:`,
          '',
          media.map(m => `- ${m.color}`).join('\n'),
          '',
          urlLines,
          '',
          generateDynamicClosingQuestion('colors', activeModel, context, lang)
        ].join('\n')
      : [
          `VINFAST ${activeModel} COLORWAYS AND PHOTO GALLERY`,
          '',
          `Here are the official factory exterior finishes for the ${activeModel}:`,
          '',
          media.map(m => `- ${m.color}`).join('\n'),
          '',
          urlLines,
          '',
          generateDynamicClosingQuestion('colors', activeModel, context, lang)
        ].join('\n');

    return {
      text,
      mediaUrls: urls,
      quickActions: [
        { label: isTagalog ? `Mag-book ng ${activeModel} Test Drive` : `Book ${activeModel} Test Drive`, action: 'book_test_drive', payload: activeModelId },
        { label: isTagalog ? 'Kwentahin ang Buwanan' : 'Calculate Monthly', action: 'calculate_model', payload: activeModelId },
      ]
    };
  }

  // 6. Test Drive specific requests
  const isTestDriveRequest = q.includes('test drive') || q.includes('test-drive') || q.includes('subukan') || q.includes('drive') || q.includes('try') || q.includes('book') || q.includes('schedule') || q.includes('appointment');

  if (isTestDriveRequest) {
    const nearest = findNearestDealer(rawQuery);
    const dealerMention = nearest ? (isTagalog ? ` sa ${nearest.name}` : ` at ${nearest.name}`) : '';

    const text = isTagalog
      ? [
          'LIBRENG VIP TEST DRIVE SA VINFAST PHILIPPINES',
          '',
          `Maaari mong maranasan ang ${activeModel} sa isang libreng VIP test drive${dealerMention}:`,
          '',
          'MGA DETALYE NG TEST DRIVE',
          '- 100% Libre: Walang anumang bayad o obligasyon',
          '- Tagal: 20 hangtod 30 minuto kasama ang sertipikadong VinFast product specialist',
          '- Dalhin: Isang balidong Philippine o international driver\'s license',
          '- 29 Showrooms: May demo units sa lahat ng aming awtorisadong dealership sa buong bansa',
          nearest ? `- Inirerekomendang Showroom: ${nearest.name} (${nearest.address} | Hotline: ${nearest.hotline})` : '',
          '',
          generateDynamicClosingQuestion('test_drive', activeModel, context, lang, nearest?.name)
        ].filter(Boolean).join('\n')
      : [
          'COMPLIMENTARY VINFAST VIP TEST DRIVE',
          '',
          `You are invited to experience the ${activeModel} firsthand during a VIP test drive${dealerMention}:`,
          '',
          'TEST DRIVE DETAILS',
          '- 100% Complimentary: Completely free with zero obligation',
          '- Duration: 20 to 30 minutes with a certified VinFast EV consultant',
          '- Requirements: Simply present a valid Philippine or international driver\'s license',
          '- 29 Showrooms: Demo units ready across all authorized dealerships nationwide',
          nearest ? `- Recommended Showroom: ${nearest.name} (${nearest.address} | Hotline: ${nearest.hotline})` : '',
          '',
          generateDynamicClosingQuestion('test_drive', activeModel, context, lang, nearest?.name)
        ].filter(Boolean).join('\n');

    return {
      text,
      mediaUrls: [],
      suggestedDealer: nearest,
      quickActions: [
        { label: isTagalog ? `Mag-book para sa ${activeModel}` : `Book for ${activeModel}`, action: 'book_test_drive', payload: activeModelId },
      ]
    };
  }

  // 7. Features & Technical Specs requests
  const isFeatureRequest = q.includes('charge') || q.includes('charging') || q.includes('range') || q.includes('km') || q.includes('hp') || q.includes('speed') || q.includes('ground clearance') || q.includes('motor') || q.includes('torque') || q.includes('warranty') || q.includes('safety') || q.includes('adas') || q.includes('spec') || q.includes('feature');

  if (isFeatureRequest) {
    if (activeModelId === 'vf-3') {
      const text = isTagalog
        ? [
            'MGA PANGUNAHING SPECIFICATIONS NG VINFAST VF 3',
            '',
            'Driving Range: 210 km (NEDC) sa bawat buong charge',
            'Kapasidad ng Baterya: 18.64 kWh LFP battery',
            'Mabilis na DC Charging: 10% hanggang 70% sa loob lamang ng 36 minuto',
            'Lakas ng Motor: 43 hp at 110 Nm instant electric torque',
            'Ground Clearance: Mataas na 191 mm (hindi masangad sa baha o lubak)',
            'Infotainment: 10-inch Touchscreen na may Apple CarPlay at Android Auto',
            'Garantiya sa Sasakyan: 7 Taon o 160,000 km',
            'Garantiya sa Baterya: 8 Taon o walang limitasyong mileage sa ilalim ng subscription',
            '',
            generateDynamicClosingQuestion('specs', 'VF 3', context, lang)
          ].join('\n')
        : [
            'VINFAST VF 3 KEY TECHNICAL SPECIFICATIONS',
            '',
            'Driving Range: 210 km (NEDC) per full charge',
            'Battery Capacity: 18.64 kWh LFP battery pack',
            'DC Fast Charging: 10% to 70% in only 36 minutes',
            'Electric Motor: 43 hp and 110 Nm instant electric torque',
            'Ground Clearance: High 191 mm (confidently clears floods and rough roads)',
            'Infotainment: 10-inch Touchscreen with Apple CarPlay and Android Auto',
            'Vehicle Warranty: 7 Years or 160,000 km',
            'Battery Warranty: 8 Years or unlimited mileage under battery subscription',
            '',
            generateDynamicClosingQuestion('specs', 'VF 3', context, lang)
          ].join('\n');

      return {
        text,
        mediaUrls: [],
        quickActions: [
          { label: isTagalog ? 'Mag-book ng VF 3 Test Drive' : 'Book VF 3 Test Drive', action: 'book_test_drive', payload: 'vf-3' },
          { label: isTagalog ? 'Kwentahin ang VF 3' : 'Calculate VF 3', action: 'calculate_model', payload: 'vf-3' },
        ]
      };
    }

    if (activeModelId === 'vf-5-plus') {
      const text = isTagalog
        ? [
            'MGA PANGUNAHING SPECIFICATIONS NG VINFAST VF 5 PLUS',
            '',
            'Driving Range: 326 km (NEDC) sa bawat buong charge',
            'Kapasidad ng Baterya: 37.23 kWh Ternary Lithium battery',
            'Lakas ng Motor: 134 hp at 135 Nm instant torque',
            'Akselerasyon: Mabilis at maayos na arangkada para sa expressway at lungsod',
            'Ground Clearance: 182 mm',
            'Kapasidad: 5 Pasahero na may maluwag na cabin at cargo space',
            'Kaligtasan: 6 na Airbags, Rear Parking Sensors, ABS, EBD, at ESC',
            'Garantiya sa Sasakyan: 7 Taon o 160,000 km',
            '',
            generateDynamicClosingQuestion('specs', 'VF 5 Plus', context, lang)
          ].join('\n')
        : [
            'VINFAST VF 5 PLUS KEY TECHNICAL SPECIFICATIONS',
            '',
            'Driving Range: 326 km (NEDC) per full charge',
            'Battery Capacity: 37.23 kWh Ternary Lithium battery pack',
            'Electric Motor: 134 hp and 135 Nm instant torque',
            'Acceleration: Swift, seamless city overtaking and expressway cruising',
            'Ground Clearance: 182 mm',
            'Seating Capacity: 5 Passengers with spacious legroom and generous cargo area',
            'Safety Suite: 6 Airbags, Rear Parking Sensors, ABS, EBD, and ESC',
            'Vehicle Warranty: 7 Years or 160,000 km',
            '',
            generateDynamicClosingQuestion('specs', 'VF 5 Plus', context, lang)
          ].join('\n');

      return {
        text,
        mediaUrls: [],
        quickActions: [
          { label: isTagalog ? 'Mag-book ng VF 5 Plus Test Drive' : 'Book VF 5 Plus Test Drive', action: 'book_test_drive', payload: 'vf-5-plus' },
          { label: isTagalog ? 'Kwentahin ang VF 5 Plus' : 'Calculate VF 5 Plus', action: 'calculate_model', payload: 'vf-5-plus' },
        ]
      };
    }
  }

  // 8. Model-specific overview (VF 3, VF 5 Plus, VF 6, VF 7, VF 9) with Anti-Repetition
  if (q.includes('vf 3') || q.includes('vf3')) {
    if (context.repeatModelCount > 0) {
      const text = isTagalog
        ? [
            'PANG-ARAW-ARAW NA BENTAHE NG VINFAST VF 3',
            '',
            'Dahil seryoso ka sa pagsusuri ng VF 3, narito ang mga praktikal na benepisyo sa araw-araw na pagmamay-ari sa Pilipinas:',
            '',
            'MALAKING MATITIPID SA PANG-ARAW-ARAW',
            '- Matipid sa Enerhiya: Ang gastos sa pag-charge ay humigit-kumulang ₱1.20 bawat kilometro lamang kontra sa higit ₱6.50 kada kilometro ng gasolinang sasakyan.',
            '- Buwanang Matitipid sa Krudo: Karaniwang nakakatipid ng ₱7,500 hanggang ₱9,000 bawat buwan ang mga motorista sa siyudad.',
            '',
            'EVIDA LAW AT PERKS SA KALYE (REPUBLIC ACT 11697)',
            '- Walang Number Coding: 100% exempt ang VF 3 sa MMDA number coding sa buong Metro Manila. Makakabiyahe ka araw-araw nang walang kaba.',
            '- Priority Registration: Priyoridad sa LTO registration at may diskwento sa renewal alinsunod sa batas.',
            '',
            'MABILIS NA CHARGING AT GARANTIYA',
            '- Mabilis na DC Fast Charging: Mula 10% hanggang 70% sa loob lamang ng 36 minuto sa ating mga DC fast-chargers.',
            '- 7 Taong Warranty: May 7 taon o 160,000 km warranty para sa iyong buong kapanatagan.',
            '',
            generateDynamicClosingQuestion('specs', 'VF 3', context, lang)
          ].join('\n')
        : [
            'DAILY OWNERSHIP ADVANTAGES OF THE VINFAST VF 3',
            '',
            'As you explore the VF 3 further, here are the compelling day-to-day ownership benefits in the Philippines:',
            '',
            'SIGNIFICANT OPERATING SAVINGS',
            '- Fuel Cost Difference: Charging costs approximately ₱1.20 per km compared to over ₱6.50 per km on gasoline vehicles.',
            '- Monthly Commute Savings: Typical Manila city commuters save between ₱7,500 and ₱9,000 every single month on fuel alone.',
            '',
            'EVIDA LAW PRIVILEGES (REPUBLIC ACT 11697)',
            '- Zero Number Coding Restrictions: 100% exempt from MMDA number coding across Metro Manila. Drive every day of the week with complete freedom.',
            '- Priority LTO Processing: Enjoy fast-track registration and dedicated green plate privileges under national EV law.',
            '',
            'RAPID CHARGING AND UNBEATABLE WARRANTY',
            '- Fast DC Charging: Recharges from 10% to 70% in just 36 minutes at VinFast high-power DC fast stations.',
            '- 7-Year Official Warranty: Comprehensive 7-year or 160,000 km vehicle warranty for complete peace of mind.',
            '',
            generateDynamicClosingQuestion('specs', 'VF 3', context, lang)
          ].join('\n');

      return {
        text,
        mediaUrls: [],
        quickActions: [
          { label: isTagalog ? 'Mag-book ng VF 3 Test Drive' : 'Book VF 3 Test Drive', action: 'book_test_drive', payload: 'vf-3' },
          { label: isTagalog ? 'Kwentahin ang Buwanang Hulog' : 'Calculate Monthly Amortization', action: 'calculate_model', payload: 'vf-3' },
        ]
      };
    }

    const text = isTagalog
      ? [
          'PANGKALAHATANG TINGIN SA VINFAST VF 3',
          '',
          'Ang VF 3 ay isang modernong mini electric SUV na binuo upang baguhin ang iyong pang-araw-araw na biyahe sa lungsod:',
          '',
          'MGA PANGUNAHING DETALYE',
          'Model: VF 3',
          'Kategorya: Mini Electric SUV',
          'Outright SRP: ₱745,000',
          'Battery Subscription SRP: ₱590,000',
          'Range: 210 km NEDC',
          'Kapasidad ng Baterya: 18.64 kWh',
          'Electric Motor: 43 hp / 110 Nm torque',
          'Ground Clearance: 191 mm',
          'Kapasidad: 4 na Pasahero',
          'Infotainment: 10-inch Touchscreen',
          '',
          'MGA BENTAHE',
          '- Ang mataas na 191 mm ground clearance ay kayang-kaya ang baha at lubak sa kalsada.',
          '- Maliit ang turning radius kaya napakadaling iparada sa masisikip na mall at eskinita.',
          '- Mabilis na DC charging mula 10% hanggang 70% sa loob lamang ng 36 minuto.',
          '',
          generateDynamicClosingQuestion('specs', 'VF 3', context, lang)
        ].join('\n')
      : [
          'VINFAST VF 3 OVERVIEW',
          '',
          'The VF 3 is an urban mini electric SUV engineered to transform your daily city drive:',
          '',
          'KEY SPECIFICATIONS',
          'Model: VF 3',
          'Segment: Mini Electric SUV',
          'Outright SRP: ₱745,000',
          'Battery Subscription SRP: ₱590,000',
          'Driving Range: 210 km NEDC',
          'Battery Capacity: 18.64 kWh',
          'Electric Motor: 43 hp / 110 Nm torque',
          'Ground Clearance: 191 mm',
          'Seating: 4 Passengers',
          'Infotainment: 10-inch Screen',
          '',
          'KEY ADVANTAGES',
          '- High 191 mm ground clearance easily navigates uneven roads and rainy season floods.',
          '- Compact exterior with nimble turning radius makes parking in crowded malls and tight streets effortless.',
          '- Fast DC charging takes you from 10% to 70% in only 36 minutes.',
          '',
          generateDynamicClosingQuestion('specs', 'VF 3', context, lang)
        ].join('\n');

    return {
      text,
      mediaUrls: [
        'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf3%20blue.png',
        'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf3%20yellow.png',
      ],
      quickActions: [
        { label: isTagalog ? 'Kwentahin ang Buwanang Hulog ng VF 3' : 'Calculate VF 3 Monthly', action: 'calculate_model', payload: 'vf-3' },
        { label: isTagalog ? 'Mag-book ng VF 3 Test Drive' : 'Book VF 3 Test Drive', action: 'book_test_drive', payload: 'vf-3' },
      ]
    };
  }

  if (q.includes('vf 5') || q.includes('vf5')) {
    if (context.repeatModelCount > 0) {
      const text = isTagalog
        ? [
            'PANGMATAGALANG HALAGA AT GASTUSIN NG VINFAST VF 5 PLUS',
            '',
            'Narito ang mga karagdagang detalye ukol sa pangmatagalang halaga at karanasan sa pagmamay-ari ng VF 5 Plus:',
            '',
            'PANG-ARAW-ARAW NA GASTUSIN AT MAINTENANCE',
            '- Matipid sa Maintenance: Walang engine oil, oil filters, spark plugs, radiator coolant, at transmission fluid na papalitan taon-taon. Bawas ng mahigit 60% ang maintenance cost.',
            '- Regenerative Braking: Ang electric motor braking ay nagpapahaba sa buhay ng brake pads at rotors nang hanggang dobleng tagal.',
            '- Taunang Matitipid sa Krudo: Humigit-kumulang ₱80,000 hanggang ₱95,000 bawat taon ang matitipid kumpara sa isang tradisyonal na 1.5L gas crossover.',
            '',
            'SEGURIDAD AT ADVANCED SAFETY',
            '- 6 na Airbags: Proteksyon para sa buong pamilya sa harap at tagiliran.',
            '- EVIDA Coding Exemption: Malayang magmaneho sa EDSA, C5, at buong Metro Manila nang walang coding restrictions.',
            '',
            generateDynamicClosingQuestion('specs', 'VF 5 Plus', context, lang)
          ].join('\n')
        : [
            'LONG-TERM VALUE AND OWNERSHIP OF THE VINFAST VF 5 PLUS',
            '',
            'Here are the deeper financial and operational advantages of owning the VF 5 Plus in the Philippines:',
            '',
            'MAINTENANCE AND OPERATIONAL ECONOMY',
            '- Reduced Maintenance: No engine oil, spark plugs, oil filters, transmission fluids, or radiator flushes. Typical maintenance costs are cut by over 60%.',
            '- Regenerative Braking: Electric motor deceleration drastically extends the lifespan of brake pads and rotors.',
            '- Annual Fuel Savings: Save approximately ₱80,000 to ₱95,000 per year compared to a traditional 1.5L gasoline crossover.',
            '',
            'FAMILY SAFETY AND ROAD PRIVILEGES',
            '- 6 Airbags & Electronic Stability: Comprehensive protection for your entire family.',
            '- EVIDA Coding Exemption: Fully exempt from MMDA coding under Republic Act 11697 across all Metro Manila cities.',
            '',
            generateDynamicClosingQuestion('specs', 'VF 5 Plus', context, lang)
          ].join('\n');

      return {
        text,
        mediaUrls: [],
        quickActions: [
          { label: isTagalog ? 'Mag-book ng VF 5 Plus Test Drive' : 'Book VF 5 Plus Test Drive', action: 'book_test_drive', payload: 'vf-5-plus' },
          { label: isTagalog ? 'Kwentahin ang VF 5 Plus Amortization' : 'Calculate VF 5 Plus Amortization', action: 'calculate_model', payload: 'vf-5-plus' },
        ]
      };
    }

    const text = isTagalog
      ? [
          'PANGKALAHATANG TINGIN SA VINFAST VF 5 PLUS',
          '',
          'Ang VF 5 Plus ay isang matalinong family crossover na nagbibigay ng pambihirang halaga, espasyo, at zero emisyon:',
          '',
          'MGA PANGUNAHING DETALYE',
          'Model: VF 5 Plus',
          'Kategorya: Compact Family Crossover',
          'Outright SRP: ₱1,191,000',
          'Battery Subscription SRP: ₱992,000',
          'Range: 326 km NEDC',
          'Kapasidad ng Baterya: 37.23 kWh',
          'Electric Motor: 134 hp / 135 Nm torque',
          'Kapasidad: 5 Pasahero',
          'Garantiya sa Sasakyan: 7 Taon o 160,000 km',
          '',
          generateDynamicClosingQuestion('specs', 'VF 5 Plus', context, lang)
        ].join('\n')
      : [
          'VINFAST VF 5 PLUS OVERVIEW',
          '',
          'The VF 5 Plus is a smart family crossover delivering exceptional value, space, and zero emissions:',
          '',
          'KEY SPECIFICATIONS',
          'Model: VF 5 Plus',
          'Segment: Compact Family Crossover',
          'Outright SRP: ₱1,191,000',
          'Battery Subscription SRP: ₱992,000',
          'Driving Range: 326 km NEDC',
          'Battery Capacity: 37.23 kWh',
          'Electric Motor: 134 hp / 135 Nm torque',
          'Seating: 5 Passengers',
          'Vehicle Warranty: 7 Years or 160,000 km',
          '',
          generateDynamicClosingQuestion('specs', 'VF 5 Plus', context, lang)
        ].join('\n');

    return {
      text,
      mediaUrls: [
        'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf5%20brahimny%20white.png',
        'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf5%20vinfast%20blue.png',
      ],
      quickActions: [
        { label: isTagalog ? 'Kwentahin ang Buwanang Hulog ng VF 5 Plus' : 'Calculate VF 5 Plus Monthly', action: 'calculate_model', payload: 'vf-5-plus' },
        { label: isTagalog ? 'Mag-book ng VF 5 Plus Test Drive' : 'Book VF 5 Plus Test Drive', action: 'book_test_drive', payload: 'vf-5-plus' },
      ]
    };
  }

  if (q.includes('vf 6') || q.includes('vf6')) {
    const text = isTagalog
      ? [
          'PANGKALAHATANG TINGIN SA VINFAST VF 6',
          '',
          'Ang VF 6 ay idinisenyo ng Torino Design mula sa Italya, pinagsasama ang karangyaan at electric agility:',
          '',
          'MGA PANGUNAHING DETALYE',
          'Model: VF 6',
          'Kategorya: Subcompact Crossover',
          'VF 6 Eco SRP: ₱1,499,000',
          'VF 6 Plus SRP: ₱1,699,000',
          'Range: 399 km WLTP',
          'Kapasidad ng Baterya: 59.6 kWh',
          'Electric Motor: 174 hp / 250 Nm (Eco) o 201 hp / 310 Nm (Plus)',
          'Drivetrain: Front-Wheel Drive (FWD)',
          'Infotainment: 12.9-inch HD Driver-Oriented Touchscreen',
          '',
          generateDynamicClosingQuestion('specs', 'VF 6', context, lang)
        ].join('\n')
      : [
          'VINFAST VF 6 OVERVIEW',
          '',
          'The VF 6 subcompact crossover combines Italian styling by Torino Design with spirited electric driving:',
          '',
          'KEY SPECIFICATIONS',
          'Model: VF 6',
          'Segment: Subcompact Crossover',
          'VF 6 Eco SRP: ₱1,499,000',
          'VF 6 Plus SRP: ₱1,699,000',
          'Driving Range: 399 km WLTP',
          'Battery Capacity: 59.6 kWh',
          'Electric Motor: 174 hp / 250 Nm (Eco) or 201 hp / 310 Nm (Plus)',
          'Drivetrain: Front-Wheel Drive (FWD)',
          'Infotainment: 12.9-inch HD Driver-Oriented Touchscreen',
          '',
          generateDynamicClosingQuestion('specs', 'VF 6', context, lang)
        ].join('\n');

    return {
      text,
      mediaUrls: [
        'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf6%20crimson%20red.png',
      ],
      quickActions: [
        { label: isTagalog ? 'Kwentahin ang Buwanang Hulog ng VF 6' : 'Calculate VF 6 Monthly', action: 'calculate_model', payload: 'vf-6' },
        { label: isTagalog ? 'Mag-book ng VF 6 Test Drive' : 'Book VF 6 Test Drive', action: 'book_test_drive', payload: 'vf-6' },
      ]
    };
  }

  if (q.includes('vf 7') || q.includes('vf7')) {
    const text = isTagalog
      ? [
          'PANGKALAHATANG TINGIN SA VINFAST VF 7',
          '',
          'Ang VF 7 ay midsize crossover na may disenyong hango sa fighter-jet at bilis na tulad ng supercar:',
          '',
          'MGA PANGUNAHING DETALYE',
          'Model: VF 7',
          'Kategorya: Midsize Crossover',
          'VF 7 Eco SRP: ₱1,760,000',
          'VF 7 Plus SRP: ₱2,380,000',
          'Range: 450 km WLTP',
          'Electric Motor: 201 hp / 280 Nm (Eco) o 348 hp / 500 Nm (Plus AWD)',
          'Akselerasyon: 0-100 km/h sa loob ng 5.8 segundo (Plus)',
          'Garantiya sa Sasakyan: 10 Taon o 200,000 km',
          '',
          generateDynamicClosingQuestion('specs', 'VF 7', context, lang)
        ].join('\n')
      : [
          'VINFAST VF 7 OVERVIEW',
          '',
          'The VF 7 is our midsize crossover featuring fighter-jet inspired architecture and supercar-level acceleration:',
          '',
          'KEY SPECIFICATIONS',
          'Model: VF 7',
          'Segment: Midsize Crossover',
          'VF 7 Eco SRP: ₱1,760,000',
          'VF 7 Plus SRP: ₱2,380,000',
          'Driving Range: 450 km WLTP',
          'Electric Motor: 201 hp / 280 Nm (Eco) or 348 hp / 500 Nm (Plus AWD)',
          'Acceleration: 0-100 km/h in 5.8 seconds (Plus)',
          'Vehicle Warranty: 10 Years or 200,000 km',
          '',
          generateDynamicClosingQuestion('specs', 'VF 7', context, lang)
        ].join('\n');

    return {
      text,
      mediaUrls: [
        'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf7%20black.png',
        'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf7%20blue.png',
      ],
      quickActions: [
        { label: isTagalog ? 'Kwentahin ang Buwanang Hulog ng VF 7' : 'Calculate VF 7 Monthly', action: 'calculate_model', payload: 'vf-7' },
        { label: isTagalog ? 'Mag-book ng VF 7 Test Drive' : 'Book VF 7 Test Drive', action: 'book_test_drive', payload: 'vf-7' },
      ]
    };
  }

  if (q.includes('vf 9') || q.includes('vf9')) {
    const text = isTagalog
      ? [
          'PANGKALAHATANG TINGIN SA VINFAST VF 9',
          '',
          'Ang VF 9 ay ang aming punong barko na full-size luxury 3-row electric SUV para sa mga VIP at pamilya:',
          '',
          'MGA PANGUNAHING DETALYE',
          'Model: VF 9',
          'Kategorya: Flagship Luxury SUV',
          'Tinatayang SRP: ₱4,990,000 hanggang ₱5,390,000',
          'Range: Mahigit 600+ km WLTP',
          'Lakas ng Motor: 402 hp AWD Dual Motor',
          'Kapasidad: 7 Marangyang Upuan na may massage and executive console',
          '',
          generateDynamicClosingQuestion('specs', 'VF 9', context, lang)
        ].join('\n')
      : [
          'VINFAST VF 9 OVERVIEW',
          '',
          'The VF 9 is our full-size 3-row presidential luxury electric SUV engineered for VIPs and families:',
          '',
          'KEY SPECIFICATIONS',
          'Model: VF 9',
          'Segment: Flagship Luxury SUV',
          'Estimated SRP: ₱4,990,000 to ₱5,390,000',
          'Driving Range: 600+ km WLTP',
          'Electric Motor: 402 hp AWD Dual Motor',
          'Seating: 7 Luxurious Seats with massage functionality and executive center console',
          '',
          generateDynamicClosingQuestion('specs', 'VF 9', context, lang)
        ].join('\n');

    return {
      text,
      mediaUrls: [],
      quickActions: [
        { label: isTagalog ? 'Mag-book ng Konsultasyon sa VF 9' : 'Book VF 9 Consultation', action: 'book_test_drive', payload: 'vf-9' },
      ]
    };
  }

  // VF 8 inquiry: clarify it is not available in PH
  if (q.includes('vf 8') || q.includes('vf8')) {
    const text = isTagalog
      ? [
          'IMPORMASYON UKOL SA MODEL AVAILABILITY',
          '',
          'Nais po naming ipabatid na ang VF 8 ay kasalukuyang hindi inaalok sa merkado ng Pilipinas.',
          '',
          'OPISYAL NA LINEUP SA PILIPINAS',
          '- VF 3: Urban Mini Electric SUV simula ₱590,000 (Battery Subscription)',
          '- VF 5 Plus: Compact Family Crossover simula ₱949,000 (Battery Subscription)',
          '- VF 6: Subcompact Italian-Styled Crossover simula ₱1,499,000',
          '- VF 7: Aero-Dynamic Midsize Crossover na may hanggang 348 hp AWD simula ₱1,760,000',
          '- VF 9: Presidential 7-Seater Luxury Flagship SUV simula ₱4,990,000',
          '',
          generateDynamicClosingQuestion('general', 'VF 7', context, lang)
        ].join('\n')
      : [
          'VINFAST PHILIPPINES LINEUP AVAILABILITY',
          '',
          'Please note that the VF 8 is currently not available in the Philippine market.',
          '',
          'OFFICIAL PHILIPPINE LINEUP',
          '- VF 3: Urban Mini Electric SUV starting at ₱590,000 (Battery Subscription)',
          '- VF 5 Plus: Compact Family Crossover starting at ₱949,000 (Battery Subscription)',
          '- VF 6: Subcompact Italian-Styled Crossover starting at ₱1,499,000',
          '- VF 7: Aero-Dynamic Midsize Performance Crossover starting at ₱1,760,000',
          '- VF 9: Presidential 7-Seater Luxury Flagship SUV starting at ₱4,990,000',
          '',
          generateDynamicClosingQuestion('general', 'VF 7', context, lang)
        ].join('\n');

    return {
      text,
      mediaUrls: [],
      quickActions: [
        { label: isTagalog ? 'Suriin ang VF 7' : 'Explore VF 7', action: 'calculate_model', payload: 'vf-7' },
        { label: isTagalog ? 'Suriin ang VF 9' : 'Explore VF 9', action: 'calculate_model', payload: 'vf-9' },
      ]
    };
  }

  // 9. Competitor comparison queries
  if (
    q.includes('toyota') ||
    q.includes('byd') ||
    q.includes('nissan') ||
    q.includes('honda') ||
    q.includes('compare') ||
    q.includes('ihambing') ||
    q.includes('vs') ||
    q.includes('gas') ||
    q.includes('gasolina') ||
    q.includes('ice') ||
    q.includes('vios') ||
    q.includes('raize') ||
    q.includes('dolphin')
  ) {
    const text = isTagalog
      ? [
          'BAKIT NANGUNGUNA ANG VINFAST KONTRA SA GAS AT IBANG EV',
          '',
          'Kapag pinili mo ang VinFast kaysa sa mga tradisyonal na sasakyang de-gasolina o kalabang EV sa Pilipinas, makakamit mo ang mga sumusunod na bentahe:',
          '',
          'BENTAHE SA PINANSYAL',
          '- Battery Subscription Model: Pinapababa nang husto ng VinFast ang paunang presyo ng sasakyan. Ang VF 3 ay simula ₱590,000 at ang VF 5 Plus ay simula ₱949,000.',
          '- Zero Gasolina Expenses: Wala nang ₱70 kada litro na gastusin sa gasolina. Humigit-kumulang 70% mas mura ang pag-charge kaysa sa gasolina.',
          '',
          'MABABANG MAINTENANCE AT MATIBAY NA KALIDAD',
          '- Walang Engine Maintenance: Wala nang langis ng makina, spark plugs, oil filters, at radiator flushes. Nababawasan ng mahigit 60% ang taunang gastos.',
          '- Regenerative Braking: Hindi madaling mapudpod ang brake pads at rotors.',
          '',
          'KAPANATAGAN SA PAGMAMAY-ARI',
          '- Nangungunang Warranty: Hanggang 10 Taon o 200,000 km na vehicle warranty.',
          '- Libreng Palit ng Baterya: Sa ilalim ng battery subscription, libreng papalitan ang baterya kung bumaba sa 70% ang kapasidad.',
          '',
          generateDynamicClosingQuestion('comparison', activeModel, context, lang)
        ].join('\n')
      : [
          'WHY VINFAST OUTPERFORMS TRADITIONAL GAS AND RIVAL EVS',
          '',
          'When you choose VinFast over traditional gasoline cars or competing EV brands in the Philippines, you unlock distinct financial and engineering advantages:',
          '',
          'FINANCIAL ADVANTAGE',
          '- Battery Subscription Model: Drastically lowers initial cash outlay. The VF 3 starts at only ₱590,000, and the VF 5 Plus starts at ₱949,000.',
          '- Zero Fuel Expenses: Save up to 70% on operating costs compared to ₱70/liter gasoline prices.',
          '',
          'LOW MAINTENANCE AND RELIABILITY',
          '- No Engine Maintenance: No motor oil, spark plugs, oil filters, or radiator flushes. Annual maintenance costs are cut by over 60%.',
          '- Regenerative Braking: Electric motor deceleration drastically reduces wear on brake pads.',
          '',
          'TOTAL OWNERSHIP CONFIDENCE',
          '- Industry-Leading Warranty: Up to 10 Years or 200,000 km vehicle warranty coverage.',
          '- Lifetime Battery Health Guarantee: Free replacement if battery capacity drops below 70% under battery subscription.',
          '',
          generateDynamicClosingQuestion('comparison', activeModel, context, lang)
        ].join('\n');

    return {
      text,
      mediaUrls: [],
      quickActions: [
        { label: isTagalog ? 'Ihambing sa Calculator' : 'Compare on Calculator', action: 'calculate_model', payload: activeModelId },
        { label: isTagalog ? 'Mag-book ng Test Drive' : 'Book a Test Drive', action: 'book_test_drive', payload: activeModelId },
      ]
    };
  }

  // 10. Battery subscription specific queries
  if (q.includes('battery subscription') || q.includes('subscription') || q.includes('battery lease') || q.includes('rental') || q.includes('baterya')) {
    if (context.repeatTopicCount > 0) {
      const text = isTagalog
        ? [
            'MGA DETALYE NG VINFAST BATTERY SUBSCRIPTION PLANS',
            '',
            'Narito ang mga detalye upang mapili mo ang pinakamagandang subscription tier para sa iyong biyahe:',
            '',
            'MGA PLANO AT TIERS',
            '- Regular Commuter Tier: Para sa mga nagbibiyahe nang mas mababa sa 1,200 km bawat buwan, abot-kaya ang buwanang bayad.',
            '- Unlimited Mileage Tier: Para sa mga daily expressway commuters o TNVS drivers na walang limitasyon sa distansya.',
            '',
            'HABANG-BUHAY NA PROTEKSYON AT RESALE',
            '- 70% Health Guarantee: Kung bumaba sa 70% ang battery capacity, papalitan ito ng bago ng VinFast nang libre.',
            '- Walang Pagbaba ng Halaga (No Depreciation): Kapag ibinenta mo ang sasakyan, ililipat lang ang subscription sa bibili.',
            '',
            generateDynamicClosingQuestion('subscription', activeModel, context, lang)
          ].join('\n')
        : [
            'VINFAST BATTERY SUBSCRIPTION TIERS AND VALUE',
            '',
            'Here are the specifics to help you choose the best subscription tier for your driving profile:',
            '',
            'SUBSCRIPTION TIERS',
            '- Commuter Tier: Ideal for drivers covering under 1,200 km per month, keeping fixed costs minimal.',
            '- Unlimited Mileage Tier: Perfect for daily long-distance commuters and active families with zero distance limits.',
            '',
            'LIFETIME PROTECTION AND RESALE ADVANTAGE',
            '- 70% Health Guarantee: Free battery replacement if capacity ever dips below 70%.',
            '- High Resale Value: The subscription simply transfers to the next owner, eliminating all battery aging concerns.',
            '',
            generateDynamicClosingQuestion('subscription', activeModel, context, lang)
          ].join('\n');

      return {
        text,
        mediaUrls: [],
        quickActions: [
          { label: isTagalog ? 'Kwentahin ang Subscription' : 'Calculate Subscription', action: 'calculate_model', payload: activeModelId },
          { label: isTagalog ? 'Mag-book ng Test Drive' : 'Book Test Drive', action: 'book_test_drive', payload: activeModelId },
        ]
      };
    }

    const text = isTagalog
      ? [
          'PROGRAMA NG VINFAST BATTERY SUBSCRIPTION',
          '',
          'Ang VinFast Battery Subscription ay isang makabagong solusyon sa pagmamay-ari na ginawa para sa mga motorista sa Pilipinas:',
          '',
          'PAANO ITO GUMAGANA',
          '- Mas Mababang SRP: Binibili mo ang sasakyan nang hindi binabayaran nang buo ang presyo ng battery pack. Dahil dito, ang presyo ng VF 3 ay bumababa sa ₱590,000 at ang VF 5 Plus sa ₱949,000.',
          '- Buwanang Subscription Fee: Magbabayad ka ng abot-kayang buwanang halaga na sumasakop sa paggamit at buong serbisyo ng baterya.',
          '- Habang-buhay na Proteksyon: Libreng pinapalitan ng VinFast ang baterya kung bumaba ang kapasidad nito sa 70% state of health.',
          '- Walang Pag-aalala sa Resale Value: Kapag ibebenta mo ang sasakyan sa hinaharap, ililipat lamang ang subscription sa bagong may-ari.',
          '',
          'PAGHAHAMBING NG PRESYO',
          '- VF 3 Diretso / Outright: ₱745,000 | May Battery Subscription: ₱590,000',
          '- VF 5 Plus Diretso / Outright: ₱1,191,000 | May Battery Subscription: ₱992,000',
          '',
          generateDynamicClosingQuestion('subscription', activeModel, context, lang)
        ].join('\n')
      : [
          'VINFAST BATTERY SUBSCRIPTION PROGRAM',
          '',
          'The VinFast Battery Subscription model is an innovative ownership solution tailored for Filipino motorists:',
          '',
          'HOW IT WORKS',
          '- Substantially Lower SRP: You purchase the vehicle without paying upfront for the battery pack. This brings the entry price of the VF 3 down to ₱590,000 and the VF 5 Plus to ₱992,000.',
          '- Monthly Subscription Fee: You pay a predictable monthly fee that covers the battery use and full maintenance.',
          '- Lifetime Battery Protection: VinFast replaces the battery completely free of charge if its capacity ever dips below 70% state of health.',
          '- High Resale Value: When you sell the vehicle later, the new owner assumes the subscription, ensuring high resale value without battery degradation concerns.',
          '',
          'PRICING COMPARISON',
          '- VF 3 Outright: ₱745,000 | With Battery Subscription: ₱590,000',
          '- VF 5 Plus Outright: ₱1,191,000 | With Battery Subscription: ₱992,000',
          '',
          generateDynamicClosingQuestion('subscription', activeModel, context, lang)
        ].join('\n');

    return {
      text,
      mediaUrls: [],
      quickActions: [
        { label: isTagalog ? 'Kwentahin ang Subscription' : 'Calculate Subscription Amortization', action: 'calculate_model', payload: activeModelId },
        { label: isTagalog ? 'Mag-book ng Test Drive' : 'Book Test Drive', action: 'book_test_drive', payload: activeModelId },
      ]
    };
  }

  // 11. Dealership or location queries
  const dealerMatch = findNearestDealer(q);
  const isDealerQuery = q.includes('dealer') || q.includes('showroom') || q.includes('branch') || q.includes('saan') || q.includes('where') || q.includes('location') || q.includes('visit') || q.includes('address') || q.includes('hotline') || q.includes('phone') || dealerMatch !== undefined;

  if (isDealerQuery) {
    if (dealerMatch) {
      const text = isTagalog
        ? [
            'OPISYAL NA DEALERSHIP NETWORK NG VINFAST PHILIPPINES',
            '',
            'Narito ang inirerekomendang VinFast showroom na pinakamalapit sa iyong lokasyon:',
            '',
            'MGA DETALYE NG SHOWROOM',
            `Pangalan ng Dealer: ${dealerMatch.name}`,
            `Rehiyon: ${dealerMatch.region}`,
            `Address: ${dealerMatch.address}`,
            `Opisyal na Hotline: ${dealerMatch.hotline}`,
            `Mga Lugar na Sineserbisyohan: ${dealerMatch.serves.join(', ')}`,
            '',
            'Ang aming showroom ay kumpleto sa mga demo units, DC fast-chargers, at sertipikadong VinFast product specialists na handang tumulong sa iyo.',
            '',
            generateDynamicClosingQuestion('dealers', activeModel, context, lang, dealerMatch.name)
          ].join('\n')
        : [
            'OFFICIAL VINFAST PHILIPPINES DEALER NETWORK',
            '',
            'Here is the recommended VinFast showroom serving your area:',
            '',
            'DEALERSHIP DETAILS',
            `Dealer Name: ${dealerMatch.name}`,
            `Region: ${dealerMatch.region}`,
            `Address: ${dealerMatch.address}`,
            `Official Hotline: ${dealerMatch.hotline}`,
            `Areas Served: ${dealerMatch.serves.join(', ')}`,
            '',
            'Our showroom is equipped with demo vehicles, DC fast-chargers, and certified VinFast product specialists ready to welcome you.',
            '',
            generateDynamicClosingQuestion('dealers', activeModel, context, lang, dealerMatch.name)
          ].join('\n');

      return {
        text,
        mediaUrls: [],
        suggestedDealer: dealerMatch,
        quickActions: [
          { label: isTagalog ? `Mag-book sa ${dealerMatch.city}` : `Book at ${dealerMatch.city}`, action: 'book_test_drive', payload: dealerMatch.id },
          { label: isTagalog ? `Tawagan ang ${dealerMatch.hotline}` : `Call ${dealerMatch.hotline}`, action: 'call_dealer', payload: dealerMatch.hotlineRaw },
        ]
      };
    }

    // General dealer network overview
    const text = isTagalog
      ? [
          'OPISYAL NA DEALERSHIP NETWORK NG VINFAST PHILIPPINES',
          '',
          'Ang VinFast ay may 29 na awtorisadong dealership at service hub sa buong bansa:',
          '',
          'MGA LOKASYON SA METRO MANILA',
          '- VinFast BGC (Taguig) | Hotline: 0927 324 5063',
          '- VinFast ATC Filinvest (Muntinlupa) | Hotline: 0917 513 5782',
          '- VinFast Eton Centris (Quezon City) | Hotline: 0905 315 7138',
          '- VinFast Commonwealth (Quezon City) | Hotline: 0927 324 5061',
          '- VinFast Dashmotor West Ave (Quezon City) | Hotline: 0995 459 3150',
          '- VinFast Greenhills (Mandaluyong) | Hotline: 02 8287 8318',
          '- VinFast Libis-Acropolis (Quezon City) | Hotline: 0915 087 2101',
          '- VinFast Las Pinas | Hotline: 0977 723 8547',
          '- VinFast Caloocan / Dasmarinas Street | Hotline: 0995 721 6729',
          '- VinFast Fairview (Quezon City) | Hotline: 0906 378 6178',
          '',
          'MGA PANLALAWIGANG HUB',
          '- Hilagang Luzon: Tarlac, Bulacan, Isabela, Nueva Ecija, Pangasinan, La Union',
          '- Timog Luzon at Cavite: Bacoor, Dasmarinas, Batangas City',
          '- Visayas: Cebu Central, Cebu North Mandaue, Cebu South SRP, Dumaguete',
          '- Mindanao: Davao City Buhangin, Tagum City, General Santos City',
          '',
          generateDynamicClosingQuestion('dealers', activeModel, context, lang)
        ].join('\n')
      : [
          'OFFICIAL VINFAST PHILIPPINES DEALER NETWORK',
          '',
          'VinFast operates 29 authorized dealership and service locations across the country:',
          '',
          'METRO MANILA LOCATIONS',
          '- VinFast BGC (Taguig) | Hotline: 0927 324 5063',
          '- VinFast ATC Filinvest (Muntinlupa) | Hotline: 0917 513 5782',
          '- VinFast Eton Centris (Quezon City) | Hotline: 0905 315 7138',
          '- VinFast Commonwealth (Quezon City) | Hotline: 0927 324 5061',
          '- VinFast Dashmotor West Ave (Quezon City) | Hotline: 0995 459 3150',
          '- VinFast Greenhills (Mandaluyong) | Hotline: 02 8287 8318',
          '- VinFast Libis-Acropolis (Quezon City) | Hotline: 0915 087 2101',
          '- VinFast Las Pinas | Hotline: 0977 723 8547',
          '- VinFast Caloocan / Dasmarinas Street | Hotline: 0995 721 6729',
          '- VinFast Fairview (Quezon City) | Hotline: 0906 378 6178',
          '',
          'PROVINCIAL HUBS',
          '- North Luzon: Tarlac, Bulacan, Isabela, Nueva Ecija, Pangasinan, La Union',
          '- South Luzon & Cavite: Bacoor, Dasmarinas, Batangas City',
          '- Visayas: Cebu Central, Cebu North Mandaue, Cebu South SRP, Dumaguete',
          '- Mindanao: Davao City Buhangin, Tagum City, General Santos City',
          '',
          generateDynamicClosingQuestion('dealers', activeModel, context, lang)
        ].join('\n');

    return {
      text,
      mediaUrls: [],
      quickActions: [
        { label: isTagalog ? 'Tingnan Lahat ng 29 Dealers' : 'View All 29 Dealers', action: 'view_dealer' },
        { label: isTagalog ? 'Mag-book ng Test Drive' : 'Book a Test Drive', action: 'book_test_drive' },
      ]
    };
  }

  // 12. Price, financing, discount, promo, down payment inquiries
  if (q.includes('price') || q.includes('presyo') || q.includes('magkano') || q.includes('srp') || q.includes('cost') || q.includes('financing') || q.includes('monthly') || q.includes('promo') || q.includes('discount') || q.includes('down payment') || q.includes('hulog')) {
    if (context.repeatTopicCount > 0) {
      const text = isTagalog
        ? [
            'DETALYADONG FINANCING AT BUWANANG HULOG',
            '',
            'Narito ang tinatayang buwanang hulog batay sa 20% down payment kasama ang ating partner banks (BDO, BPI, Metrobank, Security Bank):',
            '',
            'MGA SAMPOL NA HULOG (36 BUWAN / 20% DOWN)',
            '- VF 3 (Battery Subscription): ~₱11,800 bawat buwan (Down Payment: ₱118,000)',
            '- VF 3 (Outright): ~₱14,900 bawat buwan (Down Payment: ₱149,000)',
            '- VF 5 Plus (Battery Subscription): ~₱16,400 bawat buwan (Down Payment: ₱198,400)',
            '- VF 5 Plus (Outright): ~₱19,800 bawat buwan (Down Payment: ₱238,200)',
            '',
            'MGA BENEPISYO SA FINANCING',
            '- 0% Excise Tax: Alinsunod sa EVIDA Law, walang excise tax na ipinapataw.',
            '- Mabilis na Pag-apruba: 24-48 oras na pre-approval kasama ang aming finance specialists.',
            '',
            generateDynamicClosingQuestion('pricing', activeModel, context, lang)
          ].join('\n')
        : [
            'DETAILED BANK FINANCING AND MONTHLY BREAKDOWN',
            '',
            'Here is the estimated monthly amortization based on a 20% down payment with our partner banks (BDO, BPI, Metrobank, Security Bank):',
            '',
            'SAMPLE AMORTIZATION (36 MONTHS / 20% DOWN)',
            '- VF 3 (Battery Subscription): ~₱11,800 / month (Down Payment: ₱118,000)',
            '- VF 3 (Outright): ~₱14,900 / month (Down Payment: ₱149,000)',
            '- VF 5 Plus (Battery Subscription): ~₱16,400 / month (Down Payment: ₱198,400)',
            '- VF 5 Plus (Outright): ~₱19,800 / month (Down Payment: ₱238,200)',
            '',
            'FINANCING PRIVILEGES',
            '- 0% Excise Tax: Fully exempt from excise taxes under national EVIDA law.',
            '- Fast-Track Bank Approvals: 24 to 48-hour pre-approval turnaround.',
            '',
            generateDynamicClosingQuestion('pricing', activeModel, context, lang)
          ].join('\n');

      return {
        text,
        mediaUrls: [],
        quickActions: [
          { label: isTagalog ? 'Kwentahin sa Calculator' : 'Use Calculator', action: 'calculate_model', payload: activeModelId },
          { label: isTagalog ? 'Mag-book ng Test Drive' : 'Book Test Drive', action: 'book_test_drive', payload: activeModelId },
        ]
      };
    }

    const text = isTagalog
      ? [
          'OPISYAL NA PRESYO AT FINANCING NG VINFAST PHILIPPINES',
          '',
          'Narito ang opisyal na SRP at financing terms para sa ating kasalukuyang lineup:',
          '',
          'LISTAHAN NG PRESYO',
          '- VF 3: ₱745,000 (Diretso) o ₱590,000 (Battery Subscription)',
          '- VF 5 Plus: ₱1,191,000 (Diretso) o ₱992,000 (Battery Subscription)',
          '- VF 6 Eco: ₱1,499,000 | VF 6 Plus: ₱1,699,000',
          '- VF 7 Eco: ₱1,760,000 | VF 7 Plus AWD: ₱2,380,000',
          '- VF 9: ₱4,990,000 hanggang ₱5,390,000',
          '',
          'MGA OPSYON SA FINANCING',
          '- Paunang Bayad (Down Payment): Mula 10% hanggang 50%',
          '- Tagal ng Loan: 12, 24, 36, 48, o 60 buwan',
          '- Interes: May paborableng 8.0% taunang interes kasama ang partner banks',
          '',
          generateDynamicClosingQuestion('pricing', activeModel, context, lang)
        ].join('\n')
      : [
          'OFFICIAL VINFAST PHILIPPINES PRICING AND PROMOTIONS',
          '',
          'Here are the official SRP and financing parameters across our current lineup:',
          '',
          'PRICE LIST',
          '- VF 3: ₱745,000 (Outright) or ₱590,000 (Battery Subscription)',
          '- VF 5 Plus: ₱1,191,000 (Outright) or ₱992,000 (Battery Subscription)',
          '- VF 6 Eco: ₱1,499,000 | VF 6 Plus: ₱1,699,000',
          '- VF 7 Eco: ₱1,760,000 | VF 7 Plus AWD: ₱2,380,000',
          '- VF 9: ₱4,990,000 to ₱5,390,000',
          '',
          'FINANCING OPTIONS',
          '- Down Payment: Flexible terms from 10% to 50%',
          '- Loan Tenure: 12, 24, 36, 48, or 60 months',
          '- Indicative Interest Rate: Competitive 8.0% annual interest with our partner banks',
          '',
          generateDynamicClosingQuestion('pricing', activeModel, context, lang)
        ].join('\n');

    return {
      text,
      mediaUrls: [],
      quickActions: [
        { label: isTagalog ? 'Gamitin ang Calculator' : 'Use Financial Calculator', action: 'calculate_model', payload: activeModelId },
        { label: isTagalog ? 'Mag-book ng Test Drive' : 'Book a Test Drive', action: 'book_test_drive', payload: activeModelId },
      ]
    };
  }

  // 13. Greeting or general consultation
  const isGreeting = q.includes('kamusta') || q.includes('kumusta') || q.includes('hello') || q.includes('hi') || q.includes('gandang') || q.includes('magandang');

  if (isGreeting) {
    const text = isTagalog
      ? [
          'MALIGAYANG PAGDATING SA VINFAST PHILIPPINES',
          '',
          'Ako ang iyong opisyal na VinFast Sales Specialist. Narito ako upang tulungan kang pumili ng tamang VinFast EV, mag-compute ng iyong monthly amortization, at mag-schedule ng test drive sa pinakamalapit na dealership sa inyong lugar.',
          '',
          'MGA PANGUNAHING MODELO',
          '- VF 3: ₱590,000 (Battery Subscription) | ₱745,000 (Diretso) - 210 km range',
          '- VF 5 Plus: ₱992,000 (Battery Subscription) | ₱1,191,000 (Diretso) - 326 km range',
          '- VF 6: ₱1,499,000 hanggang ₱1,699,000 - 399 km range',
          '- VF 7: ₱1,760,000 hanggang ₱2,380,000 - 450 km range',
          '- VF 9: ₱4,990,000 hanggang ₱5,390,000 - 600+ km range',
          '',
          generateDynamicClosingQuestion('general', 'VF 3', context, lang)
        ].join('\n')
      : [
          'WELCOME TO VINFAST PHILIPPINES',
          '',
          'Hello, I am your VinFast Senior Sales Specialist and EV Consultant. I can assist you with official Philippine pricing, battery subscription plans, real-world range calculations, and connect you with any of our 29 authorized showrooms across Luzon, Visayas, and Mindanao.',
          '',
          'POPULAR CHOICES',
          '- VF 3: ₱590,000 (Battery Subscription) | ₱745,000 (Outright) - 210 km range',
          '- VF 5 Plus: ₱992,000 (Battery Subscription) | ₱1,191,000 (Outright) - 326 km range',
          '- VF 6: ₱1,499,000 to ₱1,699,000 - 399 km range',
          '- VF 7: ₱1,760,000 to ₱2,380,000 - 450 km range',
          '- VF 9: ₱4,990,000 to ₱5,390,000 - 600+ km range',
          '',
          generateDynamicClosingQuestion('general', 'VF 3', context, lang)
        ].join('\n');

    return {
      text,
      mediaUrls: [],
      quickActions: [
        { label: isTagalog ? 'Subukan ang VF 5 Plus' : 'Test Drive VF 5 Plus', action: 'book_test_drive', payload: 'vf-5-plus' },
        { label: isTagalog ? 'Subukan ang VF 3' : 'Test Drive VF 3', action: 'book_test_drive', payload: 'vf-3' },
        { label: isTagalog ? 'Kwentahin ang Buwanang Hulog' : 'Calculate Monthly', action: 'calculate_model', payload: 'vf-5-plus' },
      ]
    };
  }

  // 14. Non-automotive queries: steer back politely to automotive options
  const isNonAutomotive = q.includes('recipe') || q.includes('luto') || q.includes('ulam') || q.includes('weather') || q.includes('panahon') || q.includes('crypto') || q.includes('movie') || q.includes('pelikula') || q.includes('song') || q.includes('kanta') || q.includes('joke');
  if (isNonAutomotive) {
    const text = isTagalog
      ? [
          'SERBISYONG PANG-BENTA NG VINFAST',
          '',
          'Bagamat ako ay nakalaan para sa mga sasakyan at serbisyo ng VinFast, labis kong ikagagalak na tulungan kang mahanap ang tamang electric vehicle para sa iyong pamumuhay at biyahe sa Pilipinas.',
          '',
          'Mayroon kaming mga modelo mula sa urban VF 3 simula ₱590,000 hanggang sa marangyang 7-seater VF 9 flagship SUV.',
          '',
          generateDynamicClosingQuestion('general', 'VF 3', context, lang)
        ].join('\n')
      : [
          'VINFAST SALES ASSISTANCE',
          '',
          'While I specialize exclusively in VinFast automotive solutions, I would love to help you find the perfect electric vehicle for your daily lifestyle and commute in the Philippines.',
          '',
          'We offer an exciting lineup ranging from the urban VF 3 starting at ₱590,000 up to the luxurious 7-seater VF 9 flagship SUV.',
          '',
          generateDynamicClosingQuestion('general', 'VF 3', context, lang)
        ].join('\n');

    return {
      text,
      mediaUrls: [],
      quickActions: [
        { label: isTagalog ? 'Suriin ang VF 5 Plus' : 'Explore VF 5 Plus', action: 'calculate_model', payload: 'vf-5-plus' },
        { label: isTagalog ? 'Suriin ang VF 3' : 'Explore VF 3', action: 'calculate_model', payload: 'vf-3' },
      ]
    };
  }

  // 15. Default fallback sales response leading to a close
  const text = isTagalog
    ? [
        'VINFAST ELECTRIC VEHICLES PILIPINAS',
        '',
        'Ang VinFast ang nangunguna sa electric mobility revolution sa Pilipinas na may makabagong disenyo, zero gastusin sa gasolina, at pinakamatibay na warranty.',
        '',
        'ANG ATING OPISYAL NA LINEUP',
        '- VF 3: Mini Electric SUV simula ₱590,000 (Battery Subscription)',
        '- VF 5 Plus: Compact Family Crossover simula ₱992,000 (Battery Subscription)',
        '- VF 6: Subcompact Italian-Styled Crossover simula ₱1,499,000',
        '- VF 7: Aero-Dynamic Midsize Performance Crossover simula ₱1,760,000',
        '- VF 9: Presidential 7-Seater Luxury Flagship simula ₱4,990,000',
        '',
        generateDynamicClosingQuestion('general', activeModel, context, lang)
      ].join('\n')
    : [
        'VINFAST ELECTRIC VEHICLES PHILIPPINES',
        '',
        'VinFast is leading the Philippine electric mobility revolution with cutting-edge design, zero fuel costs, and unbeatable warranty coverage.',
        '',
        'OUR CURRENT LINEUP',
        '- VF 3: Mini Electric SUV starting at ₱590,000 (Battery Subscription)',
        '- VF 5 Plus: Compact Family Crossover starting at ₱992,000 (Battery Subscription)',
        '- VF 6: Subcompact Italian-Styled Crossover starting at ₱1,499,000',
        '- VF 7: Aero-Dynamic Midsize Performance Crossover starting at ₱1,760,000',
        '- VF 9: Presidential 7-Seater Luxury Flagship starting at ₱4,990,000',
        '',
        generateDynamicClosingQuestion('general', activeModel, context, lang)
      ].join('\n');

  return {
    text,
    mediaUrls: [],
    quickActions: [
      { label: isTagalog ? 'Mag-book ng Test Drive' : 'Book a Test Drive', action: 'book_test_drive', payload: activeModelId },
      { label: isTagalog ? 'Kwentahin ang Buwanang Hulog' : 'Calculate Monthly Amortization', action: 'calculate_model', payload: activeModelId },
      { label: isTagalog ? 'Hanapin ang Pinakamalapit na Dealer' : 'Find Nearest Dealer', action: 'view_dealer' },
    ]
  };
}
