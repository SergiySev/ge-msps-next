import { z } from 'zod';
import {
  maxDateWarning,
  minDateWarning,
  onlyNumbers,
  possibleBMI,
  requiredSymbols,
  requiredText,
  wrongDateBeforeBirth,
  wrongFormat,
} from './helpers/translations';
import { dateRegex, inBetweenDatesValidation, minDate, strictStringFn } from './helpers//validators';
import prisma from '../prisma';
import { patient_sex, patient_mors_reason } from '@prisma/client';
import { address } from 'framer-motion/client';
import { create } from 'domain';

export const morsReasonEnums = ['mors_heart', 'mors_infection', 'mors_other'] as const;
export const sexEnums = ['male', 'female'] as const;

type ConvertedEnum = [string, ...string[]];

// export const sexEnums = Object.values(patient_sex) as ConvertedEnum;
// export const morsReasonEnums = Object.values(patient_mors_reason) as ConvertedEnum;

const patientBaseSchema = z.object({
  first_name: strictStringFn().min(2, requiredText).max(50).trim(),
  last_name: strictStringFn().min(2, requiredText).max(50).trim(),
  sex: z.enum(sexEnums),

  department_id: z.number().int().positive(requiredText),
  region_id: z.number().int().positive(requiredText),
  birth_date: z
    .date()
    .refine(minDate(), {
      message: minDateWarning,
    })
    .refine(dateString => new Date(dateString) <= new Date(), {
      message: maxDateWarning,
    }),
  personal_id: z.string().length(11, requiredSymbols(11)).regex(/^\d+$/, onlyNumbers),

  phone: z.string().regex(/^\d+$/).optional().nullable(),
  bmi: z.number({ message: requiredText }).refine(
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
  mors_reason: z.enum(morsReasonEnums).optional().nullable(),
  mors_date: z.date().optional().nullable(),
  mors_comment: z.string().optional().nullable(),
});

export const createPatientSchema = patientBaseSchema.extend({});
export const updatePatientSchema = patientBaseSchema.partial().extend({
  id: z.number().int().positive(requiredText),
});

export type CreatePatientInput = z.infer<typeof createPatientSchema>;
export type UpdatePatientInput = z.infer<typeof updatePatientSchema>;
