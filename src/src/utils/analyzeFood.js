export async function analyzeFood(apiKey, imageBase64, mimeType = 'image/jpeg', manualText = null) {
  const userContent = manualText
    ? [{ type: 'text', text: `Analyze this food item and give me its nutritional information: "${manualText}"` }]
    : [
        {
          type: 'image',
          source: { type: 'base64', media_type: mimeType, data: imageBase64 },
        },
        {
          type: 'text',
          text: 'Analyze this food image carefully. Identify what food(s) you see and estimate the nutritional information.',
        },
      ]

  const systemPrompt = `You are a precise nutritional analysis AI. When given a food image or description, respond ONLY with a JSON object (no markdown, no explanation) in this exact format:

{
  "foodName": "string — specific food name (e.g. 'Grilled Chicken Breast with Rice')",
  "emoji": "single emoji representing the food",
  "calories": number,
  "protein": number,
  "carbs": number,
  "fat": number,
  "fiber": number,
  "sugar": number,
  "servingSize": "string (e.g. '1 plate (~350g)')",
  "confidence": "high|medium|low",
  "ingredients": ["array", "of", "main", "ingredients"],
  "healthScore": number from 1-10,
  "healthTip": "one short practical tip about this food",
  "mealType": "breakfast|lunch|dinner|snack"
}

Be precise. Use real nutritional data. All numbers should be realistic grams/kcal.`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userContent }],
    }),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error?.message || `API error ${response.status}`)
  }

  const data = await response.json()
  const text = data.content.map(b => b.text || '').join('')

  // Strip any markdown code fences if present
  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}
