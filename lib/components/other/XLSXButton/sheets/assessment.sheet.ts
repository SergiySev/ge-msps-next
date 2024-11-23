import { getLabel } from './label';

export const assessmentJson = (data: never) => ({
  sheet: getLabel('assessment'),
  columns: [
    { label: getLabel('record'), value: 'id' },
    { label: getLabel('patient'), value: 'patient_id' },
    { label: getLabel('date'), value: 'check_date' },
    { label: getLabel('gfr'), value: 'gfr' },
    { label: getLabel('ktv'), value: 'ktv' },
    { label: getLabel('pet'), value: 'pet' },
    { label: getLabel('ka_comment'), value: 'ka_comment' },
  ],
  content: [...data],
});
