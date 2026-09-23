export interface TranslationSchema {
  nav: {
    calculator: string;
    dealers: string;
    aiSpecialist: string;
    admin: string;
    bookTestDrive: string;
    philippines: string;
    tagline: string;
  };
  hero: {
    pill: string;
    headlinePart1: string;
    headlinePart2: string;
    subheadline: string;
    startEstimating: string;
    bookTestDrive: string;
    quickSelect: string;
    entrySrp: string;
    entrySrpSub: string;
    network: string;
    networkSub: string;
    warranty: string;
    warrantySub: string;
    loanRate: string;
    loanRateSub: string;
  };
  estimator: {
    badge: string;
    titlePart1: string;
    titlePart2: string;
    subtitle: string;
    from: string;
    standardSrp: string;
    fullRange: string;
    performance: string;
    ownershipPlan: string;
    outright: string;
    subscription: string;
    exteriorFinish: string;
    standard: string;
    battery: string;
    topRange: string;
    groundClearance: string;
    screen: string;
    slidersTitle: string;
    downPayment: string;
    recommended: string;
    loanTenure: string;
    years: string;
    indicativeRate: string;
    dailyCommute: string;
    perMonth: string;
    metroPresets: string;
    amortizationTitle: string;
    perMonthFor: string;
    months: string;
    netLoanAmount: string;
    fixedRate: string;
    totalLoanPayments: string;
    lockEstimateCta: string;
    askAiCta: string;
    commuteStatsTitle: string;
    bufferNote: string;
    daysBetweenCharges: string;
    every: string;
    day: string;
    days: string;
    atCommute: string;
    chargesPerMonth: string;
    times: string;
    plugInNote: string;
    homeChargingTitle: string;
    homeChargingDesc: string;
    savingsTitle: string;
    savingsBadge: string;
    gasolineCar: string;
    vinfastEV: string;
    annualSavings: string;
    perYear: string;
  };
  aiChat: {
    agentTitle: string;
    agentBadge: string;
    agentSubtitle: string;
    connectedDealers: string;
    suggestedLabel: string;
    welcomeHeader: string;
    welcomeBody: string;
    welcomeQuestion: string;
    chips: string[];
    officialMedia: string;
    clickToEnlarge: string;
    closePhoto: string;
    openOriginal: string;
    typingIndicator: string;
    inputPlaceholder: string;
    disclaimer: string;
    pressEnter: string;
  };
  dealers: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allRegions: string;
    northLuzon: string;
    southLuzon: string;
    noDealersFound: string;
    noDealersSub: string;
    areasServed: string;
    bookHere: string;
  };
  testDriveModal: {
    titleNew: string;
    titleConfirmed: string;
    subtitleNew: string;
    subtitleConfirmed: string;
    refCodeLabel: string;
    reservedModel: string;
    dealership: string;
    dateTime: string;
    guest: string;
    vipNotice: string;
    doneButton: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    mobile: string;
    preferredModel: string;
    preferredDealer: string;
    preferredDate: string;
    preferredTime: string;
    notes: string;
    notesPlaceholder: string;
    confirmButton: string;
  };
  adminModal: {
    title: string;
    badge: string;
    subtitle: string;
    totalReservations: string;
    topModel: string;
    activeDealers: string;
    conversionRate: string;
    filterLabel: string;
    exportCsv: string;
    reset: string;
    noReservations: string;
    statusNew: string;
    statusContacted: string;
    statusConfirmed: string;
    statusCompleted: string;
    statusCancelled: string;
  };
  footer: {
    networkBadge: string;
    mission: string;
    hotline247: string;
    roadsideAssist: string;
    lineupTitle: string;
    hubsTitle: string;
    legalNotice: string;
    copyright: string;
    companionTag: string;
  };
}

