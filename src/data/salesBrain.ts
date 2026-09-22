import type { Dealer } from '../types';
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
    q.includes('diin ang dealer') ||
    q.includes('pila ang balayran') ||
    q.includes('pila ang bili') ||
    q.includes('luyag ko') ||
    q.includes('gusto ko magpamangkot') ||
    q.includes('pamangkot');

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
  const genericMatch = q.match(/(?:speak|converse|talk|translate|switch to|in)\s+([a-zA-Z]+)/i);
  if (genericMatch && genericMatch[1]) {
    const word = genericMatch[1].toLowerCase();
    const commonIgnored = ['to', 'with', 'about', 'a', 'the', 'my', 'your', 'me', 'us', 'detail', 'details', 'terms', 'mind', 'fact', 'short', 'full'];
    if (!commonIgnored.includes(word)) {
      return { lang: word.toUpperCase(), isExplicitSwitch: true };
    }
  }

  // Otherwise retain current language
  return { lang: currentLang, isExplicitSwitch: false };
}

/**
 * Generates responses in languages requested by the customer (Bisaya, Ilonggo, Chinese, Spanish, Japanese, Korean, etc.)
 */
function generateMultilingualResponse(rawQuery: string, lang: string, isExplicitSwitch: boolean): BrainResponse | null {
  const q = rawQuery.toLowerCase();

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
          '- Cebu: VinFast Cebu Central, Mandaue, ug Dumaguete',
          '- Mindanao: VinFast Davao Buhangin, Tagum, ug General Santos',
          '',
          'Unsa nga VinFast model ang gusto nimong susihon o i-test drive karon?'
        ].join('\n'),
        mediaUrls: [],
      };
    }

    // VF 3 inquiries in Bisaya
    if (q.includes('3') || q.includes('vf 3') || q.includes('vf3')) {
      const media = MEDIA_MAP['vf 3'];
      const urls = media.map(m => m.url);
      const isPhoto = q.includes('photo') || q.includes('picture') || q.includes('color') || q.includes('kulay') || q.includes('litrato');
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
          '- Kolor: Adunay 9 ka mabulokong exterior finishes (Blue, Green, Light Blue, Grey, Pink, Purple, Red, White, Yellow)',
          '',
          isPhoto ? urls.join('\n\n') + '\n' : '',
          'Gusto ba nimong mag-schedule og libreng test drive sa labing duol nga showroom aron masulayan ang VF 3?'
        ].filter(Boolean).join('\n'),
        mediaUrls: urls,
      };
    }

    // VF 5 Plus inquiries in Bisaya
    if (q.includes('5') || q.includes('vf 5') || q.includes('vf5')) {
      const media = MEDIA_MAP['vf 5'];
      const urls = media.map(m => m.url);
      const isPhoto = q.includes('photo') || q.includes('picture') || q.includes('color') || q.includes('kulay') || q.includes('litrato');
      return {
        text: [
          'VINFAST VF 5 PLUS SA PILIPINAS',
          '',
          'Ang VF 5 Plus mao ang pinakamaayong compact crossover para sa pamilya ug adlaw-adlaw nga biyahe:',
          '',
          'MGA DETALYE UG PRESYO',
          '- Presyo nga may Battery Subscription: ₱992,000',
          '- Presyo nga Outright (apil na ang baterya): ₱1,191,000',
          '- Binuwan nga Hulog (Loan Amortization): Gibanabana nga ~₱16,400 matag buwan (36 ka bulan, 20% down payment)',
          '- Driving Range: 326 km (NEDC) sa matag full charge',
          '- Kusog sa Motor: 134 hp ug 135 Nm instant torque',
          '- Garantiya: 7 ka tuig o 160,000 km warranty',
          '',
          isPhoto ? urls.join('\n\n') + '\n' : '',
          'Gusto ba nimong ipag-andam tika og opisyal nga bank financing quotation o mag-book og VIP test drive karong semanaha?'
        ].filter(Boolean).join('\n'),
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
          'Gusto ba nimong susihon ang performance-oriented nga VF 7 o ang atong luxury 7-seater VF 9?'
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
          'Gusto ba nimong mag-book og VIP test drive sa pinakaduol nga VinFast showroom karon?'
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
        'Unsa nga VinFast model ang gusto nimong tun-an o i-test drive karong semanaha?'
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

    // VF 3 / VF 5 / Default in Ilonggo
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
          '请问您想了解哪一款车型的详细配置报价、月供分期测算，或为您预约 VIP 试驾？'
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
          '- 外观配色：提供 9 款个性时尚车身色彩（蓝色、绿色、浅蓝、灰色、粉色、紫色、红色、白色、黄色）',
          '',
          urls.join('\n\n'),
          '',
          '请问您想查看 VF 3 的实车外观图库，还是为您安排就近展厅试驾？'
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
          '- 电池租赁方案售价：₱992,000（每月电池租金 ₱3,500）',
          '- 含电池整车购买售价：₱1,191,000',
          '- 预估月供：约 ₱16,400 / 月（按 36 期，20% 首付测算）',
          '- 纯电续航里程：326 公里（NEDC 工况）',
          '- 动力性能：134 马力，135 牛·米即时扭矩输出',
          '- 质保承诺：7 年或 160,000 公里官方整车质保',
          '',
          urls.join('\n\n'),
          '',
          '请问您是否需要为您定制 20% 首付的合作银行贷款方案，或预约本周试驾？'
        ].join('\n'),
        mediaUrls: urls,
      };
    }

    // VF 8 clarification in Chinese
    if (q.includes('vf 8') || q.includes('vf8')) {
      return {
        text: [
          '车型供应说明',
          '',
          '谨此告知，VinFast VF 8 目前暂未在菲律宾市场上市销售。',
          '',
          '菲律宾官方现售全系车型',
          '- VF 3：城市微型纯电 SUV，起售价 ₱590,000',
          '- VF 5 Plus：紧凑型家用跨界车，起售价 ₱992,000',
          '- VF 6：意式轻奢跨界车，起售价 ₱1,499,000',
          '- VF 7：高性能破风跨界 SUV（348 马力 AWD），起售价 ₱1,760,000',
          '- VF 9：旗舰 7 座豪华全尺寸 SUV，起售价 ₱4,990,000',
          '',
          '请问您是否想了解性能优异的 VF 7，或是旗舰级 7 座 VF 9？'
        ].join('\n'),
        mediaUrls: [],
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
          '请问您想预约前往哪家展厅体验 VIP 试驾，或为您测算详细分期？'
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
        '请问您今天想了解哪一款车型的详细分期方案，或者需要为您预约 VIP 试驾吗？'
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
          '- 業界最長クラスの公式保証および24時間年中無休のロードサービス',
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
export function generateSalesResponse(rawQuery: string, language: string = 'EN'): BrainResponse {
  const query = rawQuery.trim();
  const q = query.toLowerCase();

  // 1. Multilingual detection & routing
  const { lang, isExplicitSwitch } = detectLanguage(rawQuery, language);
  const multiResponse = generateMultilingualResponse(rawQuery, lang, isExplicitSwitch);
  if (multiResponse) {
    return {
      ...multiResponse,
      detectedLanguage: lang,
    };
  }

  const isTagalog = lang === 'PH';

  // Check if user is asking about photos, pictures, colors, or looks
  const isPhotoRequest = q.includes('photo') || q.includes('picture') || q.includes('image') || q.includes('look') || q.includes('color') || q.includes('kulay') || q.includes('litrato') || q.includes('larawan') || q.includes('gallery');

  if (isPhotoRequest) {
    if (q.includes('3') || q.includes('vf 3') || q.includes('vf3')) {
      const media = MEDIA_MAP['vf 3'];
      const urls = media.map(m => m.url);
      const urlLines = urls.join('\n\n');

      const text = isTagalog
        ? [
            'MGA KULAY AT LITRATO NG VINFAST VF 3',
            '',
            'Ang VF 3 ay may 9 na makukulay at kapana-panabik na exterior colors para sa iyong urban lifestyle:',
            '',
            '- Blue',
            '- Green',
            '- Light Blue',
            '- Grey',
            '- Pink',
            '- Purple',
            '- Red',
            '- White',
            '- Yellow',
            '',
            urlLines,
            '',
            'Aling kulay ang nais mong makita nang personal sa pinakamalapit na VinFast showroom?'
          ].join('\n')
        : [
            'VINFAST VF 3 COLORWAY SHOWCASE',
            '',
            'The VF 3 is available in 9 eye-catching colors tailored for modern city driving:',
            '',
            '- Blue',
            '- Green',
            '- Light Blue',
            '- Grey',
            '- Pink',
            '- Purple',
            '- Red',
            '- White',
            '- Yellow',
            '',
            urlLines,
            '',
            'Which color variant would you like to see in person at your nearest VinFast showroom?'
          ].join('\n');

      return {
        text,
        mediaUrls: urls,
        quickActions: [
          { label: isTagalog ? 'Mag-book ng VF 3 Test Drive' : 'Book VF 3 Test Drive', action: 'book_test_drive', payload: 'vf-3' },
          { label: isTagalog ? 'Kwentahin ang VF 3 Monthly' : 'Calculate VF 3 Monthly', action: 'calculate_model', payload: 'vf-3' },
        ]
      };
    }

    if (q.includes('5') || q.includes('vf 5') || q.includes('vf5')) {
      const media = MEDIA_MAP['vf 5'];
      const urls = media.map(m => m.url);
      const urlLines = urls.join('\n\n');

      const text = isTagalog
        ? [
            'MGA KULAY NG VINFAST VF 5 PLUS',
            '',
            'Narito ang mga opisyal na factory exterior finishes para sa VF 5 Plus:',
            '',
            '- Brahminy White',
            '- Crimson Grey',
            '- Crimson Red',
            '- VinFast Blue',
            '',
            urlLines,
            '',
            'Nais mo bang ipag-schedule kita ng test drive para sa VF 5 Plus ngayong linggo upang maranasan mo ito nang personal?'
          ].join('\n')
        : [
            'VINFAST VF 5 PLUS COLORWAYS',
            '',
            'Here are the official factory exterior finishes for the VF 5 Plus:',
            '',
            '- Brahminy White',
            '- Crimson Grey',
            '- Crimson Red',
            '- VinFast Blue',
            '',
            urlLines,
            '',
            'Would you like me to schedule a test drive for you in the VF 5 Plus this week so you can experience it firsthand?'
          ].join('\n');

      return {
        text,
        mediaUrls: urls,
        quickActions: [
          { label: isTagalog ? 'Mag-book ng VF 5 Plus Test Drive' : 'Book VF 5 Plus Test Drive', action: 'book_test_drive', payload: 'vf-5-plus' },
          { label: isTagalog ? 'Kwentahin ang VF 5 Plus Amortization' : 'Calculate VF 5 Plus Amortization', action: 'calculate_model', payload: 'vf-5-plus' },
        ]
      };
    }

    if (q.includes('6') || q.includes('vf 6') || q.includes('vf6')) {
      const media = MEDIA_MAP['vf 6'];
      const urls = media.map(m => m.url);
      const urlLines = urls.join('\n\n');

      const text = isTagalog
        ? [
            'MGA KULAY NG VINFAST VF 6',
            '',
            'Ang Italian-styled VF 6 crossover ay may 5 eleganteng kulay:',
            '',
            '- Crimson Red',
            '- Infinity Blanc',
            '- Jet Black',
            '- Urban Mint',
            '- Zenith Grey',
            '',
            urlLines,
            '',
            'Ipagreserba ba kita ng test drive appointment para masubukan ang VF 6 Plus sa kalsada?'
          ].join('\n')
        : [
            'VINFAST VF 6 COLORWAYS',
            '',
            'The Italian-styled VF 6 crossover is available in 5 sophisticated colors:',
            '',
            '- Crimson Red',
            '- Infinity Blanc',
            '- Jet Black',
            '- Urban Mint',
            '- Zenith Grey',
            '',
            urlLines,
            '',
            'Shall I reserve a test drive appointment for you to test the VF 6 Plus on the open road?'
          ].join('\n');

      return {
        text,
        mediaUrls: urls,
        quickActions: [
          { label: isTagalog ? 'Mag-book ng VF 6 Test Drive' : 'Book VF 6 Test Drive', action: 'book_test_drive', payload: 'vf-6' },
        ]
      };
    }

    if (q.includes('7') || q.includes('vf 7') || q.includes('vf7')) {
      const media = MEDIA_MAP['vf 7'];
      const urls = media.map(m => m.url);
      const urlLines = urls.join('\n\n');

      const text = isTagalog
        ? [
            'MGA KULAY NG VINFAST VF 7',
            '',
            'Ang high-performance VF 7 midsize crossover ay may 7 kapansin-pansing kulay:',
            '',
            '- Jet Black',
            '- Blue',
            '- Green',
            '- Grey',
            '- Red',
            '- Silver',
            '- White',
            '',
            urlLines,
            '',
            'Nais mo bang maranasan ang 348 hp dual-motor VF 7 Plus sa isang eksklusibong test drive?'
          ].join('\n')
        : [
            'VINFAST VF 7 COLORWAYS',
            '',
            'The high-performance VF 7 midsize crossover comes in 7 distinct aerodynamic colors:',
            '',
            '- Jet Black',
            '- Blue',
            '- Green',
            '- Grey',
            '- Red',
            '- Silver',
            '- White',
            '',
            urlLines,
            '',
            'Would you like to experience the 348 hp dual-motor VF 7 Plus during an exclusive test drive?'
          ].join('\n');

      return {
        text,
        mediaUrls: urls,
        quickActions: [
          { label: isTagalog ? 'Mag-book ng VF 7 Test Drive' : 'Book VF 7 Test Drive', action: 'book_test_drive', payload: 'vf-7' },
        ]
      };
    }
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
          '- VF 3: Urban Mini Electric SUV simula P590,000 (Battery Subscription)',
          '- VF 5 Plus: Compact Family Crossover simula P949,000 (Battery Subscription)',
          '- VF 6: Subcompact Italian-Styled Crossover simula P1,499,000',
          '- VF 7: Aero-Dynamic Midsize Crossover na may hanggang 348 hp AWD simula P1,760,000',
          '- VF 9: Presidential 7-Seater Luxury Flagship SUV simula P4,990,000',
          '',
          'Nais mo bang suriin ang midsize VF 7 o ang aming flagship 7-seater na VF 9?'
        ].join('\n')
      : [
          'VINFAST PHILIPPINES LINEUP AVAILABILITY',
          '',
          'Please note that the VF 8 is currently not available in the Philippine market.',
          '',
          'OFFICIAL PHILIPPINE LINEUP',
          '- VF 3: Urban Mini Electric SUV starting at P590,000 (Battery Subscription)',
          '- VF 5 Plus: Compact Family Crossover starting at P949,000 (Battery Subscription)',
          '- VF 6: Subcompact Italian-Styled Crossover starting at P1,499,000',
          '- VF 7: Aero-Dynamic Midsize Performance Crossover starting at P1,760,000',
          '- VF 9: Presidential 7-Seater Luxury Flagship SUV starting at P4,990,000',
          '',
          'Would you like to explore the midsize VF 7 or our flagship VF 9 instead?'
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

  // Competitor comparison queries: Toyota, BYD, Nissan, Honda, Gas, ICE, Raize, Vios, Dolphin, Atto
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
          '- Battery Subscription Model: Pinapababa nang husto ng VinFast ang paunang presyo ng sasakyan sa pamamagitan ng hiwalay na battery subscription plan. Halimbawa, ang VF 5 Plus ay mabibili simula P949,000 lamang, at ang VF 3 simula P590,000 lamang.',
          '- Zero Gasolina Expenses: Wala nang P70 kada litro na gastusin sa gasolina. Ang pag-charge ng EV sa Pilipinas ay humigit-kumulang 70% mas mura kada kilometro kaysa sa internal combustion engine.',
          '',
          'MABABANG MAINTENANCE AT MATIBAY NA KALIDAD',
          '- Walang Engine Maintenance: Dahil electric motor ang gamit, wala nang kailangang langis ng makina, spark plugs, oil filters, transmission fluids, at radiator flushes. Nababawasan ng mahigit 60% ang taunang gastos sa maintenance.',
          '- Regenerative Braking: Ang preno ay gumagamit ng motor deceleration, kaya hindi madaling mapudpod ang brake pads at rotors.',
          '',
          'KAPANATAGAN SA PAGMAMAY-ARI',
          '- Nangungunang Warranty sa Industriya: Nag-aalok ang VinFast ng hanggang 10 Taon o 200,000 km na vehicle warranty, higit na mas mahaba kaysa sa karaniwang 3 o 5 taon ng ibang brand.',
          '- Garantiyang Libreng Palit ng Baterya: Sa ilalim ng battery subscription program, libreng papalitan ng VinFast ang baterya kung bumaba sa 70% ang kapasidad nito.',
          '',
          'SUPERIOR NA STANDARD SPECIFICATIONS',
          '- Mataas na Electric Torque: May instant 135 Nm torque sa VF 5 Plus at hanggang 500 Nm sa VF 7 Plus para sa agarang arangkada na walang lag.',
          '- Kumpletong ADAS Safety: Standard na ang smart cruise control, lane assist, at multiple airbags sa ating mga modelo.',
          '',
          'Nais mo bang ipaghanda kita ng custom bank financing quotation batay sa 20% down payment?'
        ].join('\n')
      : [
          'WHY VINFAST OUTPERFORMS TRADITIONAL GAS AND RIVAL EVS',
          '',
          'When you choose VinFast over traditional gasoline cars or competing EV brands in the Philippines, you unlock distinct financial and engineering advantages:',
          '',
          'FINANCIAL ADVANTAGE',
          '- Battery Subscription Model: VinFast drastically lowers your initial cash outlay by offering a dedicated battery subscription plan. For example, the VF 5 Plus is available starting at only P949,000, and the VF 3 starts at only P590,000.',
          '- Zero Fuel Expenses: Say goodbye to P70 per liter gasoline prices. Charging an EV in the Philippines costs approximately 70% less per kilometer than fueling an internal combustion engine.',
          '',
          'LOW MAINTENANCE AND RELIABILITY',
          '- No Engine Maintenance: Electric drivetrains eliminate motor oil, spark plugs, oil filters, transmission fluids, and radiator flushes. Typical annual maintenance costs are reduced by more than 60%.',
          '- Regenerative Braking: Electric motor deceleration reduces wear on brake pads and rotors, keeping replacement costs minimal.',
          '',
          'TOTAL OWNERSHIP CONFIDENCE',
          '- Industry-Leading Warranty: VinFast provides up to 10 Years or 200,000 km vehicle warranty, far surpassing the standard 3-year or 5-year warranties offered by competitors.',
          '- Guaranteed Battery Health: Under the battery subscription program, VinFast guarantees free battery replacement if capacity ever drops below 70%, giving you absolute peace of mind for the lifetime of the vehicle.',
          '',
          'SUPERIOR STANDARD SPECIFICATIONS',
          '- High Electric Torque: With 135 Nm instantly on the VF 5 Plus and up to 500 Nm on the VF 7 Plus, you enjoy instant acceleration with zero lag.',
          '- Complete ADAS Safety: Driver assistance systems, smart cruise control, and multi-airbag safety come standard.',
          '',
          'Shall I prepare a custom bank financing quotation for you based on a 20% down payment?'
        ].join('\n');

    return {
      text,
      mediaUrls: [],
      quickActions: [
        { label: isTagalog ? 'Ihambing sa Calculator' : 'Compare on Calculator', action: 'calculate_model', payload: 'vf-5-plus' },
        { label: isTagalog ? 'Mag-book ng Test Drive' : 'Book a Test Drive', action: 'book_test_drive', payload: 'vf-5-plus' },
      ]
    };
  }

  // Battery subscription specific queries
  if (q.includes('battery subscription') || q.includes('subscription') || q.includes('battery lease') || q.includes('rental') || q.includes('baterya')) {
    const text = isTagalog
      ? [
          'PROGRAMA NG VINFAST BATTERY SUBSCRIPTION',
          '',
          'Ang VinFast Battery Subscription ay isang makabagong solusyon sa pagmamay-ari na ginawa para sa mga motorista sa Pilipinas:',
          '',
          'PAANO ITO GUMAGANA',
          '- Mas Mababang SRP: Binibili mo ang sasakyan nang hindi binabayaran nang buo ang presyo ng battery pack. Dahil dito, ang presyo ng VF 3 ay bumababa sa P590,000 at ang VF 5 Plus sa P949,000.',
          '- Buwanang Subscription Fee: Magbabayad ka ng abot-kayang buwanang halaga na sumasakop sa paggamit at buong serbisyo ng baterya.',
          '- Habang-buhay na Proteksyon: Libreng pinapalitan ng VinFast ang baterya kung bumaba ang kapasidad nito sa 70% state of health.',
          '- Walang Pag-aalala sa Resale Value: Kapag ibebenta mo ang sasakyan sa hinaharap, ililipat lamang ang subscription sa bagong may-ari, kaya walang pangamba sa battery degradation.',
          '',
          'PAGHAHAMBING NG PRESYO',
          '- VF 3 Diretso / Outright: P745,000',
          '- VF 3 may Battery Subscription: P590,000',
          '- VF 5 Plus Diretso / Outright: P1,099,000',
          '- VF 5 Plus may Battery Subscription: P949,000',
          '',
          'Nais mo bang kwentahin natin ang iyong buwanang hulog sa ilalim ng Battery Subscription plan ngayon?'
        ].join('\n')
      : [
          'VINFAST BATTERY SUBSCRIPTION PROGRAM',
          '',
          'The VinFast Battery Subscription model is an innovative ownership solution tailored for Filipino motorists:',
          '',
          'HOW IT WORKS',
          '- Substantially Lower SRP: You purchase the vehicle without paying upfront for the battery pack. This brings the entry price of the VF 3 down to P590,000 and the VF 5 Plus to P949,000.',
          '- Monthly Subscription Fee: You pay a predictable monthly fee that covers the battery use and full maintenance.',
          '- Lifetime Battery Protection: VinFast replaces the battery completely free of charge if its capacity ever dips below 70% state of health.',
          '- No Battery Degradation Worry: When you sell the vehicle later, the new owner assumes the subscription, ensuring high resale value without battery degradation concerns.',
          '',
          'PRICING COMPARISON',
          '- VF 3 Outright Purchase: P745,000',
          '- VF 3 with Battery Subscription: P590,000',
          '- VF 5 Plus Outright Purchase: P1,099,000',
          '- VF 5 Plus with Battery Subscription: P949,000',
          '',
          'Would you like to calculate your monthly amortization under the Battery Subscription plan today?'
        ].join('\n');

    return {
      text,
      mediaUrls: [],
      quickActions: [
        { label: isTagalog ? 'Kwentahin ang Subscription' : 'Calculate Subscription Amortization', action: 'calculate_model', payload: 'vf-5-plus' },
        { label: isTagalog ? 'Mag-book ng Test Drive' : 'Book Test Drive', action: 'book_test_drive', payload: 'vf-5-plus' },
      ]
    };
  }

  // Dealership or location queries: dealer, showroom, branch, location, where, address, contact, hotline
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
            `Nais mo bang ipag-schedule kita ng test drive sa ${dealerMatch.name} ngayong linggo upang masubukan mo ang sasakyan?`
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
            `Would you like me to schedule a test drive for you at ${dealerMatch.name} this week so you can experience the vehicle firsthand?`
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
          'Saang lungsod o probinsya ka matatagpuan upang maiugnay kita sa pinakamalapit na dealership?'
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
          'Which city or province are you located in so I can connect you with your closest dealer?'
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

  // Model-specific inquiries: VF 3, VF 5, VF 6, VF 7, VF 9
  if (q.includes('vf 3') || q.includes('vf3')) {
    const text = isTagalog
      ? [
          'PANGKALAHATANG TINGIN SA VINFAST VF 3',
          '',
          'Ang VF 3 ay isang modernong mini electric SUV na binuo upang baguhin ang iyong pang-araw-araw na biyahe sa lungsod:',
          '',
          'MGA PANGUNAHING DETALYE',
          'Model: VF 3',
          'Kategorya: Mini Electric SUV',
          'Outright SRP: P745,000',
          'Battery Subscription SRP: P590,000',
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
          'Aling kulay ang nais mong ipareserba para sa iyong VF 3 ngayon?'
        ].join('\n')
      : [
          'VINFAST VF 3 OVERVIEW',
          '',
          'The VF 3 is an urban mini electric SUV engineered to transform your daily city drive:',
          '',
          'KEY SPECIFICATIONS',
          'Model: VF 3',
          'Segment: Mini Electric SUV',
          'Outright SRP: P745,000',
          'Battery Subscription SRP: P590,000',
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
          'Which color variant would you like to reserve for your VF 3 today?'
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
    const text = isTagalog
      ? [
          'PANGKALAHATANG TINGIN SA VINFAST VF 5 PLUS',
          '',
          'Ang VF 5 Plus ang pinakasikat na 5-seater compact crossover para sa mga pamilya at commuters sa Pilipinas:',
          '',
          'MGA PANGUNAHING DETALYE',
          'Model: VF 5 Plus',
          'Kategorya: Compact Crossover',
          'Outright SRP: P1,099,000',
          'Battery Subscription SRP: P949,000',
          'Range: 326 km NEDC',
          'Kapasidad ng Baterya: 37.23 kWh',
          'Electric Motor: 134 hp / 135 Nm torque',
          'Kapasidad: 5 Pasahero',
          'Infotainment: 8-inch Touchscreen na may 7-inch Driver Display',
          'Garantiya sa Sasakyan: 7 Taon o 160,000 km',
          '',
          'MGA BENEPISYO SA PAGMAMAY-ARI',
          '- Sa 326 km range, 2 hanggang 3 beses lamang kailangang mag-charge kada buwan para sa karaniwang biyahe.',
          '- Ang 135 Nm electric torque ay mas mabilis humarurot kaysa sa mga karaniwang 1.5-liter gasoline cars.',
          '- Kumpletong active at passive safety features kabilang ang 6 airbags, blind-spot detection, at rear cross-traffic alert.',
          '',
          'Nais mo bang ipag-schedule kita ng test drive para sa VF 5 Plus sa VinFast BGC o sa iyong pinakamalapit na showroom ngayong linggo?'
        ].join('\n')
      : [
          'VINFAST VF 5 PLUS OVERVIEW',
          '',
          'The VF 5 Plus is the most popular compact crossover for Filipino families and daily commuters:',
          '',
          'KEY SPECIFICATIONS',
          'Model: VF 5 Plus',
          'Segment: Compact Crossover',
          'Outright SRP: P1,099,000',
          'Battery Subscription SRP: P949,000',
          'Driving Range: 326 km NEDC',
          'Battery Capacity: 37.23 kWh',
          'Electric Motor: 134 hp / 135 Nm torque',
          'Seating: 5 Passengers',
          'Infotainment: 8-inch Touchscreen with 7-inch Driver Cluster',
          'Vehicle Warranty: 7 Years or 160,000 km',
          '',
          'OWNERSHIP BENEFITS',
          '- Outstanding 326 km range allows most metro commuters to charge just two to three times per month.',
          '- Instant 135 Nm torque delivers faster acceleration than traditional 1.5-liter gasoline compact cars.',
          '- Complete active and passive safety suite including 6 airbags, rear cross-traffic alert, and blind-spot detection.',
          '',
          'Would you like me to schedule a test drive for you at VinFast BGC or your nearest showroom this week?'
        ].join('\n');

    return {
      text,
      mediaUrls: [
        'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf5%20vinfast%20blue.png',
        'https://xxaahqcaesyokxaiuclv.supabase.co/storage/v1/object/public/VinFast%20Media/vf5%20brahimny%20white.png',
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
          'Pinagsasama ng VF 6 ang disenyong Italyano mula sa Torino Design at masiglang electric driving:',
          '',
          'MGA PANGUNAHING DETALYE',
          'Model: VF 6',
          'Kategorya: Subcompact Crossover',
          'VF 6 Eco SRP: P1,499,000',
          'VF 6 Plus SRP: P1,699,000',
          'Range: 399 km WLTP',
          'Kapasidad ng Baterya: 59.6 kWh',
          'Electric Motor: 174 hp / 250 Nm (Eco) o 201 hp / 310 Nm (Plus)',
          'Drivetrain: Front-Wheel Drive (FWD)',
          'Kapasidad: 5 Pasahero',
          'Infotainment: 12.9-inch HD Driver-Oriented Touchscreen',
          '',
          'MGA BENTAHE',
          '- Makinis na disenyong Europeo na may signature full-width LED light bar sa harap at likod.',
          '- Marangyang interior na may vegan leather at driver cockpit.',
          '- Level 2 Highway Assist ADAS suite para sa relax na biyahe sa expressway.',
          '',
          'Nais mo bang mag-iskedyul ng personal na pagtingin sa VF 6 sa isang awtorisadong VinFast showroom?'
        ].join('\n')
      : [
          'VINFAST VF 6 OVERVIEW',
          '',
          'The VF 6 subcompact crossover combines Italian styling by Torino Design with spirited electric driving:',
          '',
          'KEY SPECIFICATIONS',
          'Model: VF 6',
          'Segment: Subcompact Crossover',
          'VF 6 Eco SRP: P1,499,000',
          'VF 6 Plus SRP: P1,699,000',
          'Driving Range: 399 km WLTP',
          'Battery Capacity: 59.6 kWh',
          'Electric Motor: 174 hp / 250 Nm (Eco) or 201 hp / 310 Nm (Plus)',
          'Drivetrain: Front-Wheel Drive (FWD)',
          'Seating: 5 Passengers',
          'Infotainment: 12.9-inch HD Driver-Oriented Touchscreen',
          '',
          'KEY ADVANTAGES',
          '- Sculpted European styling with full-width signature LED light bar front and rear.',
          '- Luxurious vegan leather interior with panoramic driver cockpit.',
          '- Level 2 Highway Assist ADAS suite for effortless expressway cruising.',
          '',
          'Would you like to schedule a personal viewing of the VF 6 at an authorized VinFast showroom?'
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
          'Ang VF 7 ay midsize crossover na may disenyong hango sa fighter-jet at pambihirang bilis na tulad ng supercar:',
          '',
          'MGA PANGUNAHING DETALYE',
          'Model: VF 7',
          'Kategorya: Midsize Crossover',
          'VF 7 Eco SRP: P1,760,000',
          'VF 7 Plus SRP: P2,380,000',
          'Range: 450 km WLTP',
          'Kapasidad ng Baterya: 75.3 kWh',
          'Electric Motor: 201 hp / 280 Nm (Eco) o 348 hp / 500 Nm (Plus AWD)',
          'Drivetrain: Dual-Motor All-Wheel Drive (AWD sa Plus)',
          'Akselerasyon: 0-100 km/h sa loob ng 5.8 segundo (Plus)',
          'Garantiya sa Sasakyan: 10 Taon o 200,000 km',
          '',
          'MGA BENTAHE',
          '- 348 hp at 500 Nm dual-motor AWD na nagbibigay ng pambihirang lakas at bilis.',
          '- Makabagong aerodynamic silhouette na may flush door handles at panoramic glass roof.',
          '- 10 taong vehicle warranty na may 24/7 roadside assistance sa buong Pilipinas.',
          '',
          'Ipagreserba ba kita ng test drive appointment upang maranasan mo ang 348 hp VF 7 Plus nang personal?'
        ].join('\n')
      : [
          'VINFAST VF 7 OVERVIEW',
          '',
          'The VF 7 is our midsize crossover featuring fighter-jet inspired architecture and supercar-level acceleration:',
          '',
          'KEY SPECIFICATIONS',
          'Model: VF 7',
          'Segment: Midsize Crossover',
          'VF 7 Eco SRP: P1,760,000',
          'VF 7 Plus SRP: P2,380,000',
          'Driving Range: 450 km WLTP',
          'Battery Capacity: 75.3 kWh',
          'Electric Motor: 201 hp / 280 Nm (Eco) or 348 hp / 500 Nm (Plus AWD)',
          'Drivetrain: Dual-Motor All-Wheel Drive (AWD on Plus)',
          'Acceleration: 0-100 km/h in 5.8 seconds (Plus)',
          'Vehicle Warranty: 10 Years or 200,000 km',
          '',
          'KEY ADVANTAGES',
          '- 348 hp and 500 Nm dual-motor AWD delivers exhilarating supercar-grade acceleration.',
          '- Striking aerodynamic silhouette with flush door handles and panoramic glass roof.',
          '- Comprehensive 10-year warranty with 24/7 roadside assistance across the Philippines.',
          '',
          'Shall I reserve a test drive appointment for you to experience the 348 hp VF 7 Plus firsthand?'
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
          'Tinatayang SRP: P4,990,000 hanggang P5,390,000',
          'Range: Mahigit 600+ km WLTP',
          'Kapasidad ng Baterya: 123 kWh',
          'Electric Motor: 402 hp / 620 Nm torque',
          'Drivetrain: Dual-Motor All-Wheel Drive (AWD)',
          'Kapasidad: 6 o 7 Pasahero (may Captain Chairs)',
          'Infotainment: 15.6-inch Front Display at Rear Passenger Screen',
          'Garantiya sa Sasakyan: 10 Taon o 200,000 km',
          '',
          'MGA BENTAHE',
          '- Malaking 123 kWh baterya na nagbibigay ng higit 600 km na driving range sa isang charge lamang.',
          '- Executive captain chairs sa pangalawang hanay na may heating, ventilation, at massage functions.',
          '- Tri-zone climate control na may hospital-grade HEPA air filtration at panoramic glass roof.',
          '',
          'Nais mo bang ayusin ko ang isang pribadong VIP consultation at test drive para sa VF 9 kasama ang aming Senior Sales Executive?'
        ].join('\n')
      : [
          'VINFAST VF 9 OVERVIEW',
          '',
          'The VF 9 is our flagship full-size luxury 3-row electric SUV for discerning VIPs and families:',
          '',
          'KEY SPECIFICATIONS',
          'Model: VF 9',
          'Segment: Flagship Luxury SUV',
          'Indicative SRP: P4,990,000 to P5,390,000',
          'Driving Range: Up to 600+ km WLTP',
          'Battery Capacity: 123 kWh',
          'Electric Motor: 402 hp / 620 Nm torque',
          'Drivetrain: Dual-Motor All-Wheel Drive (AWD)',
          'Seating: 6 or 7 Passengers (with Captain Chairs)',
          'Infotainment: 15.6-inch Front Display and Dedicated Rear Passenger Screen',
          'Vehicle Warranty: 10 Years or 200,000 km',
          '',
          'KEY ADVANTAGES',
          '- Massive 123 kWh battery delivers over 600 km of driving range on a single charge.',
          '- Executive second-row captain chairs with heating, ventilation, and massage functions.',
          '- Tri-zone climate control with medical-grade HEPA filtration and panoramic glass roof.',
          '',
          'Shall I arrange a private VIP consultation and test drive for the VF 9 with our Senior Sales Executive?'
        ].join('\n');

    return {
      text,
      mediaUrls: [],
      quickActions: [
        { label: isTagalog ? 'Kwentahin ang Buwanang Hulog ng VF 9' : 'Calculate VF 9 Monthly', action: 'calculate_model', payload: 'vf-9' },
        { label: isTagalog ? 'Mag-book ng VF 9 Test Drive' : 'Book VF 9 Test Drive', action: 'book_test_drive', payload: 'vf-9' },
      ]
    };
  }

  // Range and charging anxiety inquiries: charging, station, range, battery life, km, travel
  if (q.includes('charge') || q.includes('charging') || q.includes('range') || q.includes('how far') || q.includes('km') || q.includes('battery life') || q.includes('karga')) {
    const text = isTagalog
      ? [
          'KAPANATAGAN SA PAG-CHARGE AT REAL-WORLD RANGE',
          '',
          'Ang pag-charge ng VinFast EV sa Pilipinas ay napakasimple, matipid, at maginhawa:',
          '',
          'PAG-CHARGE SA BAHAY',
          '- 7 kW Home Wallbox: Isinasaksak sa kuryente sa bahay at pinupuno ang sasakyan habang ikaw ay natutulog sa gabi.',
          '- Standard 220V Portable Charger: Kasama sa bawat sasakyan, kaya puwedeng magsaksak sa anumang grounded 220V outlet sa Pilipinas.',
          '',
          'PUBLIC FAST CHARGING',
          '- DC Fast Charging: Mula 10% hanggang 70% sa loob lamang ng 30 hanggang 36 na minuto.',
          '- Pambansang Charging Network: Matatagpuan sa mga awtorisadong VinFast dealership, mga pangunahing mall, at mga gasolinahan sa expressway.',
          '',
          'TUNAY NA DATOS SA PANG-ARAW-ARAW NA BIYAHE',
          '- Sa 326 km range ng VF 5 Plus at 45 km karaniwang biyahe kada araw, kailangan mo lamang mag-charge minsan kada 6 na araw.',
          '- Ito ay 4 hanggang 5 beses lamang kada buwan, na nag-aalis sa pagpila sa mga gasolinahan.',
          '',
          'Nais mo bang kwentahin natin ang iyong eksaktong dalas ng pag-charge at matitipid sa krudo gamit ang aming kalkulador?'
        ].join('\n')
      : [
          'CHARGING AND REAL-WORLD RANGE CONFIDENCE',
          '',
          'Charging a VinFast EV in the Philippines is simple, cost-effective, and convenient:',
          '',
          'HOME CHARGING',
          '- 7 kW Home Wallbox: Plugs into your home power supply and recharges your vehicle overnight while you sleep.',
          '- Standard 220V Portable Charger: Included with your vehicle, allowing you to charge from any grounded Philippine outlet.',
          '',
          'PUBLIC FAST CHARGING',
          '- DC Fast Charging: VinFast fast chargers charge the battery from 10% to 70% in only 30 to 36 minutes.',
          '- Nationwide Charging Network: Conveniently located at authorized VinFast dealerships, major shopping malls, and expressway tollway hubs.',
          '',
          'REAL-WORLD COMMUTE CALCULATIONS',
          '- With a 326 km range on the VF 5 Plus and a typical 45 km daily commute, you only need to charge once every 6 days.',
          '- That is only 4 to 5 charging sessions per month, saving you hours otherwise spent in gas station queues.',
          '',
          'Would you like me to estimate your exact monthly charging frequency and fuel savings using our calculator?'
        ].join('\n');

    return {
      text,
      mediaUrls: [],
      quickActions: [
        { label: isTagalog ? 'Buksan ang Range Estimator' : 'Open Range Estimator', action: 'calculate_model', payload: 'vf-5-plus' },
        { label: isTagalog ? 'Mag-book ng Test Drive' : 'Book a Test Drive', action: 'book_test_drive', payload: 'vf-5-plus' },
      ]
    };
  }

  // Price, financing, discount, promo, down payment inquiries
  if (q.includes('price') || q.includes('presyo') || q.includes('magkano') || q.includes('srp') || q.includes('cost') || q.includes('financing') || q.includes('monthly') || q.includes('promo') || q.includes('discount') || q.includes('down payment') || q.includes('hulog')) {
    const text = isTagalog
      ? [
          'OPISYAL NA PRESYO AT FINANCING NG VINFAST PHILIPPINES',
          '',
          'Narito ang opisyal na SRP at financing terms para sa ating kasalukuyang lineup:',
          '',
          'LISTAHAN NG PRESYO',
          '- VF 3: P745,000 (Diretso) o P590,000 (Battery Subscription)',
          '- VF 5 Plus: P1,099,000 (Diretso) o P949,000 (Battery Subscription)',
          '- VF 6 Eco: P1,499,000 | VF 6 Plus: P1,699,000',
          '- VF 7 Eco: P1,760,000 | VF 7 Plus AWD: P2,380,000',
          '- VF 9: P4,990,000 hanggang P5,390,000',
          '',
          'MGA OPSYON SA FINANCING',
          '- Paunang Bayad (Down Payment): Mula 10% hanggang 50%',
          '- Tagal ng Loan: 12, 24, 36, 48, o 60 buwan',
          '- Interes: May paborableng 8.0% taunang interes kasama ang aming partner banks (BDO, BPI, Metrobank, Security Bank)',
          '',
          'Ipaghahanda ba kita ng custom bank quotation batay sa 20% down payment?'
        ].join('\n')
      : [
          'OFFICIAL VINFAST PHILIPPINES PRICING AND PROMOTIONS',
          '',
          'Here are the official SRP and financing parameters across our current lineup:',
          '',
          'PRICE LIST',
          '- VF 3: P745,000 (Outright) or P590,000 (Battery Subscription)',
          '- VF 5 Plus: P1,099,000 (Outright) or P949,000 (Battery Subscription)',
          '- VF 6 Eco: P1,499,000 | VF 6 Plus: P1,699,000',
          '- VF 7 Eco: P1,760,000 | VF 7 Plus AWD: P2,380,000',
          '- VF 9: P4,990,000 to P5,390,000',
          '',
          'FINANCING OPTIONS',
          '- Down Payment: Flexible terms from 10% to 50%',
          '- Loan Tenure: 12, 24, 36, 48, or 60 months',
          '- Indicative Interest Rate: Competitive 8.0% annual interest with our partner banks (BDO, BPI, Metrobank, Security Bank)',
          '',
          'Shall I prepare a custom bank financing quotation for you based on a 20% down payment?'
        ].join('\n');

    return {
      text,
      mediaUrls: [],
      quickActions: [
        { label: isTagalog ? 'Gamitin ang Calculator' : 'Use Financial Calculator', action: 'calculate_model', payload: 'vf-5-plus' },
        { label: isTagalog ? 'Mag-book ng Test Drive' : 'Book a Test Drive', action: 'book_test_drive', payload: 'vf-5-plus' },
      ]
    };
  }

  // Tagalog / Taglish greeting or general greeting
  if (q.includes('kamusta') || q.includes('kumusta') || q.includes('hello') || q.includes('hi') || q.includes('gandang') || q.includes('magandang')) {
    const text = isTagalog
      ? [
          'MALIGAYANG PAGDATING SA VINFAST PHILIPPINES',
          '',
          'Ako ang iyong opisyal na VinFast Sales Specialist. Narito ako upang tulungan kang pumili ng tamang VinFast EV, mag-compute ng iyong monthly amortization, at mag-schedule ng test drive sa pinakamalapit na dealership sa inyong lugar.',
          '',
          'MGA PANGUNAHING MODELO',
          '- VF 3: P590,000 (Battery Subscription) | P745,000 (Diretso) - 210 km range',
          '- VF 5 Plus: P949,000 (Battery Subscription) | P1,099,000 (Diretso) - 326 km range',
          '- VF 6: P1,499,000 hanggang P1,699,000 - 399 km range',
          '- VF 7: P1,760,000 hanggang P2,380,000 - 450 km range',
          '- VF 9: P4,990,000 hanggang P5,390,000 - 600+ km range',
          '',
          'Aling VinFast model ang nais mong suriin o i-test drive ngayong linggo?'
        ].join('\n')
      : [
          'WELCOME TO VINFAST PHILIPPINES',
          '',
          'Hello, I am your VinFast Senior Sales Specialist and EV Consultant. I can assist you with official Philippine pricing, battery subscription plans, real-world range calculations, and connect you with any of our 29 authorized showrooms across Luzon, Visayas, and Mindanao.',
          '',
          'POPULAR CHOICES',
          '- VF 3: P590,000 (Battery Subscription) | P745,000 (Outright) - 210 km range',
          '- VF 5 Plus: P949,000 (Battery Subscription) | P1,099,000 (Outright) - 326 km range',
          '- VF 6: P1,499,000 to P1,699,000 - 399 km range',
          '- VF 7: P1,760,000 to P2,380,000 - 450 km range',
          '- VF 9: P4,990,000 to P5,390,000 - 600+ km range',
          '',
          'Which VinFast model would you like to explore or test drive today?'
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

  // Non-automotive queries: steer back politely to automotive options
  const isNonAutomotive = q.includes('recipe') || q.includes('luto') || q.includes('ulam') || q.includes('weather') || q.includes('panahon') || q.includes('crypto') || q.includes('movie') || q.includes('pelikula') || q.includes('song') || q.includes('kanta') || q.includes('joke');
  if (isNonAutomotive) {
    const text = isTagalog
      ? [
          'SERBISYONG PANG-BENTA NG VINFAST',
          '',
          'Bagamat ako ay nakalaan para sa mga sasakyan at serbisyo ng VinFast, labis kong ikagagalak na tulungan kang mahanap ang tamang electric vehicle para sa iyong pamumuhay at biyahe sa Pilipinas.',
          '',
          'Mayroon kaming mga modelo mula sa urban VF 3 simula P590,000 hanggang sa marangyang 7-seater VF 9 flagship SUV.',
          '',
          'Aling VinFast model ang nais mong suriin para sa iyong pang-araw-araw na biyahe?'
        ].join('\n')
      : [
          'VINFAST SALES ASSISTANCE',
          '',
          'While I specialize exclusively in VinFast automotive solutions, I would love to help you find the perfect electric vehicle for your daily lifestyle and commute in the Philippines.',
          '',
          'We offer an exciting lineup ranging from the urban VF 3 starting at P590,000 up to the luxurious 7-seater VF 9 flagship SUV.',
          '',
          'Which VinFast model would you like to explore for your daily driving needs?'
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

  // Default professional sales response
  const text = isTagalog
    ? [
        'VINFAST ELECTRIC VEHICLES PILIPINAS',
        '',
        'Ang VinFast ang nangunguna sa electric mobility revolution sa Pilipinas na may makabagong disenyo, zero gastusin sa gasolina, at pinakamatibay na warranty.',
        '',
        'ANG ATING OPISYAL NA LINEUP',
        '- VF 3: Mini Electric SUV simula P590,000 (Battery Subscription)',
        '- VF 5 Plus: Compact Family Crossover simula P949,000 (Battery Subscription)',
        '- VF 6: Subcompact Italian-Styled Crossover simula P1,499,000',
        '- VF 7: Aero-Dynamic Midsize Performance Crossover simula P1,760,000',
        '- VF 9: Presidential 7-Seater Luxury Flagship simula P4,990,000',
        '',
        'Nais mo bang ipag-schedule kita ng test drive sa pinakamalapit na VinFast dealership ngayong linggo?'
      ].join('\n')
    : [
        'VINFAST ELECTRIC VEHICLES PHILIPPINES',
        '',
        'VinFast is leading the Philippine electric mobility revolution with cutting-edge design, zero fuel costs, and unbeatable warranty coverage.',
        '',
        'OUR CURRENT LINEUP',
        '- VF 3: Mini Electric SUV starting at P590,000 (Battery Subscription)',
        '- VF 5 Plus: Compact Family Crossover starting at P949,000 (Battery Subscription)',
        '- VF 6: Subcompact Italian-Styled Crossover starting at P1,499,000',
        '- VF 7: Aero-Dynamic Midsize Performance Crossover starting at P1,760,000',
        '- VF 9: Presidential 7-Seater Luxury Flagship starting at P4,990,000',
        '',
        'Would you like me to schedule a test drive for you at your nearest VinFast dealership this week?'
      ].join('\n');

  return {
    text,
    mediaUrls: [],
    quickActions: [
      { label: isTagalog ? 'Mag-book ng Test Drive' : 'Book a Test Drive', action: 'book_test_drive', payload: 'vf-5-plus' },
      { label: isTagalog ? 'Kwentahin ang Buwanang Hulog' : 'Calculate Monthly Amortization', action: 'calculate_model', payload: 'vf-5-plus' },
      { label: isTagalog ? 'Hanapin ang Pinakamalapit na Dealer' : 'Find Nearest Dealer', action: 'view_dealer' },
    ]
  };
}
