import OpenAI from 'openai';
import { Employee, Message, Document } from '../types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface GenerateMessagesInput {
  gameId: string;
  employees: Employee[];
  strategyDoc: Document | null;
  currentTurn: number;
  recentMessages: Message[];
}

export async function generateEmployeeMessages({
  gameId,
  employees,
  strategyDoc,
  currentTurn,
  recentMessages,
}: GenerateMessagesInput): Promise<Message[]> {
  const systemPrompt = `You are simulating a startup team where each employee has a unique personality and role.
The employees should respond based on the company's strategy document and recent conversations.
Each message should reflect the employee's role and personality traits.
Keep responses concise and natural, like real Slack messages.`;

  const userPrompt = `Strategy Document:
${strategyDoc?.content || 'No strategy document available'}

Recent Messages:
${recentMessages.map(msg => `${msg.employeeId}: ${msg.content}`).join('\n')}

Current Turn: ${currentTurn}

Employees:
${employees.map(emp => 
  `${emp.name} (${emp.role}): ${emp.traits.join(', ')}`
).join('\n')}

Generate messages for each employee in the following JSON format:
{
  "messages": [
    {
      "employeeId": "employee_id",
      "channel": "channel_name",
      "content": "message content",
      "isPrivate": boolean
    }
  ]
}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
  });

  const response = JSON.parse(completion.choices[0].message.content);
  return response.messages.map((msg: any) => ({
    id: crypto.randomUUID(),
    employeeId: msg.employeeId,
    channel: msg.channel,
    content: msg.content,
    private: msg.isPrivate,
    turnNumber: currentTurn,
    createdAt: new Date(),
  }));
} 