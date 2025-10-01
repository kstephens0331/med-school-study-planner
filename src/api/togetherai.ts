interface TogetherAIOptions {
  model?: string;
  max_tokens?: number;
  temperature?: number;
}

export class TogetherAI {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async generate(
    prompt: string,
    options: TogetherAIOptions = {}
  ): Promise<string> {
    const response = await fetch(`${this.baseUrl}/inference`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: options.model || 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        prompt,
        max_tokens: options.max_tokens || 200,
        temperature: options.temperature || 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`AI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.output?.choices?.[0]?.text || '';
  }

  async summarize(text: string): Promise<string> {
    return this.generate(`Summarize this text:\n\n${text}`);
  }

  async batchGenerate(prompts: string[]): Promise<string[]> {
    return Promise.all(prompts.map(prompt => this.generate(prompt)));
  }
}