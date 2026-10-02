import OpenAI from 'openai';
import User from '../models/User.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzePalm = async (req, res) => {
  try {
    const { image } = req.body; // Base64 encoded image
    
    if (!image) {
      return res.status(400).json({ error: 'Palm image is required.' });
    }

    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (user.palmistryCredits <= 0) {
      return res.status(403).json({ error: 'You have used all 3 of your palmistry chances.' });
    }

    // Call OpenAI Vision API
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert Vedic palm reader (Palmist). Analyze the provided palm image and give a detailed reading covering Life line, Heart line, Head line, Fate line, and overall mounts. \n\nCRITICAL RULES:\n1. NEVER include a disclaimer about being unable to identify the person or any AI safety preamble. Jump straight into the reading.\n2. Do NOT say 'Here is your reading' or similar intro sentences.\n3. Use clear markdown formatting. Do not use '###' directly if possible, use HTML like <h3> or just bold text for sections to make it render cleanly, or strictly follow markdown but we will parse it. Actually, standard markdown (###) is fine, just focus on the content."
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Please read my palm." },
            {
              type: "image_url",
              image_url: {
                url: image, // Expected to be data:image/jpeg;base64,...
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    const reading = response.choices[0].message.content;

    // Deduct 1 credit
    user.palmistryCredits -= 1;
    await user.save();

    return res.status(200).json({ 
      reading, 
      remainingCredits: user.palmistryCredits 
    });

  } catch (error) {
    console.error('Palmistry Error:', error);
    return res.status(500).json({ error: 'Failed to analyze palm image. Please try again.' });
  }
};
