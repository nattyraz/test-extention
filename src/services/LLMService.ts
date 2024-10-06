import axios from 'axios';

export class LLMService {
  private api: string;
  private apiKey: string;

  constructor(api: string, apiKey: string) {
    this.api = api;
    this.apiKey = apiKey;
  }

  async generateResponse(prompt: string): Promise<string> {
    const endpoint = 'https://api.groq.com/openai/v1/chat/completions';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };
    const data = {
      model: 'mixtral-8x7b-32768',
      messages: [{ role: 'user', content: prompt }],
    };

    try {
      const response = await axios.post(endpoint, data, { headers });
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling Groq API:', error);
      throw new Error('Failed to generate response from Groq API');
    }
  }
}