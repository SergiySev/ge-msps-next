import { z } from 'zod';
import { requiredText } from './helpers/translations';

const diseasesBaseSchema = z.object({});

// export const createDiseasesClientSchema = diseasesBaseSchema;
export const updateDiseasesClientSchema = diseasesBaseSchema
  .partial()
  .extend({
    id: z.number().int().positive(requiredText),
    cd_heart: z.boolean().default(false),
    cd_cancer: z.boolean().default(false),
    cd_a_pressure: z.boolean().default(false),
    cd_p_pressure: z.boolean().default(false),
    cd_cirrhosis: z.boolean().default(false),
    cd_pqod: z.boolean().default(false),
    cd_demention: z.boolean().default(false),
    cd_other: z.boolean().default(false),
    cd_other_comment: z.string().optional(),
    md_diabetes: z.boolean().default(false),
    md_hypertension: z.boolean().default(false),
    md_glomerulonephritis: z.boolean().default(false),
    md_adptd: z.boolean().default(false),
    md_lupus: z.boolean().default(false),
    md_vasculitis: z.boolean().default(false),
    md_amyloidosis: z.boolean().default(false),
    md_unknown: z.boolean().default(false),
    md_other: z.boolean().default(false),
    md_other_comment: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.cd_other_comment && !data.cd_other) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'სხვა (კომორბიდული) - არარის მონიშნული',
        path: ['cd_other_comment'],
      });
    }

    if (data.md_other_comment && !data.md_other) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'სხვა (ძირითადი) - არარის მონიშნული',
        path: ['md_other_comment'],
      });
    }
  });

// export type CreateDiseasesClientSchema = z.infer<typeof createDiseasesClientSchema>;
export type UpdateDiseasesClientSchema = z.infer<typeof updateDiseasesClientSchema>;

// export const createDiseasesServerSchema = createDiseasesClientSchema;
export const updateDiseasesServerSchema = updateDiseasesClientSchema;
