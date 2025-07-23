import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";

import { z } from "zod/v4";
import { transcribeAudio } from "../services/gemini.ts";

export const uploadAudioRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/rooms/:id/audio",
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      //   const { id } = request.params;
      const audio = await request.file();

      if (!audio) {
        return reply.status(400).send({ error: "No audio file uploaded." });
      }

      // transcrever o audio usando gemini AI
      // gerar o vetor semantico / embeddings do audio
      // armarzenar os vetores no banco de dados
      const audioAsBase64 = await audio
        .toBuffer()
        .then((buffer) => buffer.toString("base64"));
      const transcription = await transcribeAudio(
        audioAsBase64,
        audio.mimetype
      );

      return { transcription };
    }
  );
};
