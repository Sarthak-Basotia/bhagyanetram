import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Point to the Python FastAPI engine (Ensure ASTRO_ENGINE_URL is set in your .env)
const PYTHON_ENGINE_URL = process.env.ASTRO_ENGINE_URL || "http://127.0.0.1:8000";

const getHeaders = () => ({ 'Content-Type': 'application/json' });

const formatDateTime = (dob, time) => {
  // If time is just "HH:MM", append ":00". If it already has seconds, leave it alone.
  const safeTime = time.split(':').length === 2 ? `${time}:00` : time;
  return `${dob}T${safeTime}`;
};

// ==========================================
// 1. FREE KUNDLI GENERATOR (AI Synthesis)
// ==========================================
export const generateKundli = async (req, res) => {
  try {
    const { name, dob, time, lat, lon, tz_offset } = req.body;
    
    // 1. Fetch exact mathematical positions from Python Engine
    const payload = {
      datetime: formatDateTime(dob, time),
      timezone_offset: tz_offset || 5.5,
      latitude: parseFloat(lat),
      longitude: parseFloat(lon)
    };

    const lagnaResponse = await fetch(`${PYTHON_ENGINE_URL}/kundli/lagna`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload)
    });
    
    const doshaResponse = await fetch(`${PYTHON_ENGINE_URL}/kundli/dosha/mangal`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload)
    });

    if (!lagnaResponse.ok) throw new Error("Astro Engine failed to compute Lagna");
    
    const lagnaData = await lagnaResponse.json();
    const doshaData = await doshaResponse.json();

    // 2. Feed accurate math into OpenAI for descriptive interpretation
    const prompt = `You are an expert Vedic astrologer. I have the exact astronomical data for ${name}.
    Ascendant: ${lagnaData.ascendant.sign}, Moon: ${lagnaData.planets.find(p => p.planet === 'Moon').sign}, Sun: ${lagnaData.planets.find(p => p.planet === 'Sun').sign}.
    Manglik Status: ${doshaData.effective_status}.
    
    Based strictly on these real planetary positions, generate a reading. Return ONLY valid JSON matching this exact structure:
    {
      "basicDetails": { 
        "ascendant": "${lagnaData.ascendant.sign}", 
        "moonSign": "${lagnaData.planets.find(p => p.planet === 'Moon').sign}", 
        "sunSign": "${lagnaData.planets.find(p => p.planet === 'Sun').sign}", 
        "nakshatra": "${lagnaData.ascendant.nakshatra}" 
      },
      "doshaCheck": { "mangalDosha": ${doshaData.is_manglik}, "description": "${doshaData.interpretation}" },
      "lifePredictions": {
        "personality": "2 sentences describing their core traits based on their Ascendant and Moon.",
        "career": "2 sentences predicting career tendencies.",
        "relationships": "2 sentences regarding love and partnerships."
      },
      "luckyElements": { "colors": ["Array", "of", "colors"], "numbers": [1, 2], "gemstone": "Specific Gemstone" }
    }`;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
      messages: [{ role: "system", content: prompt }]
    });

    res.json(JSON.parse(aiResponse.choices[0].message.content));
  } catch (error) {
    console.error("Kundli Error:", error);
    res.status(500).json({ error: "Failed to generate AI Kundli" });
  }
};

