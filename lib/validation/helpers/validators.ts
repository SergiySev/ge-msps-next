import { z } from 'zod';
import {
  maxDateWarning,
  minDateWarning,
  requiredText,
  wrongDateAfterDeath,
  wrongDateBeforeBirth,
  wrongFormat,
} from './translations';

function isValidDateString(str: string | null | undefined): boolean {
  const pattern = /^\d{4}-\d{2}-\d{2}$/; // Basic YYYY-MM-DD pattern
  return str ? pattern.test(str) : false;
}

export const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
export const minPossibleDate = new Date('1920-01-01');
export const minDate = () => (dateString: Date) => dateString >= minPossibleDate;

export const dateValidation = () => {
  return z
    .string()
    .length(10, requiredText)
    .regex(dateRegex, wrongFormat)
    .refine(minDate(), {
      message: minDateWarning,
    })
    .refine(dateString => new Date(dateString) <= new Date(), {
      message: maxDateWarning,
    });
};

export const startEndDateValidation = (
  ctx: z.RefinementCtx,
  path: string,
  startValue: string | null | undefined,
  endValue: string | null | undefined
) => {
  const startDate = isValidDateString(startValue) ? new Date(startValue!) : null;
  const endDate = isValidDateString(endValue) ? new Date(endValue!) : null;

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
  checkValue: string | null | undefined,
  startValue: string | null | undefined,
  endValue: string | null | undefined
) => {
  const checkDate = isValidDateString(checkValue) ? new Date(checkValue!) : null;
  const startDate = isValidDateString(startValue) ? new Date(startValue!) : null;
  const endDate = isValidDateString(endValue) ? new Date(endValue!) : null;

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
