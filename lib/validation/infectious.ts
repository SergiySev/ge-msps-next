import { z } from 'zod';
import { requiredText } from './helpers/translations';
import { inBetweenDatesValidation, requiredDateValidation } from './helpers/validators';
import { infectious_infection_type } from '@prisma/client';
import { getPatientById } from './queries/getPatientById';

const infectiousBaseSchema = z.object({
  patient_id: z.number().int(requiredText).positive(requiredText),
  date: requiredDateValidation(),

  infection_type: z.nativeEnum(infectious_infection_type),

  infection_start_date: requiredDateValidation().optional(),
  infection_end_date: requiredDateValidation().optional(),

  treatment_start_date: requiredDateValidation().optional(),
  treatment_end_date: requiredDateValidation().optional(),

  vancomycin: z.boolean().optional().nullable(),
  ceftazidime: z.boolean().optional().nullable(),
  ceftriaxone: z.boolean().optional().nullable(),
  cefepime: z.boolean().optional().nullable(),
  meropenem: z.boolean().optional().nullable(),
  imipenem: z.boolean().optional().nullable(),
  ciprofloxacin: z.boolean().optional().nullable(),
  cefazolin: z.boolean().optional().nullable(),
  gentamicin: z.boolean().optional().nullable(),
  clindamycin: z.boolean().optional().nullable(),
  rifampicin: z.boolean().optional().nullable(),
  rluconazole: z.boolean().optional().nullable(),

  staphylococcus: z.boolean().optional().nullable(),
  streptococcus: z.boolean().optional().nullable(),
  intestinal_stick: z.boolean().optional().nullable(),
  pseudomona: z.boolean().optional().nullable(),
  enterococcus: z.boolean().optional().nullable(),
  candida: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),

  other_comment: z.string().optional().nullable(),
});

export const createInfectiousClientSchema = infectiousBaseSchema;
export const updateInfectiousClientSchema = infectiousBaseSchema.partial().extend({
  id: z.number().int(requiredText).positive(requiredText),
});

export type CreateInfectiousClientSchema = z.infer<typeof createInfectiousClientSchema>;
export type UpdateInfectiousClientSchema = z.infer<typeof updateInfectiousClientSchema>;

const checkDate = async (data: CreateInfectiousClientSchema | UpdateInfectiousClientSchema, ctx: z.RefinementCtx) => {
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
  inBetweenDatesValidation(
    ctx,
    'infection_start_date',
    data.infection_start_date,
    patient.birth_date,
    patient.mors_date
  );
  inBetweenDatesValidation(ctx, 'infection_end_date', data.infection_end_date, patient.birth_date, patient.mors_date);
  inBetweenDatesValidation(
    ctx,
    'treatment_start_date',
    data.treatment_start_date,
    patient.birth_date,
    patient.mors_date
  );
  inBetweenDatesValidation(ctx, 'treatment_end_date', data.treatment_end_date, patient.birth_date, patient.mors_date);
};

export const createInfectiousServerSchema = createInfectiousClientSchema.superRefine(checkDate);
export const updateInfectiousServerSchema = updateInfectiousClientSchema.superRefine(checkDate);