// ==========================================
// 2. ADVANCED KUNDLI (Raw Math for Charts)
// ==========================================
export const getAdvancedKundli = async (req, res) => {
  try {
    const { dob, time, lat, lon, tz_offset } = req.body;
    
    const payload = {
      datetime: `${dob}T${time}:00`,
      timezone_offset: tz_offset || 5.5,
      latitude: parseFloat(lat),
      longitude: parseFloat(lon)
    };

    // Fetch all comprehensive chart data concurrently from the Python microservice
    const [lagnaRes, navamsaRes, dashaRes, combinationsRes, panchangRes] = await Promise.all([
      fetch(`${PYTHON_ENGINE_URL}/kundli/lagna`, { method: "POST", headers: getHeaders(), body: JSON.stringify(payload) }),
      fetch(`${PYTHON_ENGINE_URL}/kundli/divisional/9`, { method: "POST", headers: getHeaders(), body: JSON.stringify(payload) }),
      fetch(`${PYTHON_ENGINE_URL}/kundli/dasha?levels=2`, { method: "POST", headers: getHeaders(), body: JSON.stringify(payload) }),
      fetch(`${PYTHON_ENGINE_URL}/kundli/yogas-doshas`, { method: "POST", headers: getHeaders(), body: JSON.stringify(payload) }),
      fetch(`${PYTHON_ENGINE_URL}/panchang/day`, { method: "POST", headers: getHeaders(), body: JSON.stringify(payload) })
    ]);

    if (!lagnaRes.ok) throw new Error("Astro Engine aggregator failed");

    const [lagna, navamsa, dasha, combinations, panchang] = await Promise.all([
      lagnaRes.json(),
      navamsaRes.json(),
      dashaRes.json(),
      combinationsRes.json(),
      panchangRes.json()
    ]);

    // Send raw structured math directly to React to draw the UI charts
    res.json({ success: true, data: { lagna, navamsa, dasha, combinations, panchang } });

  } catch (error) {
    console.error("Advanced Kundli Error:", error);
    res.status(500).json({ error: "Failed to fetch astrological mathematics" });
  }
};

// ==========================================
// 3. DAILY PANCHANG
// ==========================================
export const getPanchang = async (req, res) => {
  try {
    const { date, lat, lon, tz_offset } = req.body;
    
    // Assuming noon time to grab the general day's panchang
    const payload = {
      datetime: `${date}T12:00:00`,
      timezone_offset: tz_offset || 5.5,
      latitude: parseFloat(lat),
      longitude: parseFloat(lon)
    };

    const engineResponse = await fetch(`${PYTHON_ENGINE_URL}/panchang/day`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload)
    });

    const panchangData = await engineResponse.json();
    res.json({ success: true, data: panchangData });
  } catch (error) {
    console.error("Panchang Error:", error);
    res.status(500).json({ error: "Failed to generate Panchang" });
  }
};

// ==========================================
// 4. KUNDLI MATCHING (ASHTAKOOTA)
// ==========================================
export const matchKundli = async (req, res) => {
  try {
    const { boy, girl } = req.body;
    
    // Format the payloads for the Python Engine
    const formatPerson = (person) => ({
      datetime: `${person.dob}T${person.time}:00`,
      timezone_offset: person.tz_offset || 5.5,
      latitude: parseFloat(person.lat),
      longitude: parseFloat(person.lon)
    });

    const payload = {
      boy: formatPerson(boy),
      girl: formatPerson(girl)
    };

    // 1. Fetch exact Ashtakoota Guna Milan score from Python Engine
    const engineResponse = await fetch(`${PYTHON_ENGINE_URL}/match/ashtakoota`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload)
    });

    const matchData = await engineResponse.json();

    // 2. Feed the score to OpenAI for relationship advice
    const prompt = `You are a Vedic astrologer. I have computed the Ashtakoota Guna Milan score for a couple.
    Score: ${matchData.total_score} out of 36.
    Verdict: ${matchData.verdict}.
    Boy Manglik Status: ${matchData.manglik.boy}. Girl Manglik Status: ${matchData.manglik.girl}.
    Warnings: ${matchData.warnings.join(", ") || "None"}.

    Write a comforting and grounded relationship analysis based exactly on these facts. Return ONLY valid JSON:
    {
      "totalScore": ${matchData.total_score},
      "compatibilityLevel": "${matchData.verdict}",
      "analysis": {
        "varna": "1 sentence on spiritual compatibility.",
        "bhakoot": "1 sentence on love and emotional compatibility.",
        "nadi": "1 sentence on health and genetic compatibility."
      },
      "conclusion": "2 sentences summarizing this match realistically.",
      "remedies": ["array of 2 suggested remedies based on the warnings/manglik status"]
    }`;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
      messages: [{ role: "system", content: prompt }]
    });

    res.json(JSON.parse(aiResponse.choices[0].message.content));
  } catch (error) {
    console.error("Match Error:", error);
    res.status(500).json({ error: "Failed to calculate matching" });
  }
};

