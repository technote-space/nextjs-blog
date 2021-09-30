import type { Field } from '$/domain/sitemap/eneity/field';

export interface ISitemap {
  getFields(): Promise<Field[]>;
}
