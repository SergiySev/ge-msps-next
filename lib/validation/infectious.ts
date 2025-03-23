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

  vancomycin: z.boolean().default(false),
  ceftazidime: z.boolean().default(false),
  ceftriaxone: z.boolean().default(false),
  cefepime: z.boolean().default(false),
  meropenem: z.boolean().default(false),
  imipenem: z.boolean().default(false),
  ciprofloxacin: z.boolean().default(false),
  cefazolin: z.boolean().default(false),
  gentamicin: z.boolean().default(false),
  clindamycin: z.boolean().default(false),
  rifampicin: z.boolean().default(false),
  rluconazole: z.boolean().default(false),

  staphylococcus: z.boolean().default(false),
  streptococcus: z.boolean().default(false),
  intestinal_stick: z.boolean().default(false),
  pseudomona: z.boolean().default(false),
  enterococcus: z.boolean().default(false),
  candida: z.boolean().default(false),
  other: z.boolean().default(false),

  other_comment: z.string().optional(),
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
