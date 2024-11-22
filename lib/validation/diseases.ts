import { z } from 'zod';
import { requiredText } from './helpers/translations';

const diseasesBaseSchema = z.object({});

// export const createDiseasesClientSchema = diseasesBaseSchema;
export const updateDiseasesClientSchema = diseasesBaseSchema
  .partial()
  .extend({
    id: z.number().int().positive(requiredText),
    cd_heart: z.boolean().optional().nullable(),
    cd_cancer: z.boolean().optional().nullable(),
    cd_a_pressure: z.boolean().optional().nullable(),
    cd_p_pressure: z.boolean().optional().nullable(),
    cd_cirrhosis: z.boolean().optional().nullable(),
    cd_pqod: z.boolean().optional().nullable(),
    cd_demention: z.boolean().optional().nullable(),
    cd_other: z.boolean().optional().nullable(),
    cd_other_comment: z.string().optional().nullable(),
    md_diabetes: z.boolean().optional().nullable(),
    md_hypertension: z.boolean().optional().nullable(),
    md_glomerulonephritis: z.boolean().optional().nullable(),
    md_adptd: z.boolean().optional().nullable(),
    md_lupus: z.boolean().optional().nullable(),
    md_vasculitis: z.boolean().optional().nullable(),
    md_amyloidosis: z.boolean().optional().nullable(),
    md_unknown: z.boolean().optional().nullable(),
    md_other: z.boolean().optional().nullable(),
    md_other_comment: z.string().optional().nullable(),
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
