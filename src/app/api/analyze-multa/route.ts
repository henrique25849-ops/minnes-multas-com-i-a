import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'URL da imagem é obrigatória' },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analise esta imagem de multa de trânsito e extraia as seguintes informações em formato JSON:
              {
                "tipo": "tipo da infração (ex: Excesso de velocidade, Estacionamento irregular, etc)",
                "infracao": "código da infração",
                "valor": valor em reais (número),
                "pontos": pontos na CNH (número),
                "local": "local da infração",
                "data": "data da infração (formato DD/MM/YYYY)",
                "placa": "placa do veículo",
                "veiculo": "modelo e marca do veículo",
                "condutor": "nome do condutor se visível",
                "observacoes": "observações relevantes",
                "gravidade": "leve, media, grave ou gravissima"
              }
              
              Se não conseguir identificar algum campo, use valores padrão razoáveis baseados no contexto da imagem.`,
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;
    const analysis = content ? JSON.parse(content) : null;

    return NextResponse.json({ success: true, analysis });
  } catch (error) {
    console.error('Erro ao analisar multa:', error);
    return NextResponse.json(
      { error: 'Erro ao processar análise da multa' },
      { status: 500 }
    );
  }
}
