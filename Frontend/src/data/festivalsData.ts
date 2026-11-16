export interface FestivalDay {
  date: number;
  dayOfWeek: string;
  tithiHindi: string;
  tithiEnglish: string;
  festivalHindi: string;
  festivalEnglish: string;
  isMajorFestival: boolean;
  isNewMoon?: boolean;
  isFullMoon?: boolean;
}

export interface MonthCalendar {
  year: number;
  month: number;
  westernMonthName: string;
  hinduMonthNames: string;
  days: FestivalDay[];
}

const daysMap = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const tithis = [
  { hi: 'प्रतिपदा', en: 'Pratipada' },
  { hi: 'द्वितीया', en: 'Dwitiya' },
  { hi: 'तृतीया', en: 'Tritiya' },
  { hi: 'चतुर्थी', en: 'Chaturthi' },
  { hi: 'पंचमी', en: 'Panchami' },
  { hi: 'षष्ठी', en: 'Shasthi' },
  { hi: 'सप्तमी', en: 'Saptami' },
  { hi: 'अष्टमी', en: 'Ashtami' },
  { hi: 'नवमी', en: 'Navami' },
  { hi: 'दशमी', en: 'Dashami' },
  { hi: 'एकादशी', en: 'Ekadashi' },
  { hi: 'द्वादशी', en: 'Dwadashi' },
  { hi: 'त्रयोदशी', en: 'Trayodashi' },
  { hi: 'चतुर्दशी', en: 'Chaturdashi' },
  { hi: 'पूर्णिमा / अमावस्या', en: 'Purnima / Amavasya' }
];

