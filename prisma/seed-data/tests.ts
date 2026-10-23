import type { SeedTest } from "./types";

// Seed question banks. Each question goes into the shared question bank and
// is linked to its test through TestQuestion.

export const tests: SeedTest[] = [
  {
    id: "gs-paper-1",
    title: "General Studies Paper I — Full Simulation",
    category: "CIVIL",
    examSlug: "upsc-cse",
    summary: "Polity, Modern History, Economy and Geography with UPSC-style negative marking.",
    durationMinutes: 12,
    marking: { correct: 2, wrong: -0.66 },
    languages: ["en", "hi"],
    sections: [
      { id: "polity", name: { en: "Polity", hi: "राजव्यवस्था" } },
      { id: "history", name: { en: "History", hi: "इतिहास" } },
      { id: "economy", name: { en: "Economy", hi: "अर्थव्यवस्था" } },
      { id: "geography", name: { en: "Geography", hi: "भूगोल" } },
    ],
    questions: [
      {
        id: "gs-1",
        sectionId: "polity",
        prompt: {
          en: "Which constitutional amendment introduced the Goods and Services Tax (GST) in India?",
          hi: "भारत में वस्तु एवं सेवा कर (GST) किस संविधान संशोधन द्वारा लाया गया?",
        },
        options: [
          { en: "99th Amendment", hi: "99वाँ संशोधन" },
          { en: "101st Amendment", hi: "101वाँ संशोधन" },
          { en: "103rd Amendment", hi: "103वाँ संशोधन" },
          { en: "104th Amendment", hi: "104वाँ संशोधन" },
        ],
        answerIndex: 1,
        explanation: {
          en: "The Constitution (One Hundred and First Amendment) Act, 2016 introduced GST and inserted Article 246A.",
          hi: "संविधान (एक सौ एकवाँ संशोधन) अधिनियम, 2016 द्वारा GST लाया गया और अनुच्छेद 246A जोड़ा गया।",
        },
      },
      {
        id: "gs-2",
        sectionId: "polity",
        prompt: {
          en: "Which Article guarantees the Right to Constitutional Remedies?",
          hi: "संवैधानिक उपचारों का अधिकार किस अनुच्छेद में दिया गया है?",
        },
        options: [
          { en: "Article 19", hi: "अनुच्छेद 19" },
          { en: "Article 21", hi: "अनुच्छेद 21" },
          { en: "Article 32", hi: "अनुच्छेद 32" },
          { en: "Article 226", hi: "अनुच्छेद 226" },
        ],
        answerIndex: 2,
        explanation: {
          en: "Article 32 lets citizens move the Supreme Court directly to enforce Fundamental Rights. Article 226 gives similar (wider) powers to High Courts.",
          hi: "अनुच्छेद 32 मौलिक अधिकारों के लिए सीधे सर्वोच्च न्यायालय जाने का अधिकार देता है। अनुच्छेद 226 उच्च न्यायालयों को ऐसी (व्यापक) शक्ति देता है।",
        },
      },
      {
        id: "gs-3",
        sectionId: "polity",
        prompt: {
          en: "What is the minimum age to be elected President of India?",
          hi: "भारत का राष्ट्रपति चुने जाने के लिए न्यूनतम आयु कितनी है?",
        },
        options: [
          { en: "25 years", hi: "25 वर्ष" },
          { en: "30 years", hi: "30 वर्ष" },
          { en: "35 years", hi: "35 वर्ष" },
          { en: "40 years", hi: "40 वर्ष" },
        ],
        answerIndex: 2,
        explanation: {
          en: "Article 58 requires a presidential candidate to have completed 35 years of age.",
          hi: "अनुच्छेद 58 के अनुसार राष्ट्रपति पद के उम्मीदवार की आयु 35 वर्ष पूरी होनी चाहिए।",
        },
      },
      {
        id: "gs-4",
        sectionId: "history",
        prompt: {
          en: "In which year did the Battle of Plassey take place?",
          hi: "प्लासी का युद्ध किस वर्ष हुआ था?",
        },
        options: [
          { en: "1757", hi: "1757" },
          { en: "1764", hi: "1764" },
          { en: "1773", hi: "1773" },
          { en: "1857", hi: "1857" },
        ],
        answerIndex: 0,
        explanation: {
          en: "Robert Clive defeated Siraj-ud-Daulah at Plassey in 1757. The Battle of Buxar followed in 1764.",
          hi: "1757 में रॉबर्ट क्लाइव ने प्लासी में सिराजुद्दौला को हराया। बक्सर का युद्ध 1764 में हुआ।",
        },
      },
      {
        id: "gs-5",
        sectionId: "history",
        prompt: {
          en: "Who founded the Indian National Congress in 1885?",
          hi: "1885 में भारतीय राष्ट्रीय कांग्रेस की स्थापना किसने की?",
        },
        options: [
          { en: "Dadabhai Naoroji", hi: "दादाभाई नौरोजी" },
          { en: "W. C. Bonnerjee", hi: "डब्ल्यू. सी. बनर्जी" },
          { en: "A. O. Hume", hi: "ए. ओ. ह्यूम" },
          { en: "Surendranath Banerjee", hi: "सुरेंद्रनाथ बनर्जी" },
        ],
        answerIndex: 2,
        explanation: {
          en: "Allan Octavian Hume founded the INC. W. C. Bonnerjee presided over its first session in Bombay.",
          hi: "ए. ओ. ह्यूम ने कांग्रेस की स्थापना की। बंबई में पहले अधिवेशन की अध्यक्षता डब्ल्यू. सी. बनर्जी ने की।",
        },
      },
      {
        id: "gs-6",
        sectionId: "history",
        prompt: {
          en: "The Dandi March (Salt Satyagraha) began in which year?",
          hi: "दांडी मार्च (नमक सत्याग्रह) किस वर्ष शुरू हुआ?",
        },
        options: [
          { en: "1920", hi: "1920" },
          { en: "1928", hi: "1928" },
          { en: "1930", hi: "1930" },
          { en: "1942", hi: "1942" },
        ],
        answerIndex: 2,
        explanation: {
          en: "Gandhi set out from Sabarmati Ashram on 12 March 1930, launching the Civil Disobedience Movement.",
          hi: "गांधीजी 12 मार्च 1930 को साबरमती आश्रम से निकले और सविनय अवज्ञा आंदोलन शुरू हुआ।",
        },
      },
      {
        id: "gs-7",
        sectionId: "economy",
        prompt: {
          en: "The repo rate is the rate at which…",
          hi: "रेपो दर वह दर है जिस पर…",
        },
        options: [
          { en: "Banks lend to their best customers", hi: "बैंक अपने सर्वश्रेष्ठ ग्राहकों को ऋण देते हैं" },
          { en: "RBI lends to commercial banks", hi: "RBI वाणिज्यिक बैंकों को ऋण देता है" },
          { en: "Banks park surplus funds with RBI", hi: "बैंक अपनी अतिरिक्त राशि RBI के पास रखते हैं" },
          { en: "The government borrows from the public", hi: "सरकार जनता से उधार लेती है" },
        ],
        answerIndex: 1,
        explanation: {
          en: "Repo is RBI's short-term lending rate to banks against securities. Parking surplus funds with RBI earns the reverse repo / SDF rate.",
          hi: "रेपो वह दर है जिस पर RBI प्रतिभूतियों के बदले बैंकों को अल्पकालिक ऋण देता है। अतिरिक्त राशि RBI के पास रखने पर रिवर्स रेपो / SDF दर मिलती है।",
        },
      },
      {
        id: "gs-8",
        sectionId: "economy",
        prompt: {
          en: "Which body releases India's official GDP estimates?",
          hi: "भारत के आधिकारिक GDP अनुमान कौन जारी करता है?",
        },
        options: [
          { en: "Reserve Bank of India", hi: "भारतीय रिज़र्व बैंक" },
          { en: "NITI Aayog", hi: "नीति आयोग" },
          { en: "National Statistics Office (NSO)", hi: "राष्ट्रीय सांख्यिकी कार्यालय (NSO)" },
          { en: "Finance Commission", hi: "वित्त आयोग" },
        ],
        answerIndex: 2,
        explanation: {
          en: "The NSO under the Ministry of Statistics and Programme Implementation (MoSPI) publishes GDP estimates.",
          hi: "सांख्यिकी और कार्यक्रम कार्यान्वयन मंत्रालय (MoSPI) के अंतर्गत NSO GDP अनुमान जारी करता है।",
        },
      },
      {
        id: "gs-9",
        sectionId: "geography",
        prompt: {
          en: "The Tropic of Cancer does NOT pass through which state?",
          hi: "कर्क रेखा किस राज्य से होकर नहीं गुजरती?",
        },
        options: [
          { en: "Rajasthan", hi: "राजस्थान" },
          { en: "Odisha", hi: "ओडिशा" },
          { en: "Tripura", hi: "त्रिपुरा" },
          { en: "Jharkhand", hi: "झारखंड" },
        ],
        answerIndex: 1,
        explanation: {
          en: "It crosses Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura and Mizoram — not Odisha.",
          hi: "यह गुजरात, राजस्थान, मध्य प्रदेश, छत्तीसगढ़, झारखंड, पश्चिम बंगाल, त्रिपुरा और मिज़ोरम से गुजरती है — ओडिशा से नहीं।",
        },
      },
      {
        id: "gs-10",
        sectionId: "geography",
        prompt: {
          en: "Which pass connects Srinagar with Leh?",
          hi: "कौन-सा दर्रा श्रीनगर को लेह से जोड़ता है?",
        },
        options: [
          { en: "Zoji La", hi: "ज़ोजि ला" },
          { en: "Nathu La", hi: "नाथू ला" },
          { en: "Shipki La", hi: "शिपकी ला" },
          { en: "Bomdi La", hi: "बोमडि ला" },
        ],
        answerIndex: 0,
        explanation: {
          en: "Zoji La on NH-1 links the Kashmir valley with Ladakh.",
          hi: "NH-1 पर स्थित ज़ोजि ला कश्मीर घाटी को लद्दाख से जोड़ता है।",
        },
      },
    ],
  },
  {
    id: "quant-reasoning-drill",
    title: "Quant & Reasoning Speed Drill",
    category: "BANKING_SSC",
    examSlug: "ssc-cgl",
    summary: "Speed maths and logical reasoning in the IBPS / SSC pattern. Aim for under 40 seconds a question.",
    durationMinutes: 8,
    marking: { correct: 1, wrong: -0.25 },
    languages: ["en", "hi"],
    sections: [
      { id: "quant", name: { en: "Quantitative Aptitude", hi: "संख्यात्मक अभियोग्यता" } },
      { id: "reasoning", name: { en: "Reasoning", hi: "तर्कशक्ति" } },
    ],
    questions: [
      {
        id: "qr-1",
        sectionId: "quant",
        prompt: {
          en: "A train running at 72 km/h crosses a pole in 15 seconds. What is the length of the train?",
          hi: "72 किमी/घंटा की गति से चलती एक ट्रेन 15 सेकंड में एक खंभे को पार करती है। ट्रेन की लंबाई कितनी है?",
        },
        options: [{ en: "240 m" }, { en: "300 m" }, { en: "360 m" }, { en: "1080 m" }],
        answerIndex: 1,
        explanation: {
          en: "72 km/h = 72 × 5/18 = 20 m/s. Length = 20 × 15 = 300 m.",
          hi: "72 किमी/घंटा = 72 × 5/18 = 20 मी/से। लंबाई = 20 × 15 = 300 मी।",
        },
      },
      {
        id: "qr-2",
        sectionId: "quant",
        prompt: { en: "What is 20% of 250 + 15% of 200?", hi: "250 का 20% + 200 का 15% कितना है?" },
        options: [{ en: "70" }, { en: "75" }, { en: "80" }, { en: "85" }],
        answerIndex: 2,
        explanation: { en: "50 + 30 = 80.", hi: "50 + 30 = 80।" },
      },
      {
        id: "qr-3",
        sectionId: "quant",
        prompt: {
          en: "Simple interest on ₹5,000 at 8% per annum for 3 years is:",
          hi: "₹5,000 पर 8% वार्षिक दर से 3 वर्ष का साधारण ब्याज है:",
        },
        options: [{ en: "₹1,000" }, { en: "₹1,200" }, { en: "₹1,240" }, { en: "₹1,500" }],
        answerIndex: 1,
        explanation: { en: "SI = P × R × T / 100 = 5000 × 8 × 3 / 100 = ₹1,200.", hi: "SI = P × R × T / 100 = 5000 × 8 × 3 / 100 = ₹1,200।" },
      },
      {
        id: "qr-4",
        sectionId: "quant",
        prompt: {
          en: "A finishes a job in 12 days and B in 18 days. Working together, how long do they take?",
          hi: "A एक काम 12 दिन में और B 18 दिन में करता है। दोनों मिलकर कितने दिन में करेंगे?",
        },
        options: [{ en: "6 days" }, { en: "7.2 days" }, { en: "7.5 days" }, { en: "15 days" }],
        answerIndex: 1,
        explanation: { en: "1/12 + 1/18 = 5/36 per day, so 36/5 = 7.2 days.", hi: "1/12 + 1/18 = 5/36 प्रति दिन, अतः 36/5 = 7.2 दिन।" },
      },
      {
        id: "qr-5",
        sectionId: "quant",
        prompt: { en: "What is the average of the first 10 natural numbers?", hi: "पहली 10 प्राकृत संख्याओं का औसत क्या है?" },
        options: [{ en: "5" }, { en: "5.5" }, { en: "6" }, { en: "10" }],
        answerIndex: 1,
        explanation: { en: "Sum = 55, so average = 55 / 10 = 5.5.", hi: "योग = 55, अतः औसत = 55 / 10 = 5.5।" },
      },
      {
        id: "qr-6",
        sectionId: "reasoning",
        prompt: { en: "Find the next number: 2, 6, 12, 20, 30, ?", hi: "अगली संख्या ज्ञात करें: 2, 6, 12, 20, 30, ?" },
        options: [{ en: "40" }, { en: "42" }, { en: "44" }, { en: "48" }],
        answerIndex: 1,
        explanation: { en: "Terms are n(n+1): 6 × 7 = 42.", hi: "पद n(n+1) हैं: 6 × 7 = 42।" },
      },
      {
        id: "qr-7",
        sectionId: "reasoning",
        prompt: { en: "If CAT is written as DBU, how is DOG written?", hi: "यदि CAT को DBU लिखा जाता है, तो DOG को कैसे लिखेंगे?" },
        options: [{ en: "EPH" }, { en: "EOH" }, { en: "CNF" }, { en: "FQI" }],
        answerIndex: 0,
        explanation: { en: "Each letter shifts forward by one: D→E, O→P, G→H.", hi: "हर अक्षर एक स्थान आगे: D→E, O→P, G→H।" },
      },
      {
        id: "qr-8",
        sectionId: "reasoning",
        prompt: { en: "Pick the odd one out.", hi: "असंगत को चुनें।" },
        options: [
          { en: "Apple", hi: "सेब" },
          { en: "Mango", hi: "आम" },
          { en: "Potato", hi: "आलू" },
          { en: "Banana", hi: "केला" },
        ],
        answerIndex: 2,
        explanation: { en: "Potato is a vegetable (a tuber); the rest are fruits.", hi: "आलू सब्ज़ी (कंद) है; बाकी सब फल हैं।" },
      },
      {
        id: "qr-9",
        sectionId: "reasoning",
        prompt: {
          en: "Pointing to a man, Riya says, \"He is the son of my mother's only brother.\" How is the man related to Riya?",
          hi: "एक व्यक्ति की ओर इशारा करते हुए रिया कहती है, \"वह मेरी माँ के इकलौते भाई का बेटा है।\" वह व्यक्ति रिया का क्या लगता है?",
        },
        options: [
          { en: "Brother", hi: "भाई" },
          { en: "Uncle", hi: "मामा" },
          { en: "Cousin", hi: "ममेरा भाई" },
          { en: "Nephew", hi: "भतीजा" },
        ],
        answerIndex: 2,
        explanation: { en: "Mother's brother is her maternal uncle; his son is her cousin.", hi: "माँ का भाई मामा है; मामा का बेटा ममेरा भाई है।" },
      },
      {
        id: "qr-10",
        sectionId: "reasoning",
        prompt: {
          en: "Facing north, you turn right, then right again, then left. Which direction are you facing now?",
          hi: "उत्तर की ओर मुख करके आप दाएँ मुड़ते हैं, फिर दाएँ, फिर बाएँ। अब आपका मुख किस दिशा में है?",
        },
        options: [
          { en: "North", hi: "उत्तर" },
          { en: "South", hi: "दक्षिण" },
          { en: "East", hi: "पूर्व" },
          { en: "West", hi: "पश्चिम" },
        ],
        answerIndex: 2,
        explanation: { en: "North → East → South → (left) East.", hi: "उत्तर → पूर्व → दक्षिण → (बाएँ) पूर्व।" },
      },
    ],
  },
  {
    id: "dsa-sql-bench",
    title: "Full-Stack & Algorithms Speed Bench",
    category: "TECH",
    examSlug: "gate",
    summary: "Core data structures, complexity, SQL and HTTP basics asked in campus and PSU tech rounds.",
    durationMinutes: 6,
    marking: { correct: 1, wrong: 0 },
    languages: ["en"],
    sections: [
      { id: "dsa", name: { en: "Data Structures & Algorithms" } },
      { id: "web-db", name: { en: "Databases & Web" } },
    ],
    questions: [
      {
        id: "ds-1",
        sectionId: "dsa",
        prompt: { en: "What is the time complexity of binary search on a sorted array of n elements?" },
        options: [{ en: "O(1)" }, { en: "O(log n)" }, { en: "O(n)" }, { en: "O(n log n)" }],
        answerIndex: 1,
        explanation: { en: "Each comparison halves the search space, so it takes about log₂ n steps." },
      },
      {
        id: "ds-2",
        sectionId: "dsa",
        prompt: { en: "Which data structure follows Last-In, First-Out (LIFO)?" },
        options: [{ en: "Queue" }, { en: "Stack" }, { en: "Heap" }, { en: "Linked list" }],
        answerIndex: 1,
        explanation: { en: "A stack pushes and pops from the same end." },
      },
      {
        id: "ds-3",
        sectionId: "dsa",
        prompt: { en: "What is the worst-case time complexity of quicksort?" },
        options: [{ en: "O(n)" }, { en: "O(n log n)" }, { en: "O(n²)" }, { en: "O(2ⁿ)" }],
        answerIndex: 2,
        explanation: { en: "With consistently bad pivots (e.g. already sorted input and first-element pivot), partitions are size n−1, giving O(n²)." },
      },
      {
        id: "ds-4",
        sectionId: "web-db",
        prompt: { en: "Which SQL clause filters rows after GROUP BY has been applied?" },
        options: [{ en: "WHERE" }, { en: "HAVING" }, { en: "ORDER BY" }, { en: "LIMIT" }],
        answerIndex: 1,
        explanation: { en: "WHERE filters rows before grouping; HAVING filters the grouped results." },
      },
      {
        id: "ds-5",
        sectionId: "web-db",
        prompt: { en: "Which join returns every row from the left table, with NULLs where the right table has no match?" },
        options: [{ en: "INNER JOIN" }, { en: "LEFT JOIN" }, { en: "RIGHT JOIN" }, { en: "CROSS JOIN" }],
        answerIndex: 1,
        explanation: { en: "LEFT (OUTER) JOIN keeps all left-side rows." },
      },
      {
        id: "ds-6",
        sectionId: "web-db",
        prompt: { en: "Which HTTP status code means the requested resource was not found?" },
        options: [{ en: "301" }, { en: "403" }, { en: "404" }, { en: "500" }],
        answerIndex: 2,
        explanation: { en: "404 Not Found. 403 is Forbidden, 500 is a server error, 301 is a permanent redirect." },
      },
    ],
  },
];
