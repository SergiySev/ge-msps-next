import { z } from 'zod';
import { requiredText } from './helpers/translations';
import { inBetweenDatesValidation, requiredDateValidation } from './helpers/validators';
import { pd_pd_modality, pd_solution_per_input } from '@prisma/client';
import { getPatientById } from './queries/getPatientById';

const PDBaseSchema = z.object({
  patient_id: z.number().int(requiredText).positive(requiredText),
  date: requiredDateValidation(),
  pd_modality: z.nativeEnum(pd_pd_modality),
  solution_per_input: z.nativeEnum(pd_solution_per_input),
  pd_ch_solution_136: z.boolean().default(false),
  pd_ch_solution_227: z.boolean().default(false),
  pd_ch_solution_386: z.boolean().default(false),
  icodextrin: z.boolean().default(false),
});

export const createPDClientSchema = PDBaseSchema;
export const updatePDClientSchema = PDBaseSchema.partial().extend({
  id: z.number().int(requiredText).positive(requiredText),
});

export type CreatePDClientSchema = z.infer<typeof createPDClientSchema>;
export type UpdatePDClientSchema = z.infer<typeof updatePDClientSchema>;

const checkDate = async (data: CreatePDClientSchema | UpdatePDClientSchema, ctx: z.RefinementCtx) => {
  const patient = await getPatientById(data.patient_id!);
  if (!patient) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Patient not found',
      path: ['patient_id'],
    });
    return;
  }

  inBetweenDatesValidation(ctx, 'date', data.date, patient.birth_date, patient.mors_date);
};

export const createPDServerSchema = createPDClientSchema.superRefine(checkDate);
export const updatePDServerSchema = updatePDClientSchema.superRefine(checkDate);
