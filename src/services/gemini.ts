import { GoogleGenAI } from "@google/genai";
import { env } from "../env.ts";

const googleGenAI = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

const model = "gemini-2.5-flash";

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const response = await googleGenAI.models.generateContent({
    model,
    contents: [
      {
        text: "Transcreva o áudio a seguir para texto em português do Brasil. Em seguida, analise o conteúdo e gere um JSON com a seguinte estrutura aninhada: data:{ tipo: 'reserva', data:{ hospede: { nome, telefone }, data_entrada, data_saida, valor, tipo_reserva }, apartamento:{ numero }, pagamento:{}, obs }. Utilize chaves descritivas, reflita corretamente as relações hierárquicas e retorne apenas o JSON, sem explicações ou comentários.",
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64,
        },
      },
    ],
  });

  if (!response.text) {
    throw new Error("Failed to transcribe audio");
  }

  return response.text;
}
