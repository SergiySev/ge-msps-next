import { z } from 'zod';
import {
  maxDateWarning,
  minDateWarning,
  onlyNumbers,
  possibleBMI,
  requiredSymbols,
  requiredText,
  wrongDateBeforeBirth,
} from './helpers/translations';
import { requiredDateValidation, inBetweenDatesValidation, minDate, strictStringFn } from './helpers//validators';
import { patient_sex, patient_mors_reason } from '@prisma/client';
import prisma from '../prisma';

const patientBaseSchema = z.object({
  first_name: strictStringFn().min(2, requiredText).max(50).trim(),
  last_name: strictStringFn().min(2, requiredText).max(50).trim(),
  sex: z.nativeEnum(patient_sex),

  department_id: z.number().int().positive(requiredText),
  region_id: z.number().int().positive(requiredText),
  birth_date: requiredDateValidation(),

  personal_id: z.string().length(11, requiredSymbols(11)).regex(/^\d+$/, onlyNumbers),

  phone: z.string().regex(/^\d+$/).optional().nullable(),
  bmi: z.coerce
    .number({ message: requiredText })
    .refine(
      n => {
        return n.toString().split('.')[1].length <= 2;
      },
      { message: 'მაქსიმალური სიზუსტე არის 2 ათობითი ნიშანი' }
    )
    .refine(
      val => {
        return val >= 8 && val <= 220;
      },
      {
        message: possibleBMI,
      }
    ),
  address: z.string().optional().nullable(),
  doctor_id: z.number().int().positive(requiredText),

  pd_transit_date: z
    .date()
    .refine(minDate(), {
      message: minDateWarning,
    })
    .refine(dateString => new Date(dateString) <= new Date(), {
      message: maxDateWarning,
    })
    .nullable()
    .optional(),
  transplantation_date: z
    .date()
    .refine(minDate(), {
      message: minDateWarning,
    })
    .refine(dateString => new Date(dateString) <= new Date(), {
      message: maxDateWarning,
    })
    .nullable()
    .optional(),

  mors: z.boolean().optional().nullable(),
  mors_reason: z.nativeEnum(patient_mors_reason).optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_comment: z.string().optional().nullable(),
});

export const createPatientClientSchema = patientBaseSchema;
export const updatePatientClientSchema = patientBaseSchema.partial().extend({
  id: z.number().int().positive(requiredText),
});

export type CreatePatientClientTypes = z.infer<typeof createPatientClientSchema>;
export type UpdatePatientClientTypes = z.infer<typeof updatePatientClientSchema>;

const checkPersonalId = async (data: CreatePatientClientTypes | UpdatePatientClientTypes, ctx: z.RefinementCtx) => {
  const { id, personal_id } = data as { id?: number | null; personal_id: string };
  const existedPatient = await prisma.patient.findFirst({
    where: {
      personal_id: personal_id,
    },
  });
  if (existedPatient && existedPatient.id !== id) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'სხვა პაციენტი ამ პირადი ნომრით უკვე არსებობს',
      path: ['personal_id'],
    });
  }
};
const checkDates = (data: CreatePatientClientTypes | UpdatePatientClientTypes, ctx: z.RefinementCtx) => {
  const birthDate = data.birth_date;

  if (data.mors_date && data.mors_date <= birthDate!) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: wrongDateBeforeBirth,
      path: ['mors_date'],
    });
  }

  inBetweenDatesValidation(ctx, 'transplantation_date', data.transplantation_date, data.birth_date, data.mors_date);

  inBetweenDatesValidation(ctx, 'pd_transit_date', data.pd_transit_date, data.birth_date, data.mors_date);
};

export const createPatientServerSchema = createPatientClientSchema.superRefine(checkPersonalId).superRefine(checkDates);
export const updatePatientServerSchema = updatePatientClientSchema.superRefine(checkPersonalId).superRefine(checkDates);
