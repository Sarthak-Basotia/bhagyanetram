"""Static Vedic-astrology tables. No calculation here — just reference data."""

# --- Signs (Rasi), 0-indexed (0 = Aries) ---
SIGNS = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
]

# Sign nature: 0 = movable(chara), 1 = fixed(sthira), 2 = dual(dwiswabhava)
SIGN_NATURE = [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2]

# Sign element: fire/earth/air/water repeating
SIGN_ELEMENT = ["fire", "earth", "air", "water"] * 3

# --- The 9 grahas (Navagraha) ---
# Keys are our internal names; values map to pyswisseph body ids where applicable.
PLANETS = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"]

# Outer / trans-Saturnian planets. Not part of classical Jyotish (BPHS), so they are
# excluded from dosha / yoga / dasha logic and only appear in chart output when requested.
OUTER_PLANETS = ["Uranus", "Neptune", "Pluto"]

# Sign lordships (which planet rules each sign), 0-indexed by sign
SIGN_LORD = [
    "Mars", "Venus", "Mercury", "Moon", "Sun", "Mercury",
    "Venus", "Mars", "Jupiter", "Saturn", "Saturn", "Jupiter",
]

# Exaltation sign per planet (sign index) and exact exaltation degree
EXALTATION = {
    "Sun": (0, 10), "Moon": (1, 3), "Mars": (9, 28), "Mercury": (5, 15),
    "Jupiter": (3, 5), "Venus": (11, 27), "Saturn": (6, 20),
}
# Debilitation = exaltation sign + 6 (opposite sign)
DEBILITATION = {p: ((s + 6) % 12, d) for p, (s, d) in EXALTATION.items()}

# Own signs (moolatrikona/own) for dignity checks
OWN_SIGNS = {
    "Sun": [4], "Moon": [3], "Mars": [0, 7], "Mercury": [2, 5],
    "Jupiter": [8, 11], "Venus": [1, 6], "Saturn": [9, 10],
}

# Combustion orbs (degrees from Sun) per planet
COMBUSTION_ORB = {
    "Moon": 12, "Mars": 17, "Mercury": 14, "Jupiter": 11, "Venus": 10, "Saturn": 15,
}

# --- 27 Nakshatras (0-indexed; each spans 13°20' = 13.3333°) ---
NAKSHATRAS = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
    "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
    "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
    "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta",
    "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
]

# Vimshottari dasha: lord sequence (starting from Ashwini's lord) and years
VIMSHOTTARI_ORDER = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"]
VIMSHOTTARI_YEARS = {
    "Ketu": 7, "Venus": 20, "Sun": 6, "Moon": 10, "Mars": 7,
    "Rahu": 18, "Jupiter": 16, "Saturn": 19, "Mercury": 17,
}
VIMSHOTTARI_TOTAL = 120  # sum of years

# --- Panchang tables ---
TITHI_NAMES = [
    "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashthi",
    "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi",
    "Trayodashi", "Chaturdashi", "Purnima",  # 1-15 (Shukla)
    "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashthi",
    "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi",
    "Trayodashi", "Chaturdashi", "Amavasya",  # 16-30 (Krishna)
]

YOGA_NAMES = [
    "Vishkambha", "Priti", "Ayushman", "Saubhagya", "Shobhana", "Atiganda",
    "Sukarma", "Dhriti", "Shula", "Ganda", "Vriddhi", "Dhruva", "Vyaghata",
    "Harshana", "Vajra", "Siddhi", "Vyatipata", "Variyana", "Parigha", "Shiva",
    "Siddha", "Sadhya", "Shubha", "Shukla", "Brahma", "Indra", "Vaidhriti",
]

KARANA_NAMES = [
    "Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti",
    "Shakuni", "Chatushpada", "Naga", "Kimstughna",
]

WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
# Hora lords cycle (Chaldean order) used for planetary hours
HORA_LORDS = ["Sun", "Venus", "Mercury", "Moon", "Saturn", "Jupiter", "Mars"]
# Day lord by weekday (Sun..Sat)
DAY_LORD = {
    "Sunday": "Sun", "Monday": "Moon", "Tuesday": "Mars", "Wednesday": "Mercury",
    "Thursday": "Jupiter", "Friday": "Venus", "Saturday": "Saturn",
}

# Hindu lunar months (Chaitra .. Phalguna), 0-indexed
LUNAR_MONTHS = [
    "Chaitra", "Vaishakha", "Jyeshtha", "Ashadha", "Shravana", "Bhadrapada",
    "Ashwina", "Kartika", "Margashirsha", "Pausha", "Magha", "Phalguna",
]
# Ritu (seasons), each spans 2 solar months
RITUS = ["Vasanta", "Grishma", "Varsha", "Sharad", "Hemanta", "Shishira"]
