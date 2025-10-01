import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { text } = await request.json();
  
  try {
    const response = await fetch('https://api.together.xyz/inference', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        prompt: `Summarize this text:\n\n${text}`,
        max_tokens: 200
      })
    });
    
    const data = await response.json();
    return NextResponse.json({ summary: data.output.choices[0].text });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}