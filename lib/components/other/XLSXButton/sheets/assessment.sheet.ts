import { d } from 'msps/lib/validation/helpers/date';

export const assessmentJson = (data: unknown, t) => ({
  sheet: t('assessment'),
  columns: [
    { label: t('record'), value: 'id' },
    { label: t('patient'), value: 'patient_id' },
    { label: t('date'), value: row => d(row.check_date) },
    { label: t('gfr'), value: 'gfr' },
    { label: t('ktv'), value: 'ktv' },
    { label: t('pet'), value: 'pet' },
    { label: t('ka_comment'), value: 'ka_comment' },
  ],
  content: [...data],
});
