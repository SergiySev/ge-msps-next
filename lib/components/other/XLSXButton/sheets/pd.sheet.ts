import { d } from 'msps/lib/validation/helpers/date';

export const pdJson = (data: unknown, t: (key: string) => string) => ({
  sheet: t('pd'),
  columns: [
    { label: t('record'), value: 'id' },
    { label: t('patient'), value: 'patient_id' },
    { label: t('pd_date'), value: (row: { date: Date }) => d(row.date) },
    {
      label: t('pd_modality'),
      value: (row: { pd_modality: string }) => t(row.pd_modality),
    },
    {
      label: t('solution_per_input'),
      value: (row: { solution_per_input: string }) => t(row.solution_per_input),
    },
    { label: t('pd_ch_solution_136'), value: 'pd_ch_solution_136' },
    { label: t('pd_ch_solution_227'), value: 'pd_ch_solution_227' },
    { label: t('pd_ch_solution_386'), value: 'pd_ch_solution_386' },
    { label: t('icodextrin'), value: 'icodextrin' },
    {
      label: t('hospital.title'),
      value: 'hospital_name',
    },
  ],
  content: [...(data as [])],
});
