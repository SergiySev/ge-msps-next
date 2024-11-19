import { z } from 'zod';
import { maxDateWarning, minDateWarning, wrongDateAfterDeath, wrongDateBeforeBirth } from './translations';
import prisma from 'msps/lib/prisma';

export const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
export const minPossibleDate = new Date('1920-01-01');
export const minDate = () => (dateString: Date) => dateString >= minPossibleDate;

// FIXME: do I need to store 0 ?
export const optionalNumber = z.coerce
  .number()
  .refine(n => Number.isInteger(n * 100), { message: 'მაქსიმალური სიზუსტე არის 2 ათობითი ნიშანი' })
  .transform(v => v || null)
  .optional();

export const requiredDateValidation = () => {
  return z.coerce
    .date()
    .refine(minDate(), {
      message: minDateWarning,
    })
    .refine(dateString => dateString <= new Date(), {
      message: maxDateWarning,
    });
};

export const startEndDateValidation = (
  ctx: z.RefinementCtx,
  path: string,
  startValue: Date | null | undefined,
  endValue: Date | null | undefined
) => {
  const startDate = startValue || null;
  const endDate = endValue || null;

  if (startDate && endDate && startDate >= endDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'დასაწყისი თარიღი არ უნდა იყოს მეტი ვიდრე დასასრულის თარიღი',
      path: [path],
    });
  }
};

export const inBetweenDatesValidation = (
  ctx: z.RefinementCtx,
  path: string,
  checkValue: Date | null | undefined,
  startValue: Date | null | undefined,
  endValue: Date | null | undefined
) => {
  const checkDate = checkValue || null;
  const startDate = startValue || null;
  const endDate = endValue || null;

  if (checkDate) {
    if (startDate && checkDate <= startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: wrongDateBeforeBirth,
        path: [path],
      });
    }

    if (endDate && checkDate >= endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: wrongDateAfterDeath,
        path: [path],
      });
    }
  }
};

export const strictStringFn = (pattern: RegExp = /^[a-zA-Zა-ჰ\s]*$/, message: string = 'შეიყვანეთ მხოლოდ ასოები') => {
  return z.string().regex(pattern, message);
};

// ASYNC VALIDATORS

export interface PatientDates {
  birth_date: Date;
  mors_date?: Date | null;
}

export const validatePatientDate = async (
  ctx: z.RefinementCtx,
  params: {
    patient_id: number;
    date: Date;
    dateField: string;
    customGetPatient?: (id: number) => Promise<PatientDates | null>;
  }
) => {
  const { patient_id, date, dateField, customGetPatient } = params;

  if (!date || !patient_id) return;

  try {
    const getPatient =
      customGetPatient ||
      (async (id: number) => {
        return await prisma.patient.findFirst({
          where: { id },
          select: { birth_date: true, mors_date: true },
        });
      });

    const patient = await getPatient(patient_id);

    if (!patient) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Patient not found',
        path: ['patient_id'],
      });
      return;
    }

    inBetweenDatesValidation(ctx, dateField, date, patient.birth_date, patient.mors_date);
  } catch (error) {
    console.error(error);
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Error validating patient dates',
      path: [dateField],
    });
  }
};
