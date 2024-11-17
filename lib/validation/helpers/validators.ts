import { z } from 'zod';
import {
  maxDateWarning,
  minDateWarning,
  requiredText,
  wrongDateAfterDeath,
  wrongDateBeforeBirth,
  wrongFormat,
} from './translations';


export const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
export const minPossibleDate = new Date('1920-01-01');
export const minDate = () => (dateString: Date) => dateString >= minPossibleDate;

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
