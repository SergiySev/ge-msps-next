import { getLabel } from './label';

export const pdJson = data => ({
  sheet: getLabel('pd'),
  columns: [
    { label: getLabel('record'), value: 'id' },
    { label: getLabel('patient'), value: 'patient_id' },
    { label: getLabel('pd_date'), value: 'date' },
    {
      label: getLabel('pd_modality'),
      value: row => getLabel(row.pd_modality),
    },
    {
      label: getLabel('solution_per_input'),
      value: row => getLabel(row.solution_per_input),
    },
    { label: getLabel('pd_ch_solution_136'), value: 'pd_ch_solution_136' },
    { label: getLabel('pd_ch_solution_227'), value: 'pd_ch_solution_227' },
    { label: getLabel('pd_ch_solution_386'), value: 'pd_ch_solution_386' },
    { label: getLabel('icodextrin'), value: 'icodextrin' },
  ],
  content: [...data],
});