export const monthMetadata2026: Array<{
  month: number;
  name: string;
  shortName: string;
  hinduMonths: string;
  festivals: Record<number, { hi: string; en: string; major: boolean }>;
}> = [
  {
    month: 1,
    name: 'JANUARY 2026',
    shortName: 'Jan',
    hinduMonths: 'पौष / माघ',
    festivals: {
      1: { hi: 'नववर्ष २०२६', en: "New Year's Day", major: false },
      8: { hi: 'संकष्टी संकटा चौथ', en: 'Sakat Chauth', major: false },
      14: { hi: 'मकर संक्रांति / पोंगल', en: 'Makar Sankranti / Pongal', major: true },
      15: { hi: 'उत्तरायण उत्सव', en: 'Uttarayana', major: false },
      18: { hi: 'मौनी अमावस्या', en: 'Mauni Amavasya', major: true },
      23: { hi: 'वसंत पंचमी आगमन', en: 'Vasant Panchami Purva', major: false },
      24: { hi: 'पौष पूर्णिमा', en: 'Paush Purnima', major: false },
      26: { hi: 'गणतंत्र दिवस', en: 'Republic Day', major: false },
      28: { hi: 'जया एकादशी व्रत', en: 'Jaya Ekadashi', major: false }
    }
  },
  {
    month: 2,
    name: 'FEBRUARY 2026',
    shortName: 'Feb',
    hinduMonths: 'माघ / फाल्गुन',
    festivals: {
      1: { hi: 'माघ पूर्णिमा स्नान', en: 'Magha Purnima Snan', major: false },
      12: { hi: 'वसंत पंचमी / सरस्वती पूजा', en: 'Vasant Panchami', major: true },
      13: { hi: 'अचला सप्तमी', en: 'Achala Saptami', major: false },
      14: { hi: 'भीष्म अष्टमी', en: 'Bhishma Ashtami', major: false },
      15: { hi: 'विजया एकादशी', en: 'Vijaya Ekadashi', major: false },
      16: { hi: 'महाशिवरात्रि व्रत', en: 'Maha Shivratri', major: true },
      17: { hi: 'फाल्गुन अमावस्या', en: 'Phalguna Amavasya', major: false },
      23: { hi: 'माघ पूर्णिमा व्रत', en: 'Maghi Purnima', major: false }
    }
  },
  {
    month: 3,
    name: 'MARCH 2026',
    shortName: 'Mar',
    hinduMonths: 'फाल्गुन / चैत्र',
    festivals: {
      2: { hi: 'आमलकी एकादशी', en: 'Amalaki Ekadashi', major: false },
      3: { hi: 'होलिका दहन', en: 'Holika Dahan', major: true },
      4: { hi: 'होली (धुलंडी)', en: 'Holi (Color Festival)', major: true },
      8: { hi: 'रंग पंचमी', en: 'Rang Panchami', major: false },
      15: { hi: 'पापमोचिनी एकादशी', en: 'Papmochani Ekadashi', major: false },
      18: { hi: 'फाल्गुन अमावस्या', en: 'Chaitra Amavasya', major: false },
      19: { hi: 'चैत्र नवरात्रि प्रारंभ / नव संवत्सर', en: 'Chaitra Navratri / Gudi Padwa', major: true },
      22: { hi: 'मत्स्य जयंती', en: 'Matsya Jayanti', major: false },
      25: { hi: 'दुर्गा महाअष्टमी', en: 'Chaitra Durga Ashtami', major: true },
      27: { hi: 'श्री राम नवमी', en: 'Shri Ram Navami', major: true },
      31: { hi: 'कामदा एकादशी', en: 'Kamada Ekadashi', major: false }
    }
  },
  {
    month: 4,
    name: 'APRIL 2026',
    shortName: 'Apr',
    hinduMonths: 'चैत्र / वैशाख',
    festivals: {
      2: { hi: 'हनुमान जयंती / चैत्र पूर्णिमा', en: 'Hanuman Jayanti', major: true },
      13: { hi: 'वरूथिनी एकादशी', en: 'Varuthini Ekadashi', major: false },
      14: { hi: 'बैसाखी / मेष संक्रांति', en: 'Baisakhi / Mesha Sankranti', major: true },
      17: { hi: 'वैशाख अमावस्या', en: 'Vaishakh Amavasya', major: false },
      20: { hi: 'अक्षय तृतीया', en: 'Akshaya Tritiya', major: true },
      21: { hi: 'परशुराम जयंती', en: 'Parashurama Jayanti', major: false },
      24: { hi: 'गंगा सप्तमी', en: 'Ganga Saptami', major: false },
      27: { hi: 'मोहिनी एकादशी', en: 'Mohini Ekadashi', major: false },
      30: { hi: 'नृसिंह जयंती', en: 'Narasimha Jayanti', major: true }
    }
  },
  {
    month: 5,
    name: 'MAY 2026',
    shortName: 'May',
    hinduMonths: 'वैशाख / ज्येष्ठ',
    festivals: {
      1: { hi: 'कूर्म जयंती', en: 'Kurma Jayanti', major: false },
      2: { hi: 'बुद्ध पूर्णिमा / वैशाख पूर्णिमा', en: 'Buddha Purnima', major: true },
      4: { hi: 'नारद जयंती', en: 'Narada Jayanti', major: false },
      13: { hi: 'अपरा एकादशी', en: 'Apara Ekadashi', major: false },
      16: { hi: 'वट सावित्री व्रत (अमावस्या)', en: 'Vat Savitri Vrat', major: true },
      17: { hi: 'शनि जयंती / ज्येष्ठ अमावस्या', en: 'Shani Jayanti', major: true },
      26: { hi: 'गंगा दशहरा', en: 'Ganga Dussehra', major: true },
      27: { hi: 'निर्जला एकादशी', en: 'Nirjala Ekadashi', major: true },
      31: { hi: 'ज्येष्ठ पूर्णिमा / वट पूर्णिमा', en: 'Vat Purnima', major: false }
    }
  },
  {
    month: 6,
    name: 'JUNE 2026',
    shortName: 'Jun',
    hinduMonths: 'ज्येष्ठ / आषाढ',
    festivals: {
      1: { hi: 'कबीर दास जयंती', en: 'Kabir Jayanti', major: false },
      11: { hi: 'योगिनी एकादशी', en: 'Yogini Ekadashi', major: false },
      15: { hi: 'आषाढ अमावस्या', en: 'Ashadha Amavasya', major: false },
      17: { hi: 'जगन्नाथ रथ यात्रा', en: 'Jagannath Puri Rath Yatra', major: true },
      21: { hi: 'अंतरराष्ट्रीय योग दिवस', en: 'International Yoga Day', major: false },
      26: { hi: 'देवशयनी एकादशी', en: 'Devshayani Ekadashi', major: true },
      30: { hi: 'कोकिला व्रत', en: 'Kokila Vrat', major: false }
    }
  },
  {
    month: 7,
    name: 'JULY 2026',
    shortName: 'Jul',
    hinduMonths: 'आषाढ / श्रावण',
    festivals: {
      1: { hi: 'गुरु पूर्णिमा / व्यास पूजा', en: 'Guru Purnima', major: true },
      6: { hi: 'सावन प्रथम सोमवार व्रत', en: 'First Sawan Somwar', major: true },
      10: { hi: 'कामिका एकादशी', en: 'Kamika Ekadashi', major: false },
      13: { hi: 'सावन द्वितीय सोमवार व्रत', en: 'Second Sawan Somwar', major: false },
      14: { hi: 'हरियाली अमावस्या', en: 'Hariyali Amavasya', major: false },
      17: { hi: 'हरियाली तीज', en: 'Hariyali Teej', major: true },
      19: { hi: 'नाग पंचमी', en: 'Nag Panchami', major: true },
      20: { hi: 'सावन तृतीय सोमवार व्रत', en: 'Third Sawan Somwar', major: false },
      25: { hi: 'श्रावण पुत्रदा एकादशी', en: 'Shravana Putrada Ekadashi', major: false },
      27: { hi: 'सावन चतुर्थ सोमवार व्रत', en: 'Fourth Sawan Somwar', major: false },
      30: { hi: 'श्रावणी पूर्णिमा पूर्व', en: 'Shravani Purnima Eve', major: false }
    }
  },
  {
    month: 8,
    name: 'AUGUST 2026',
    shortName: 'Aug',
    hinduMonths: 'श्रावण / भाद्रपद',
    festivals: {
      2: { hi: 'कजरी तीज', en: 'Kajari Teej', major: false },
      8: { hi: 'अजा एकादशी', en: 'Aja Ekadashi', major: false },
      13: { hi: 'भाद्रपद अमावस्या (कुशोत्पाटिनी)', en: 'Bhadrapada Amavasya', major: false },
      15: { hi: 'स्वतंत्रता दिवस', en: 'Independence Day', major: false },
      18: { hi: 'संतान सप्तमी व्रत', en: 'Santan Saptami', major: false },
      24: { hi: 'परिवर्तिनी एकादशी', en: 'Parsva Ekadashi', major: false },
      28: { hi: 'रक्षाबंधन / श्रावण पूर्णिमा', en: 'Raksha Bandhan', major: true },
      29: { hi: 'गायत्री जयंती', en: 'Gayatri Jayanti', major: false },
      31: { hi: 'बड़ी तीज व्रत', en: 'Badi Teej', major: false }
    }
  },
  {
    month: 9,
    name: 'SEPTEMBER 2026',
    shortName: 'Sep',
    hinduMonths: 'भाद्रपद / आश्विन',
    festivals: {
      4: { hi: 'श्री कृष्ण जन्माष्टमी', en: 'Krishna Janmashtami', major: true },
      5: { hi: 'दही हांडी उत्सव', en: 'Dahi Handi', major: false },
      7: { hi: 'अजा एकादशी व्रत', en: 'Aja Ekadashi Vrat', major: false },
      11: { hi: 'पिठोरी अमावस्या', en: 'Pithori Amavasya', major: false },
      14: { hi: 'हरितालिका तीज', en: 'Haritalika Teej', major: true },
      15: { hi: 'गणेश चतुर्थी (गणेशोत्सव प्रारंभ)', en: 'Ganesh Chaturthi', major: true },
      16: { hi: 'ऋषि पंचमी', en: 'Rishi Panchami', major: false },
      19: { hi: 'राधा अष्टमी', en: 'Radha Ashtami', major: false },
      22: { hi: 'पद्मा एकादशी', en: 'Padma Ekadashi', major: false },
      24: { hi: 'अनंत चतुर्दशी (गणेश विसर्जन)', en: 'Anant Chaturdashi', major: true },
      27: { hi: 'पितृ पक्ष (श्राद्ध) प्रारंभ', en: 'Pitru Paksha Begins', major: true }
    }
  },
  {
    month: 10,
    name: 'OCTOBER 2026',
    shortName: 'Oct',
    hinduMonths: 'आश्विन / कार्तिक',
    festivals: {
      2: { hi: 'महात्मा गांधी जयंती', en: 'Gandhi Jayanti', major: false },
      6: { hi: 'इंदिरा एकादशी (श्राद्ध एकादशी)', en: 'Indira Ekadashi', major: false },
      11: { hi: 'सर्वपितृ अमावस्या (पितृ विसर्जन)', en: 'Sarva Pitru Amavasya', major: true },
      12: { hi: 'शारदीय नवरात्रि घटस्थापना', en: 'Sharad Navratri Begins', major: true },
      19: { hi: 'दुर्गा महाअष्टमी पूजा', en: 'Maha Ashtami', major: true },
      20: { hi: 'महानवमी / आयुध पूजा', en: 'Maha Navami / Ayudha Puja', major: true },
      21: { hi: 'विजयादशमी / दशहरा उत्सव', en: 'Dussehra / Vijayadashami', major: true },
      22: { hi: 'पापांकुशा एकादशी', en: 'Papankusha Ekadashi', major: false },
      26: { hi: 'शरद पूर्णिमा / कोजागरी', en: 'Sharad Purnima', major: true },
      29: { hi: 'करवा चौथ व्रत', en: 'Karwa Chauth', major: true }
    }
  },
  {
    month: 11,
    name: 'NOVEMBER 2026',
    shortName: 'Nov',
    hinduMonths: 'कार्तिक / मार्गशीर्ष',
    festivals: {
      2: { hi: 'अहोई अष्टमी व्रत', en: 'Ahoi Ashtami', major: false },
      5: { hi: 'रमा एकादशी', en: 'Rama Ekadashi', major: false },
      6: { hi: 'धनतेरस / धन्वंतरि जयंती', en: 'Dhanteras', major: true },
      7: { hi: 'नरक चतुर्दशी / छोटी दिवाली', en: 'Chhoti Diwali', major: false },
      8: { hi: 'दीपावली (महालक्ष्मी पूजन)', en: 'Diwali (Lakshmi Puja)', major: true },
      9: { hi: 'गोवर्धन पूजा / अन्नकूट', en: 'Govardhan Puja', major: true },
      10: { hi: 'भाई दूज / यम द्वितीया', en: 'Bhai Dooj', major: true },
      15: { hi: 'छठ पूजा (सूर्य षष्ठी)', en: 'Chhath Puja', major: true },
      20: { hi: 'देवउठनी एकादशी / तुलसी विवाह', en: 'Devutthana Ekadashi', major: true },
      24: { hi: 'कार्तिक पूर्णिमा / देव दीपावली', en: 'Dev Diwali / Kartik Purnima', major: true }
    }
  },
  {
    month: 12,
    name: 'DECEMBER 2026',
    shortName: 'Dec',
    hinduMonths: 'मार्गशीर्ष / पौष',
    festivals: {
      4: { hi: 'उत्पन्ना एकादशी', en: 'Utpanna Ekadashi', major: false },
      9: { hi: 'मार्गशीर्ष अमावस्या', en: 'Margashirsha Amavasya', major: false },
      14: { hi: 'विवाह पंचमी (श्री राम जानकी विवाह)', en: 'Vivah Panchami', major: true },
      20: { hi: 'मोक्षदा एकादशी / गीता जयंती', en: 'Mokshada Ekadashi / Gita Jayanti', major: true },
      23: { hi: 'मार्गशीर्ष पूर्णिमा / दत्तात्रेय जयंती', en: 'Dattatreya Jayanti', major: true },
      25: { hi: 'क्रिसमस पर्व', en: 'Christmas Day', major: false },
      31: { hi: 'सफला एकादशी', en: 'Saphala Ekadashi', major: false }
    }
  }
];

export function buildYearCalendars(year: number = 2026): MonthCalendar[] {
  return monthMetadata2026.map(mData => {
    const totalDays = new Date(year, mData.month, 0).getDate();
    const days: FestivalDay[] = [];

    for (let day = 1; day <= totalDays; day++) {
      const dateObj = new Date(year, mData.month - 1, day);
      const dayOfWeek = daysMap[dateObj.getDay()];
      const fest = mData.festivals[day] || { hi: '', en: '', major: false };
      const tithiIdx = (day - 1) % 15;
      const isFullMoon = day === 15;
      const isNewMoon = day === totalDays || (mData.month === 2 && day === 17);

      days.push({
        date: day,
        dayOfWeek,
        tithiHindi: tithis[tithiIdx].hi,
        tithiEnglish: tithis[tithiIdx].en,
        festivalHindi: fest.hi,
        festivalEnglish: fest.en,
        isMajorFestival: fest.major,
        isNewMoon,
        isFullMoon
      });
    }

    return {
      year,
      month: mData.month,
      westernMonthName: mData.name,
      hinduMonthNames: mData.hinduMonths,
      days
    };
  });
}

export const ALL_FESTIVALS_2026: MonthCalendar[] = buildYearCalendars(2026);