export const TRANSLATIONS: Record<'EN' | 'PH', TranslationSchema> = {
  EN: {
    nav: {
      calculator: 'Range Calculator',
      dealers: 'Dealers (29)',
      aiSpecialist: 'AI Specialist',
      admin: 'Admin',
      bookTestDrive: 'Book Test Drive',
      philippines: 'Philippines',
      tagline: 'Official Digital Customer Experience & Estimator',
    },
    hero: {
      pill: 'Official 2026 Philippine Lineup & Nationwide Financing',
      headlinePart1: 'Drive electric now.',
      headlinePart2: 'Know your monthly today.',
      subheadline: 'Configure any VinFast model, see your peso amortization and real-world charging needs instantly, then lock in a test drive — all in one page.',
      startEstimating: 'Start estimating',
      bookTestDrive: 'Book a Test Drive',
      quickSelect: 'Quick Select:',
      entrySrp: 'Entry SRP',
      entrySrpSub: 'With Battery Subscription (VF 3)',
      network: 'Network',
      networkSub: 'Luzon, Visayas & Mindanao',
      warranty: 'Warranty',
      warrantySub: '200k km + 24/7 roadside assist',
      loanRate: 'Loan Rate',
      loanRateSub: 'Indicative partner bank rate',
    },
    estimator: {
      badge: 'Interactive Financial & Range Estimator',
      titlePart1: 'Customize Your VinFast.',
      titlePart2: 'Calculate in Real-Time.',
      subtitle: 'Select any VinFast electric model, adjust your financing terms, and evaluate how battery range matches your daily driving pattern across the Philippines.',
      from: 'from',
      standardSrp: 'Standard SRP',
      fullRange: 'Full Range',
      performance: 'Performance',
      ownershipPlan: 'Ownership Plan:',
      outright: 'Outright Purchase',
      subscription: 'Battery Subscription',
      exteriorFinish: 'Exterior Finish',
      standard: 'Standard',
      battery: 'Battery',
      topRange: 'Top Range',
      groundClearance: 'Ground Clearance',
      screen: 'Screen',
      slidersTitle: 'Financing & Travel Sliders',
      downPayment: 'Down Payment',
      recommended: 'Recommended',
      loanTenure: 'Loan Tenure',
      years: 'Years',
      indicativeRate: '@ 8.0% p.a. Indicative',
      dailyCommute: 'Daily Commute Travel',
      perMonth: '/ month',
      metroPresets: 'Metro Presets:',
      amortizationTitle: 'Estimated Monthly Amortization',
      perMonthFor: 'Per month for',
      months: 'months',
      netLoanAmount: 'Net Loan Amount:',
      fixedRate: 'fixed',
      totalLoanPayments: 'Total Loan Payments:',
      lockEstimateCta: 'Lock in this Estimate & Book Test Drive',
      askAiCta: 'Ask AI Assistant About This Quote',
      commuteStatsTitle: 'Real-World Commute & Charging Stats',
      bufferNote: '85% real-world buffer',
      daysBetweenCharges: 'Days Between Charges',
      every: 'Every',
      day: 'day',
      days: 'days',
      atCommute: 'At',
      chargesPerMonth: 'Charges per Month',
      times: 'times',
      plugInNote: 'Plug in once a week or less',
      homeChargingTitle: 'Convenient Home Charging:',
      homeChargingDesc: 'With an overnight 7 kW AC wallbox or standard portable 220V plug, your vehicle recharges fully while you sleep at roughly ₱1.85 per kilometer.',
      savingsTitle: 'Gasoline vs Electric Peso Savings',
      savingsBadge: 'Save ~74% on fuel',
      gasolineCar: 'Gasoline Car (10 km/L @ ₱70/L):',
      vinfastEV: 'VinFast Electric:',
      annualSavings: 'Annual Pocket Savings:',
      perYear: '/ yr',
    },
    aiChat: {
      agentTitle: 'VinFast AI Sales Specialist',
      agentBadge: 'Online · Replies Instantly',
      agentSubtitle: 'Senior Sales Consultant · Official Philippine EV Network',
      connectedDealers: '29 Official Dealers Connected',
      suggestedLabel: 'Suggested:',
      welcomeHeader: 'WELCOME TO VINFAST PHILIPPINES',
      welcomeBody: 'Hello, I am your VinFast Senior Sales Specialist and EV Consultant. I can assist you with official Philippine pricing, battery subscription plans, real-world range calculations, and connect you with any of our 29 authorized showrooms across Luzon, Visayas, and Mindanao.',
      welcomeQuestion: 'Which VinFast model would you like to explore or test drive today?',
      chips: [
        'Compare VF 5 vs Gas Car',
        'Show VF 3 Colors & Photos',
        'Show VF 6 Photos',
        'Show VF 7 Photos',
        'Dealers in Metro Manila',
        'Battery Subscription Explained',
        'Dealers in Cebu & Visayas',
        'VF 7 Supercar Acceleration',
      ],
      officialMedia: 'Official Media Showcase',
      clickToEnlarge: 'Click photo to enlarge',
      closePhoto: 'Close photo (Esc)',
      openOriginal: 'Open original image',
      typingIndicator: 'VinFast Sales Specialist is formulating quotation & specs...',
      inputPlaceholder: 'Ask about VF 5 vs gas cars, VF 3 colors, monthly amortization, or nearest dealer...',
      disclaimer: 'Backed by Official VinFast Philippines Intelligence & 29 Dealers',
      pressEnter: 'Press Enter to send',
    },
    dealers: {
      badge: 'Nationwide Dealership Network',
      title: '29 Official VinFast Showrooms',
      subtitle: 'Equipped with authorized service bays, DC fast-chargers, and official test drive fleets across Metro Manila, Luzon, Visayas, and Mindanao.',
      searchPlaceholder: 'Search city, province, or area...',
      allRegions: 'All',
      northLuzon: 'North Luzon',
      southLuzon: 'South Luzon & Cavite',
      noDealersFound: 'No dealerships found for',
      noDealersSub: 'Try searching for Metro Manila, Cebu, Davao, or nearby areas.',
      areasServed: 'Areas Served:',
      bookHere: 'Book Here',
    },
    testDriveModal: {
      titleNew: 'Book a VinFast Test Drive',
      titleConfirmed: 'Test Drive Confirmed',
      subtitleNew: 'Experience pure electric performance firsthand',
      subtitleConfirmed: 'Your reservation is secured with our official dealership',
      refCodeLabel: 'Reservation Reference Code',
      reservedModel: 'Reserved Model:',
      dealership: 'Dealership:',
      dateTime: 'Date & Time:',
      guest: 'Guest:',
      vipNotice: 'Our VinFast Product Specialist will contact you within 2 hours to confirm your vehicle prep and coordinate VIP parking at the showroom.',
      doneButton: 'Done',
      fullName: 'Full Name',
      fullNamePlaceholder: 'e.g. Juan dela Cruz',
      email: 'Email Address',
      mobile: 'Mobile Number',
      preferredModel: 'Preferred Model',
      preferredDealer: 'Preferred Dealership (29 Official Locations)',
      preferredDate: 'Preferred Date',
      preferredTime: 'Preferred Time Slot',
      notes: 'Special Inquiries / Financing Questions (Optional)',
      notesPlaceholder: 'e.g. Would like to test highway merge and discuss BDO auto-loan financing',
      confirmButton: 'Confirm Test Drive Reservation',
    },
    adminModal: {
      title: 'VinFast Lead & Reservation Manager',
      badge: 'Dealer Portal',
      subtitle: 'Track and manage incoming test drive appointments across 29 Philippine locations',
      totalReservations: 'Total Reservations',
      topModel: 'Top Requested Model',
      activeDealers: 'Active Dealerships',
      conversionRate: 'Lead Conversion',
      filterLabel: 'Filter Status:',
      exportCsv: 'Export CSV',
      reset: 'Reset',
      noReservations: 'No reservations matching status',
      statusNew: 'New Lead',
      statusContacted: 'Contacted',
      statusConfirmed: 'Confirmed',
      statusCompleted: 'Completed',
      statusCancelled: 'Cancelled',
    },
    footer: {
      networkBadge: 'Official EV Network',
      mission: 'Pioneering sustainable electric mobility across the Philippines. With zero fuel costs, innovative battery subscription plans, up to 10-year warranty, and 29 authorized dealership and service hubs.',
      hotline247: '24/7 Hotline: 0917 513 5782',
      roadsideAssist: 'Roadside Assistance',
      lineupTitle: 'Vehicle Lineup',
      hubsTitle: 'Showroom Hubs (29)',
      legalNotice: 'Legal Disclaimer: Estimates are indicative only and assume 8.0% annual interest. Final pricing, promos, chattel mortgage fees, comprehensive insurance, and financing terms are confirmed by authorized VinFast dealers and partner financing institutions. Vehicle specifications and availability subject to change without prior notice.',
      copyright: 'VinFast Philippines. All rights reserved.',
      companionTag: 'VinFast EV Companion — Digital Automotive Customer Experience',
    },
  },
  PH: {
    nav: {
      calculator: 'Kalkulador ng Range',
      dealers: 'Mga Dealership (29)',
      aiSpecialist: 'AI Sales Specialist',
      admin: 'Admin Portal',
      bookTestDrive: 'Mag-book ng Test Drive',
      philippines: 'Pilipinas',
      tagline: 'Opisyal na Digital Customer Experience at Estimator',
    },
    hero: {
      pill: 'Opisyal na 2026 Philippine Lineup at Nationwide Financing',
      headlinePart1: 'Mag-electric na ngayon.',
      headlinePart2: 'Alamin ang iyong hulog kada buwan.',
      subheadline: 'I-configure ang anumang VinFast model, alamin ang iyong hulog kada buwan at charging requirements, at magpa-reserve ng test drive — lahat sa isang pahina.',
      startEstimating: 'Simulan ang pag-compute',
      bookTestDrive: 'Mag-book ng Test Drive',
      quickSelect: 'Mabilisang Pagpili:',
      entrySrp: 'Panimulang Presyo',
      entrySrpSub: 'May Battery Subscription (VF 3)',
      network: 'Network',
      networkSub: 'Luzon, Visayas at Mindanao',
      warranty: 'Garantiya',
      warrantySub: '200k km + 24/7 roadside assistance',
      loanRate: 'Interes sa Loan',
      loanRateSub: '8.0% taunang interes mula sa partner banks',
    },
    estimator: {
      badge: 'Interaktibong Kalkulador ng Amortization at Range',
      titlePart1: 'I-customize ang Iyong VinFast.',
      titlePart2: 'Kwentahin sa Real-Time.',
      subtitle: 'Pumili ng anumang VinFast electric model, i-adjust ang financing terms, at tingnan kung paano aangkop ang battery range sa iyong pang-araw-araw na biyahe sa Pilipinas.',
      from: 'mula',
      standardSrp: 'Karaniwang SRP',
      fullRange: 'Kabuuang Range',
      performance: 'Lakas ng Makina',
      ownershipPlan: 'Plano ng Pagmamay-ari:',
      outright: 'Direktang Pagbili',
      subscription: 'Battery Subscription',
      exteriorFinish: 'Kulay ng Exterior',
      standard: 'Karaniwan',
      battery: 'Baterya',
      topRange: 'Tugmang Range',
      groundClearance: 'Ground Clearance',
      screen: 'Screen',
      slidersTitle: 'Mga Slider para sa Financing at Biyahe',
      downPayment: 'Paunang Bayad (Down Payment)',
      recommended: 'Inirerekomenda',
      loanTenure: 'Tagal ng Loan (Tenure)',
      years: 'Taon',
      indicativeRate: '@ 8.0% taunang interes',
      dailyCommute: 'Pang-araw-araw na Biyahe (Daily Commute)',
      perMonth: '/ buwan',
      metroPresets: 'Mga Karaniwang Ruta:',
      amortizationTitle: 'Tinatayang Buwanang Hulog (Amortization)',
      perMonthFor: 'Kada buwan sa loob ng',
      months: 'buwan',
      netLoanAmount: 'Kabuuang Halaga ng Loan:',
      fixedRate: 'fixed',
      totalLoanPayments: 'Kabuuang Mababayaran sa Loan:',
      lockEstimateCta: 'I-lock ang Estimate na Ito at Mag-book ng Test Drive',
      askAiCta: 'Tanungin ang AI Assistant Tungkol sa Quotation na Ito',
      commuteStatsTitle: 'Tunay na Datos ng Biyahe at Pag-charge',
      bufferNote: '85% real-world buffer',
      daysBetweenCharges: 'Araw Bago Mag-charge Muli',
      every: 'Kada',
      day: 'araw',
      days: 'araw',
      atCommute: 'Sa',
      chargesPerMonth: 'Dalas ng Pag-charge Kada Buwan',
      times: 'beses',
      plugInNote: 'Magsaksak isang beses sa isang linggo o mas madalang pa',
      homeChargingTitle: 'Kombinyenteng Pag-charge sa Bahay:',
      homeChargingDesc: 'Gamit ang 7 kW AC wallbox sa bahay o ang standard 220V portable charger, puno na muli ang iyong baterya habang natutulog ka sa halagang humigit-kumulang ₱1.85 kada kilometro.',
      savingsTitle: 'Matitipid sa Krudo/Gasolina vs Kuryente',
      savingsBadge: 'Makatipid ng ~74% sa krudo',
      gasolineCar: 'Kotse na De-Gasolina (10 km/L @ ₱70/L):',
      vinfastEV: 'VinFast Electric:',
      annualSavings: 'Matitipid sa Bulsa Kada Taon:',
      perYear: '/ taon',
    },
    aiChat: {
      agentTitle: 'VinFast AI Sales Specialist',
      agentBadge: 'Online · Sumasagot Agad',
      agentSubtitle: 'Senior Sales Consultant · Opisyal na Philippine EV Network',
      connectedDealers: '29 Opisyal na Dealerships ang Nakakonekta',
      suggestedLabel: 'Mungkahi:',
      welcomeHeader: 'MALIGAYANG PAGDATING SA VINFAST PHILIPPINES',
      welcomeBody: 'Kamusta! Ako ang iyong opisyal na VinFast Senior Sales Specialist at EV Consultant sa Pilipinas. Nandito ako para tulungan ka sa opisyal na presyo, Battery Subscription program, pagkukwenta ng buwanang hulog, at pagkonekta sa pinakamalapit sa 29 authorized showrooms sa Luzon, Visayas, at Mindanao.',
      welcomeQuestion: 'Aling VinFast model ang nais mong suriin o i-test drive ngayong araw?',
      chips: [
        'Ihambing ang VF 5 sa Kotse na De-gasolina',
        'Ipakita ang Kulay at Litrato ng VF 3',
        'Ipakita ang mga Litrato ng VF 6',
        'Ipakita ang mga Litrato ng VF 7',
        'Mga Dealer sa Metro Manila',
        'Paliwanag sa Battery Subscription',
        'Mga Dealer sa Cebu at Visayas',
        '348 hp Acceleration ng VF 7',
      ],
      officialMedia: 'Opisyal na Media Gallery',
      clickToEnlarge: 'I-click ang litrato para palakihin',
      closePhoto: 'Isara ang litrato (Esc)',
      openOriginal: 'Buksan ang orihinal',
      typingIndicator: 'Ang VinFast Sales Specialist ay bumubuo ng quotation at datos...',
      inputPlaceholder: 'Magtanong tungkol sa VF 5 vs gas car, kulay ng VF 3, monthly amortization, o pinakamalapit na dealer...',
      disclaimer: 'Suportado ng Opisyal na VinFast Philippines Intelligence at 29 Dealers',
      pressEnter: 'Pindutin ang Enter para ipadala',
    },
    dealers: {
      badge: 'Pambansang Network ng mga Showroom',
      title: '29 Opisyal na VinFast Showroom',
      subtitle: 'May kumpletong service bays, DC fast-chargers, at official test drive fleet sa buong Metro Manila, Luzon, Visayas, at Mindanao.',
      searchPlaceholder: 'Maghanap ng lungsod, probinsya, o lugar...',
      allRegions: 'Lahat',
      northLuzon: 'Hilagang Luzon',
      southLuzon: 'Timog Luzon at Cavite',
      noDealersFound: 'Walang dealership na nahanap para sa',
      noDealersSub: 'Subukang maghanap ng Metro Manila, Cebu, Davao, o kalapit na lugar.',
      areasServed: 'Mga Lugar na Sineserbisyohan:',
      bookHere: 'Mag-book Dito',
    },
    testDriveModal: {
      titleNew: 'Mag-book ng VinFast Test Drive',
      titleConfirmed: 'Kumpirmado na ang Iyong Test Drive',
      subtitleNew: 'Damhin ang tunay na lakas ng 100% electric driving',
      subtitleConfirmed: 'Nakatala na ang iyong reserbasyon sa aming opisyal na dealership',
      refCodeLabel: 'Reference Code ng Reserbasyon',
      reservedModel: 'Napiling Model:',
      dealership: 'Dealership:',
      dateTime: 'Petsa at Oras:',
      guest: 'Pangalan ng Kostumer:',
      vipNotice: 'Makikipag-ugnayan sa iyo ang aming VinFast Product Specialist sa loob ng 2 oras upang kumpirmahin ang paghahanda ng sasakyan at VIP parking sa showroom.',
      doneButton: 'Tapos Na',
      fullName: 'Buong Pangalan',
      fullNamePlaceholder: 'hal. Juan dela Cruz',
      email: 'Email Address',
      mobile: 'Numero ng Telepono / Mobile',
      preferredModel: 'Napiling Model',
      preferredDealer: 'Napiling Dealership (29 Opisyal na Lokasyon)',
      preferredDate: 'Napiling Petsa',
      preferredTime: 'Napiling Oras',
      notes: 'Mga Karagdagang Tanong / Detalye sa Financing (Opsyonal)',
      notesPlaceholder: 'hal. Nais kong maranasan ang bilis sa highway at magtanong ukol sa BDO auto-loan financing',
      confirmButton: 'Kumpirmahin ang Test Drive Reservation',
    },
    adminModal: {
      title: 'VinFast Lead at Reservation Manager',
      badge: 'Dealer Portal',
      subtitle: 'Subaybayan at pamahalaan ang mga dumarating na test drive appointments sa 29 na lokasyon sa Pilipinas',
      totalReservations: 'Kabuuang Reserbasyon',
      topModel: 'Pinakasikat na Model',
      activeDealers: 'Mga Aktibong Dealership',
      conversionRate: 'Target Conversion Rate',
      filterLabel: 'Salain Ayon sa Katayuan:',
      exportCsv: 'I-export sa CSV',
      reset: 'I-reset',
      noReservations: 'Walang reserbasyon na tumutugma sa katayuang',
      statusNew: 'Bagong Lead',
      statusContacted: 'Natawagan Na',
      statusConfirmed: 'Kumpirmado',
      statusCompleted: 'Natapos Na',
      statusCancelled: 'Kinansela',
    },
    footer: {
      networkBadge: 'Opisyal na EV Network',
      mission: 'Nangunguna sa sustainable electric mobility sa buong Pilipinas. May zero gas expenses, makabagong battery subscription plan, hanggang 10 taong warranty, at 29 na awtorisadong dealership at service hub.',
      hotline247: '24/7 Hotline: 0917 513 5782',
      roadsideAssist: 'Roadside Assistance',
      lineupTitle: 'Mga Modelo ng Sasakyan',
      hubsTitle: 'Mga Hub ng Showroom (29)',
      legalNotice: 'Paunawa sa Batas: Ang mga kalkulasyon ay pagtataya lamang batay sa 8.0% taunang interes. Ang pinal na presyo, promo, chattel mortgage fees, komprehensibong insurance, at financing terms ay kukumpirmahin ng mga awtorisadong dealer at partner banks ng VinFast. Ang mga detalye at availability ng sasakyan ay maaaring magbago nang walang paunang abiso.',
      copyright: 'VinFast Philippines. Lahat ng karapatan ay nakalaan.',
      companionTag: 'VinFast EV Companion — Digital Automotive Customer Experience',
    },
  },
};
