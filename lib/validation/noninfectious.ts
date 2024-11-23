import { z } from 'zod';
import { requiredText } from './helpers/translations';
import { inBetweenDatesValidation, requiredDateValidation } from './helpers/validators';
import { getPatientById } from './queries/getPatientById';

const noninfectiousBaseSchema = z.object({
  patient_id: z.number().int(requiredText).positive(requiredText),
  date: requiredDateValidation(),
  hernia: z.boolean().optional().nullable(),
  catheter_positioning: z.boolean().optional().nullable(),
  catheter_malposition: z.boolean().optional().nullable(),
  catheter_intraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_extraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_rinking: z.boolean().optional().nullable(),
  catheter_repositioning: z.boolean().optional().nullable(),
  catheter_leakage: z.boolean().optional().nullable(),
  hydrothorax: z.boolean().optional().nullable(),
  abdominal_leakage: z.boolean().optional().nullable(),
  genital_discharge: z.boolean().optional().nullable(),
  hepomeritoneum: z.boolean().optional().nullable(),
  chyloperitoneum: z.boolean().optional().nullable(),
  catheter_decrease: z.boolean().optional().nullable(),
  eps: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),
  other_comment: z.string().optional().nullable(),
});

export const createNoninfectiousClientSchema = noninfectiousBaseSchema;
export const updateNoninfectiousClientSchema = noninfectiousBaseSchema.partial().extend({
  id: z.number().int(requiredText).positive(requiredText),
});

export type CreateNoninfectiousClientSchema = z.infer<typeof createNoninfectiousClientSchema>;
export type UpdateNoninfectiousClientSchema = z.infer<typeof updateNoninfectiousClientSchema>;

const checkDate = async (
  data: CreateNoninfectiousClientSchema | UpdateNoninfectiousClientSchema,
  ctx: z.RefinementCtx
) => {
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

const checkComment = (
  data: CreateNoninfectiousClientSchema | UpdateNoninfectiousClientSchema,
  ctx: z.RefinementCtx
) => {
  if (data.other_comment && !data.other) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'სხვა - არარის მონიშნული',
      path: ['other_comment'],
    });
  }
};

export const createNoninfectiousServerSchema = createNoninfectiousClientSchema
  .superRefine(checkDate)
  .superRefine(checkComment);
export const updateNoninfectiousServerSchema = updateNoninfectiousClientSchema
  .superRefine(checkDate)
  .superRefine(checkComment);
