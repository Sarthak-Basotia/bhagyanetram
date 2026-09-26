import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateMonthCalendar = async (year, month) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const westernMonthName = `${monthNames[month - 1].toUpperCase()} ${year}`;

  const prompt = `You are a Vedic Astrology and Hindu Panchang expert. Generate the complete daily Hindu calendar for ${westernMonthName}.
  
  Return ONLY valid JSON matching this exact structure. Do not include markdown formatting or explanations.
  {
    "year": ${year},
    "month": ${month},
    "westernMonthName": "${westernMonthName}",
    "hinduMonthNames": "e.g., भाद्रपद / आश्विन",
    "days": [
      {
        "date": 1,
        "dayOfWeek": "SUN",
        "tithiHindi": "तृतीया",
        "tithiEnglish": "Tritiya",
        "festivalHindi": "Major festival name if any, otherwise empty",
        "festivalEnglish": "Major festival name if any, otherwise empty",
        "isMajorFestival": false,
        "isNewMoon": false,
        "isFullMoon": false
      }
      // ... generate an object for EVERY single day of this specific month
    ]
  }`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Cost-effective and highly capable of JSON generation
      response_format: { type: "json_object" },
      messages: [{ role: "system", content: prompt }]
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error(`OpenAI Error generating calendar for ${month}/${year}:`, error);
    throw error;
  }
};