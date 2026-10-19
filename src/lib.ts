import type { CollectionEntry } from 'astro:content';

export type Lugar = CollectionEntry<'lugares'>;

export const statusLabel: Record<Lugar['data']['status'], string> = {
  'quero-ir': 'Quero ir',
  visitado: 'Visitado',
};

export const prioridadeLabel = { alta: 'Alta', media: 'Média', baixa: 'Baixa' } as const;

export function formatarData(d: Date) {
  return d.toLocaleDateString('pt-BR', { timeZone: 'UTC', day: '2-digit', month: 'short', year: 'numeric' });
}

export function estrelas(nota: number) {
  return '★'.repeat(nota) + '☆'.repeat(5 - nota);
}

export function slugify(s: string) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