// ==========================================
// 5. NUMEROLOGY (Via Python Astro-Engine)
// ==========================================
export const getNumerology = async (req, res) => {
  try {
    const { name, dob, gender } = req.body;
    
    // Format payload exactly as the Python engine expects
    const payload = {
      full_name: name,
      date_of_birth: dob,
      gender: gender || "male"
    };

    const engineResponse = await fetch(`${PYTHON_ENGINE_URL}/numerology/basic`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload)
    });

    if (!engineResponse.ok) {
      throw new Error("Astro Engine failed to compute Numerology");
    }
    
    const numData = await engineResponse.json();

    // Pass the rich Python data directly to the frontend
    res.json({ success: true, data: numData });
  } catch (error) {
    console.error("Numerology Error:", error);
    res.status(500).json({ error: "Failed to generate Numerology reading" });
  }
};

// ==========================================
// 7. GEMSTONE GUIDE (Kundli + Numerology)
// ==========================================

// Standard Vedic Gemstone Mapping based on Ascendant (1st, 5th, and 9th House Lords)
const vedicGemstoneMap = {
  "Aries": { 
    life: { stone: "Red Coral", planet: "Mars", benefit: "Boosts health, courage, and vitality." },
    lucky: { stone: "Ruby", planet: "Sun", benefit: "Enhances intellect, creativity, and career." },
    fortune: { stone: "Yellow Sapphire", planet: "Jupiter", benefit: "Brings luck, higher wisdom, and prosperity." }
  },
  "Taurus": {
    life: { stone: "Diamond / Opal", planet: "Venus", benefit: "Enhances personality, wealth, and health." },
    lucky: { stone: "Emerald", planet: "Mercury", benefit: "Improves intelligence, speech, and quick thinking." },
    fortune: { stone: "Blue Sapphire", planet: "Saturn", benefit: "Brings profound luck, stability, and success." }
  },
  "Gemini": {
    life: { stone: "Emerald", planet: "Mercury", benefit: "Boosts confidence, immunity, and communication." },
    lucky: { stone: "Diamond / Opal", planet: "Venus", benefit: "Enhances creativity, romance, and artistic skills." },
    fortune: { stone: "Blue Sapphire", planet: "Saturn", benefit: "Brings destiny support and spiritual growth." }
  },
  "Cancer": {
    life: { stone: "Pearl", planet: "Moon", benefit: "Calms the mind, brings emotional stability and health." },
    lucky: { stone: "Red Coral", planet: "Mars", benefit: "Grants academic success, focus, and energy." },
    fortune: { stone: "Yellow Sapphire", planet: "Jupiter", benefit: "Brings immense fortune, wisdom, and protection." }
  },
  "Leo": {
    life: { stone: "Ruby", planet: "Sun", benefit: "Enhances leadership, immunity, and authority." },
    lucky: { stone: "Yellow Sapphire", planet: "Jupiter", benefit: "Boosts intellect, memory, and good karma." },
    fortune: { stone: "Red Coral", planet: "Mars", benefit: "Brings courage, luck, and removes obstacles." }
  },
  "Virgo": {
    life: { stone: "Emerald", planet: "Mercury", benefit: "Improves health, business, and analytical power." },
    lucky: { stone: "Blue Sapphire", planet: "Saturn", benefit: "Grants deep focus, discipline, and creative success." },
    fortune: { stone: "Diamond / Opal", planet: "Venus", benefit: "Brings overall fortune, luxury, and harmony." }
  },
  "Libra": {
    life: { stone: "Diamond / Opal", planet: "Venus", benefit: "Enhances physical appeal, health, and luxury." },
    lucky: { stone: "Blue Sapphire", planet: "Saturn", benefit: "Brings powerful success in education and investments." },
    fortune: { stone: "Emerald", planet: "Mercury", benefit: "Grants luck, spiritual growth, and wisdom." }
  },
  "Scorpio": {
    life: { stone: "Red Coral", planet: "Mars", benefit: "Boosts energy, protection, and confidence." },
    lucky: { stone: "Yellow Sapphire", planet: "Jupiter", benefit: "Enhances wisdom, children, and prosperity." },
    fortune: { stone: "Pearl", planet: "Moon", benefit: "Brings emotional balance and fortune." }
  },
  "Sagittarius": {
    life: { stone: "Yellow Sapphire", planet: "Jupiter", benefit: "Grants wisdom, good health, and respect." },
    lucky: { stone: "Red Coral", planet: "Mars", benefit: "Boosts courage, competitive edge, and intellect." },
    fortune: { stone: "Ruby", planet: "Sun", benefit: "Brings luck, fame, and spiritual elevation." }
  },
  "Capricorn": {
    life: { stone: "Blue Sapphire", planet: "Saturn", benefit: "Enhances discipline, health, and career stability." },
    lucky: { stone: "Diamond / Opal", planet: "Venus", benefit: "Brings creativity, financial gains, and romance." },
    fortune: { stone: "Emerald", planet: "Mercury", benefit: "Grants luck, higher education, and logic." }
  },
  "Aquarius": {
    life: { stone: "Blue Sapphire", planet: "Saturn", benefit: "Improves focus, removes delays, and protects health." },
    lucky: { stone: "Emerald", planet: "Mercury", benefit: "Enhances sharp intellect, writing, and speech." },
    fortune: { stone: "Diamond / Opal", planet: "Venus", benefit: "Brings destiny support, luxury, and peace." }
  },
  "Pisces": {
    life: { stone: "Yellow Sapphire", planet: "Jupiter", benefit: "Grants protection, wisdom, and health." },
    lucky: { stone: "Pearl", planet: "Moon", benefit: "Brings mental peace, creativity, and emotional balance." },
    fortune: { stone: "Red Coral", planet: "Mars", benefit: "Brings luck, energy, and overall fortune." }
  }
};

