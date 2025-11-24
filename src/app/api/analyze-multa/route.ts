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

    console.log('🚀 Iniciando análise de multa com OpenAI...');

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
                "observacoes": "observações relevantes sobre a multa",
                "gravidade": "leve, media, grave ou gravissima"
              }
              
              Se não conseguir identificar algum campo, use valores padrão razoáveis baseados no contexto da imagem. Seja preciso e detalhado nas observações.`,
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
    console.log('✅ Análise concluída com sucesso');

    if (!content) {
      throw new Error('OpenAI não retornou conteúdo');
    }

    const analysis = JSON.parse(content);

    return NextResponse.json({ success: true, analysis });
  } catch (error) {
    console.error('❌ Erro ao analisar multa:', error);

    // Retornar erro mais detalhado
    const errorMessage =
      error instanceof Error ? error.message : 'Erro desconhecido';

    return NextResponse.json(
      {
        error: 'Erro ao processar análise da multa',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
