
import { z } from "zod";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// Define the schema for ingredient recognition
const ingredientSchema = z.object({
  ingredients: z.array(
    z.object({
      name: z.string().describe("The name of the ingredient"),
      quantity: z.string().describe("The quantity of the ingredient (e.g., '2 tbsp', '500g')"),
    })
  ),
});

export async function recognizeIngredients(input: string) {
  try {
    // Initialize OpenAI API client with your API key from environment variables
    const openai = new OpenAI({
      // apiKey: process.env.OPENAI_API_KEY,
      apiKey: "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",
      dangerouslyAllowBrowser: true,
    });

    // Craft a prompt that instructs the model to return a JSON formatted output matching our schema
    const prompt = `
Extract all ingredients and their quantities from the following recipe or meal description:
"${input}"

Please only return a JSON object with the following format:
{
  "ingredients": [
    { "name": "Ingredient Name", "quantity": "Quantity" },
    ...
  ]
}

Ensure that only valid JSON is returned.
    `;

    // Call the OpenAI API using ChatCompletion
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or "gpt-3.5-turbo" as needed
      messages: [{ role: "user", content: prompt }],
      temperature: 0, // Lower temperature for deterministic output
    });

    // Extract the content from the response
    const content = response.choices[0].message?.content;
    if (!content) {
      throw new Error("No response content received from OpenAI.");
    }

    // Parse the JSON response from the AI
    const parsed = JSON.parse(content);

    // Validate the parsed data against our schema
    const validated = ingredientSchema.parse(parsed);

    return validated.ingredients;
  } catch (error) {
    console.error("Error recognizing ingredients:", error);
    throw new Error("Failed to recognize ingredients");
  }
}