export const getGemstoneGuide = async (req, res) => {
  try {
    const { name, dob, time, lat, lon, tz_offset, gender } = req.body;
    
    // Parse Date and Time for Python Engine
    const [year, month, day] = dob.split('-');
    const [hour, min] = time.split(':');

    // 1. Fetch Numerology
    const numPayload = { full_name: name, date_of_birth: dob, gender: gender || "male" };
    const numResponse = await fetch(`${PYTHON_ENGINE_URL}/numerology/basic`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(numPayload)
    });
    
    const numData = await numResponse.json();
    if (!numResponse.ok) {
      console.error("Numerology Engine Error:", numData);
      throw new Error("Failed to fetch Numerology from Astro Engine");
    }

    // 2. Fetch Kundli Lagna
    // NOTE: If this fails, check your PM2 logs. Your python engine might expect 
    // 'latitude' instead of 'lat', or 'tz_offset' instead of 'tzone'.
    // 2. Fetch Kundli Lagna
   const kundliPayload = { 
      datetime: `${dob}T${time}:00`, // FastAPI usually expects ISO format
      latitude: parseFloat(lat), 
      longitude: parseFloat(lon), 
      timezone_offset: parseFloat(tz_offset) 
    }
    
    const kundliResponse = await fetch(`${PYTHON_ENGINE_URL}/kundli/lagna`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(kundliPayload)
    });
    
    const kundliData = await kundliResponse.json();
    if (!kundliResponse.ok) {
      // JSON.stringify forces Node to print the exact field names instead of [Array]
      console.error("Kundli Engine Error:", JSON.stringify(kundliData.detail, null, 2));
      throw new Error("Failed to fetch Kundli from Astro Engine");
    }

    // 3. Safely Map Ascendant to Vedic Gems
    // Checks multiple common response structures and provides a safe fallback
    let ascendantSign = "Aries"; // Default fallback to prevent crashes
    
    if (kundliData?.ascendant?.sign) {
      ascendantSign = kundliData.ascendant.sign;
    } else if (kundliData?.data?.ascendant?.sign) {
      ascendantSign = kundliData.data.ascendant.sign;
    } else if (typeof kundliData?.ascendant === 'string') {
      ascendantSign = kundliData.ascendant;
    }

    const astrologyGems = vedicGemstoneMap[ascendantSign] || vedicGemstoneMap["Aries"];

    res.json({
      success: true,
      data: {
        astrology: {
          ascendant: ascendantSign,
          gems: astrologyGems
        },
        numerology: {
          radical: {
            number: numData.numbers?.radical_number || 1,
            gemstone: numData.radical_profile?.gemstone || "Ruby",
            metal: numData.radical_profile?.metal || "Gold"
          },
          destiny: {
            number: numData.numbers?.destiny_number || 1,
            gemstone: numData.destiny_profile?.gemstone || "Ruby",
            metal: numData.destiny_profile?.metal || "Gold"
          }
        }
      }
    });

  } catch (error) {
    console.error("Gemstone API Error:", error.message);
    res.status(500).json({ error: "Failed to generate Gemstone Guide. Please check server logs." });
  }
};