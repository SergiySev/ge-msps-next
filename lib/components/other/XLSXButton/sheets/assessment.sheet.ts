import { d } from 'msps/lib/validation/helpers/date';

export const assessmentJson = (data: unknown, t: (key: string) => string) => ({
  sheet: t('assessment'),
  columns: [
    { label: t('record'), value: 'id' },
    { label: t('patient'), value: 'patient_id' },
    { label: t('date'), value: (row: { check_date: Date }) => d(row.check_date) },
    { label: t('gfr'), value: 'gfr' },
    { label: t('ktv'), value: 'ktv' },
    { label: t('pet'), value: 'pet' },
    { label: t('ka_comment'), value: 'ka_comment' },
    {
      label: t('hospital.title'),
      value: 'hospital_name',
    },
  ],
  content: [...(data as [])],
});
