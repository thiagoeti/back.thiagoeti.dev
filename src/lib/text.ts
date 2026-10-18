import page from '../../.analyse/page.json'

/**
 * Microcopy de interface (`.analyse/page.json › text`): rótulos, estados e easter eggs.
 * Conteúdo do projeto não mora aqui — só em `.content/` e nos repositórios.
 */
export const text = page.text

/** Preenche `{chave}` de um modelo. */
export const fill = (template: string, values: Record<string, string | number>): string =>
	template.replace(/\{(\w+)\}/g, (_, k: string) => String(values[k] ?? ''))
