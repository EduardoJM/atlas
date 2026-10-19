import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const lugares = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './lugares' }),
  schema: ({ image }) =>
    z.object({
      nome: z.string(),
      tipo: z.string(),
      cidade: z.string(),
      pais: z.string(),
      coordenadas: z.tuple([z.number(), z.number()]).nullish(),
      status: z.enum(['quero-ir', 'visitado']),
      data_visita: z.coerce.date().nullish(),
      nota: z.number().int().min(1).max(5).nullish(),
      prioridade: z.enum(['alta', 'media', 'baixa']).nullish(),
      tags: z.array(z.string()).nullish().transform((t) => t ?? []),
      // caminhos relativos ao .md, ex.: [./fotos/entrada.jpg] ou [{ src: ./fotos/entrada.jpg, legenda: Entrada }]
      imagens: z
        .array(z.union([image(), z.object({ src: image(), legenda: z.string().nullish() })]))
        .nullish()
        .transform((imgs) => (imgs ?? []).map((i) => (typeof i === 'string' ? { src: i, legenda: null } : i))),
    }),
});

export const collections = { lugares };
