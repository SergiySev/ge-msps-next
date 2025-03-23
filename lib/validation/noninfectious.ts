import { z } from 'zod';
import { requiredText } from './helpers/translations';
import { inBetweenDatesValidation, requiredDateValidation } from './helpers/validators';
import { getPatientById } from './queries/getPatientById';

const noninfectiousBaseSchema = z.object({
  patient_id: z.number().int(requiredText).positive(requiredText),
  date: requiredDateValidation(),
  hernia: z.boolean().default(false),
  catheter_positioning: z.boolean().default(false),
  catheter_malposition: z.boolean().default(false),
  catheter_intraluminal_occlusion: z.boolean().default(false),
  catheter_extraluminal_occlusion: z.boolean().default(false),
  catheter_rinking: z.boolean().default(false),
  catheter_repositioning: z.boolean().default(false),
  catheter_leakage: z.boolean().default(false),
  hydrothorax: z.boolean().default(false),
  abdominal_leakage: z.boolean().default(false),
  genital_discharge: z.boolean().default(false),
  hepomeritoneum: z.boolean().default(false),
  chyloperitoneum: z.boolean().default(false),
  catheter_decrease: z.boolean().default(false),
  eps: z.boolean().default(false),
  other: z.boolean().default(false),
  other_comment: z.string().optional(),
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
