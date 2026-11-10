import { getProfile } from "../storage/onboarding";

const API_KEY = "sk-xt-7d30ed2fbef80078c1679c98609e4a41729db6f3ec01d8f5";
const BASE_URL = "https://api.xkiro.com/v1/chat/completions";

export async function generateInsight(
  prompt: string,
): Promise<string | null> {
  const profile = await getProfile();

  let profileContext = "";
  if (profile) {
    profileContext = `[USER PROFILE CONTEXT]
Name: ${profile.name || "Unknown"}
Age: ${profile.age || "Unknown"}
Relationship Status: ${profile.relationshipStatus || "Unknown"}
Occupation: ${profile.occupation || "Unknown"}
Note: Always adapt your tone, empathy, and advice to match this user's specific context.
[/USER PROFILE CONTEXT]

`;
  }

  const finalPrompt = profileContext + prompt;

  const models = [
    "qwen/qwen3.8-omni-flash:free",
    "qwen/qwen3.7-max:free",
    "sensenova/sensenova-6.8-flash-lite",
    "mistralai/mistral-large-2512",
    "minimax/minimax-m2.7:free",
    "qwen/qwen3.8-max:free",
  ];

  for (let attempt = 0; attempt < models.length; attempt++) {
    const currentModel = models[attempt];
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: currentModel,
          messages: [{ role: "user", content: finalPrompt }],
        }),
      });

      if (response.status === 503 || response.status === 429 || !response.ok) {
        console.warn(
          `AI API Error with model ${currentModel} (${response.status}). Switching model... (${attempt + 1}/${models.length})`,
        );
        if (!response.ok && response.status !== 503 && response.status !== 429) {
          console.error("AI API Error Details:", await response.text());
        }

        if (attempt < models.length - 1) {
          await new Promise((resolve) =>
            setTimeout(resolve, 1000),
          );
        }
        continue;
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || null;
    } catch (error) {
      console.error(`Failed to generate insight with model ${currentModel}:`, error);
      if (attempt === models.length - 1) return null;

      await new Promise((resolve) =>
        setTimeout(resolve, 1000),
      );
    }
  }
  return null;
}
