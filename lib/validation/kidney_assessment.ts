import { z } from 'zod';
import { requiredText } from './helpers/translations';
import { kidney_assessment_pet } from '@prisma/client';
import { optionalNumber, requiredDateValidation, validatePatientDate } from './helpers/validators';

const kidneyAssessmentBaseSchema = z.object({
  patient_id: z.number().int(requiredText).positive(requiredText),
  check_date: requiredDateValidation(),
  gfr: optionalNumber,
  pet: z.nativeEnum(kidney_assessment_pet).optional().nullable(),
  ktv: optionalNumber,
});

export const createKidneyAssessmentClientSchema = kidneyAssessmentBaseSchema;
export const updateKidneyAssessmentClientSchema = kidneyAssessmentBaseSchema.partial().extend({
  id: z.number().int().positive(requiredText),
});

export type CreateKidneyAssessmentClientSchema = z.infer<typeof createKidneyAssessmentClientSchema>;
export type UpdateKidneyAssessmentClientSchema = z.infer<typeof updateKidneyAssessmentClientSchema>;

const atLeastOneFieldRequired = (
  data: CreateKidneyAssessmentClientSchema | UpdateKidneyAssessmentClientSchema,
  ctx: z.RefinementCtx
) => {
  const gfr = data?.gfr;
  const pet = data?.pet;
  const ktv = data?.ktv;

  if (!gfr && !pet && !ktv) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'ან gfr ან pet ან kt/v სავალდებულოა',
      path: ['gfr'],
    });
  }
};

const checkDate = async (
  data: CreateKidneyAssessmentClientSchema | UpdateKidneyAssessmentClientSchema,
  ctx: z.RefinementCtx
) => {
  await validatePatientDate(ctx, {
    patient_id: data.patient_id!,
    date: data.check_date!,
    dateField: 'check_date',
  });
};

export const createKidneyAssessmentServerSchema = createKidneyAssessmentClientSchema
  .superRefine(atLeastOneFieldRequired)
  .superRefine(checkDate);
export const updateKidneyAssessmentServerSchema = updateKidneyAssessmentClientSchema
  .superRefine(atLeastOneFieldRequired)
  .superRefine(checkDate);
