import { getProfile } from "../storage/onboarding";

const API_KEY = "sk-xt-7d30ed2fbef80078c1679c98609e4a41729db6f3ec01d8f5";
const BASE_URL = "https://api.xkiro.com/v1/chat/completions";

export async function generateInsight(
  prompt: string,
  maxRetries = 3,
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

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          // model: "openai/gpt-5.6-sol",
          // model: "openai/gpt-5.3-codex-spark",
          model: "deepseek/deepseek-v4-pro",

          messages: [{ role: "user", content: finalPrompt }],
        }),
      });

      if (response.status === 503 || response.status === 429) {
        console.warn(
          `AI API High Demand (${response.status}). Retrying... (${attempt + 1}/${maxRetries})`,
        );
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * Math.pow(2, attempt)),
        );
        continue;
      }

      if (!response.ok) {
        console.error("AI API Error:", await response.text());
        return null;
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || null;
    } catch (error) {
      console.error("Failed to generate insight:", error);
      if (attempt === maxRetries - 1) return null;
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * Math.pow(2, attempt)),
      );
    }
  }
  return null;
}
