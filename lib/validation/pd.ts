import { z } from 'zod';
import { requiredText } from './helpers/translations';
import { requiredDateValidation, validatePatientDate } from './helpers/validators';
import { pd_pd_modality, pd_solution_per_input } from '@prisma/client';

const PDBaseSchema = z.object({
  patient_id: z.number().int(requiredText).positive(requiredText),
  date: requiredDateValidation(),
  pd_modality: z.nativeEnum(pd_pd_modality),
  solution_per_input: z.nativeEnum(pd_solution_per_input),
  pd_ch_solution_136: z.boolean().optional().nullable(),
  pd_ch_solution_227: z.boolean().optional().nullable(),
  pd_ch_solution_386: z.boolean().optional().nullable(),
  icodextrin: z.boolean().optional().nullable(),
});

export const createPDClientSchema = PDBaseSchema;
export const updatePDClientSchema = PDBaseSchema.partial().extend({
  id: z.number().int(requiredText).positive(requiredText),
});

export type CreatePDClientSchema = z.infer<typeof createPDClientSchema>;
export type UpdatePDClientSchema = z.infer<typeof updatePDClientSchema>;

const checkDate = async (data: CreatePDClientSchema | UpdatePDClientSchema, ctx: z.RefinementCtx) => {
  await validatePatientDate(ctx, {
    patient_id: data.patient_id!,
    date: data.date!,
    dateField: 'date',
  });
};

export const createPDServerSchema = createPDClientSchema.superRefine(checkDate);
export const updatePDServerSchema = updatePDClientSchema.superRefine(checkDate);
