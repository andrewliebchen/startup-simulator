import OpenAI from 'openai';
import { Employee, Message as GameMessage } from '../types';

interface ChatCompletionResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateMessages(
  strategy: string,
  employees: Employee[],
  recentMessages: GameMessage[]
): Promise<ChatCompletionResponse> {
  const systemPrompt = `You are simulating a startup team. Each employee has a unique personality and role.
They should respond based on the company strategy and their personality traits.
Keep responses concise and natural, like real team chat messages.`;

  const userPrompt = `Strategy Document:
${strategy}

Employees:
${employees.map(e => `${e.name} (${e.role}): ${e.traits.join(', ')}`).join('\n')}

Recent Messages:
${recentMessages.map(m => `${m.content}`).join('\n')}

Generate responses from each employee in the appropriate channels.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    temperature: 0.7,
  });

  return completion as unknown as ChatCompletionResponse;
} 